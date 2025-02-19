import { Row, Col, Rate, App } from 'antd';
import ImageGallery from 'react-image-gallery';
import { useEffect, useRef, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { BsCartPlus } from 'react-icons/bs';
import './book.scss';
import ModalGallery from './modal.gallery';
import { useCurrentApp } from '@/components/context/app.context';

interface IBookAdmin {
    _id: string;
    thumbnail: string;
    slider: string[];
    mainText: string;
    author: string;
    price: number;
    sold: number;
    quantity: number;
    category: string;
    createdAt: string;
    updatedAt: string;
};

interface IProps {
    dataBook: IBookAdmin | null;
}

const BookDetail = ({ dataBook }: IProps) => {
    const [images, setImages] = useState<any[]>([]);
    const [quantityProduct, setQuantityProduct] = useState(1);
    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const refGallery = useRef<ImageGallery>(null);
    const { notification, message } = App.useApp();
    const { carts, setCarts } = useCurrentApp();

    useEffect(() => {
        const newImages = [];
        if (dataBook?.thumbnail) {
            newImages.push({
                original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBook.thumbnail}`,
                thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBook.thumbnail}`,
                originalClass: "original-image",
                thumbnailClass: "thumbnail-image",
            });
        }
        if (dataBook?.slider) {
            dataBook.slider.forEach((item) => {
                newImages.push({
                    original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    originalClass: "original-image",
                    thumbnailClass: "thumbnail-image",
                });
            });
        }
        setImages(newImages);
    }, [dataBook]);

    const handleOnClickImage = () => {
        setIsOpenModalGallery(true);
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
    }

    const handleChangeQuantity = (e: any) => {
        const x = e.target.value;
        if (x === "") {
            setQuantityProduct(1); // Đặt lại giá trị mặc định là 1
        } else {
            const num = parseInt(x);
            if (!isNaN(num) && num >= 1 && num <= dataBook?.quantity!) {
                setQuantityProduct(num);
            }
        }
    };

    const minusQuantity = () => {
        if (quantityProduct > 1) {
            setQuantityProduct(quantityProduct - 1);
        } else {
            notification.warning({
                message: "Số lượng sản phẩm đã đạt tối thiểu!"
            });
        }
    };

    const plusQuantity = () => {
        if (quantityProduct < dataBook?.quantity!) {
            setQuantityProduct(quantityProduct + 1);
        } else {
            notification.warning({
                message: "Số lượng sản phẩm đã đạt tối đa!"
            });
        }
    };

    const addToCarts = (id: string, quantityProducts: number, detail: IBookAdmin) => {
        if (quantityProducts > detail.quantity) {
            notification.warning({
                message: "Số lượng sản phẩm vượt quá tồn kho!",
            });
            return;
        }

        // Lấy giỏ hàng từ localStorage
        const cartStorage = localStorage.getItem("carts");
        let carts: ICarts[] = [];

        if (cartStorage) {
            carts = JSON.parse(cartStorage) as ICarts[];
        }

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingProductIndex = carts.findIndex((item) => item.id === id);

        if (existingProductIndex !== -1) {
            // Nếu sản phẩm đã tồn tại, cập nhật số lượng
            carts[existingProductIndex].quantityProducts += quantityProducts;
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
            carts.push({
                id: id,
                quantityProducts: quantityProducts,
                detail: detail,
            });
        }

        // Cập nhật localStorage
        localStorage.setItem("carts", JSON.stringify(carts));

        // Đồng bộ với React Context
        setCarts(carts);

        // Hiển thị thông báo thành công
        message.success("Đã thêm thành công vào giỏ hàng!");
    };


    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className='view-detail-book' style={{ maxWidth: 1440, margin: '0 auto', minHeight: "calc(100vh - 150px)" }}>
                <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                    <Row gutter={[20, 20]}>
                        <Col md={10} sm={0} xs={0}>
                            <ImageGallery
                                ref={refGallery}
                                items={images}
                                showPlayButton={false} //hide play button
                                showFullscreenButton={false} //hide fullscreen button
                                renderLeftNav={() => <></>} //left arrow === <> </>
                                renderRightNav={() => <></>}//right arrow === <> </>
                                slideOnThumbnailOver={true}  //onHover => auto scroll images
                                onClick={() => handleOnClickImage()}
                            />
                        </Col>
                        <Col md={14} sm={24}>
                            <Col md={0} sm={24} xs={24}>
                                <ImageGallery
                                    ref={refGallery}
                                    items={images}
                                    showPlayButton={false} //hide play button
                                    showFullscreenButton={false} //hide fullscreen button
                                    renderLeftNav={() => <></>} //left arrow === <> </>
                                    renderRightNav={() => <></>}//right arrow === <> </>
                                    showThumbnails={false}
                                />
                            </Col>
                            <Col span={24}>
                                <div className='author'>Tác giả: <a href='#'>{dataBook?.author} </a> </div>
                                <div className='title'>{dataBook?.mainText}</div>
                                <div className='rating' style={{ display: "flex", alignItems: "center" }}>
                                    <Rate value={5} disabled />
                                    <span className='sold'>
                                        <div>{dataBook?.sold}</div>
                                    </span>
                                </div>
                                <div className='price'>
                                    <span className='currency'>
                                        {dataBook?.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataBook.price) : 'N/A'}
                                    </span>
                                </div>
                                <div className='delivery'>
                                    <div>
                                        <span className='left'>Vận chuyển</span>
                                        <span className='right'>Miễn phí vận chuyển</span>
                                    </div>
                                </div>
                                <div className='quantity'>
                                    <span className='left'>Số lượng</span>
                                    <span className='right'>
                                        <button onClick={() => minusQuantity()} >
                                            <MinusOutlined />
                                        </button>
                                        <input onChange={(e) => handleChangeQuantity(e)} value={quantityProduct} min={1} max={dataBook?.quantity} />
                                        <button onClick={() => plusQuantity()}>
                                            <PlusOutlined />
                                        </button>
                                    </span>
                                </div>
                                <div className='buy'>
                                    <button className='cart' onClick={() => addToCarts(dataBook?._id!, quantityProduct, dataBook!)}>
                                        <BsCartPlus className='icon-cart' />
                                        <span>Thêm vào giỏ hàng</span>
                                    </button>
                                    <button className='now'>Mua ngay</button>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </div>
            </div>
            <ModalGallery
                isOpen={isOpenModalGallery}
                setIsOpen={setIsOpenModalGallery}
                currentIndex={currentIndex}
                items={images}
                title={`${dataBook?.mainText}`}
            />
        </div>
    )
}
export default BookDetail;