import { FaReact } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { VscSearchFuzzy } from 'react-icons/vsc';
import { Divider, Badge, Drawer, Avatar, Popover, App, Empty } from 'antd';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import './app.header.scss';
import { Link } from 'react-router-dom';
import { useCurrentApp } from 'components/context/app.context';
import { logoutAPI } from '@/services/api';
import { useState } from 'react';

const AppHeader = (props: any) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const { message } = App.useApp();

    const { isAuthenticated, user, setUser, setIsAuthenticated } = useCurrentApp();
    const cart = localStorage.getItem("carts");
    const carts = cart ? JSON.parse(cart) : [];

    const navigate = useNavigate();

    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem("access_token");
            message.success("Đăng Xuất Thành Công!!!");
        } else {
            message.error("Đăng Xuất Thất Bại!!!");
        }
    };

    let items = [
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => alert("me")}
            >Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <Link to="/history">Lịch sử mua hàng</Link>,
            key: 'history',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },
    ];

    if (user?.role === 'ADMIN') {
        items.unshift({
            label: <Link to='/admin'>Trang quản trị</Link>,
            key: 'admin',
        });
    }

    const urlAvatar = user?.avatar ? `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}` : null;

    const contentPopover = () => {
        return (
            <div className='pop-cart-body'>
                <div className='pop-cart-content'>
                    {carts && Array.isArray(carts) && carts.map((book, index) => (
                        <div className='book' key={`book-${index}`}>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`} alt={book?.detail?.mainText} />
                            <div>
                                <strong>{book?.detail?.mainText}</strong>
                                <div className='price'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.detail?.price ?? 0)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {carts.length > 0 ? (
                    <div className='pop-cart-footer'>
                        <button onClick={() => navigate('/order')} style={{ backgroundColor: "red", color: "white", border: "0", borderRadius: "4px", padding: "10px 20px" }}>Xem giỏ hàng</button>
                    </div>
                ) : (
                    <Empty description="Không có sản phẩm trong giỏ hàng" />
                )}
            </div>
        );
    };

    return (
        <div className='header-container'>
            <header className="page-header">
                <div className="page-header__top">
                    <div className="page-header__toggle" onClick={() => setOpenDrawer(true)}>☰</div>
                    <div className='page-header__logo'>
                        <span className='logo'>
                            <span onClick={() => navigate('/')}> <FaReact className='rotate icon-react' />NMHx</span>
                            <VscSearchFuzzy className='icon-search' />
                        </span>
                        <input
                            className="input-search"
                            type={'text'}
                            placeholder="Bạn tìm gì hôm nay"
                        // value={props.searchTerm}
                        // onChange={(e) => props.setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <nav className="page-header__bottom">
                    <ul id="navigation" className="navigation">
                        <li className="navigation__item">
                            <Popover
                                className="popover-carts"
                                placement="topRight"
                                rootClassName="popover-carts"
                                title={"Sản phẩm mới thêm"}
                                content={contentPopover}
                                arrow={true}
                            >
                                <Badge
                                    count={carts.length ?? 0}
                                    size={"small"}
                                    showZero
                                    onClick={() => navigate('/order')}
                                >
                                    <FiShoppingCart className='icon-cart' />
                                </Badge>
                            </Popover>
                        </li>
                        <li className="navigation__item mobile"><Divider type='vertical' /></li>
                        <li className="navigation__item mobile">
                            {!isAuthenticated ? (
                                <span onClick={() => navigate('/login')}>Đăng Nhập</span>
                            ) : (
                                <Dropdown menu={{ items }} trigger={['click']}>
                                    <Space>
                                        <Avatar src={urlAvatar} />
                                        {user?.fullName}
                                    </Space>
                                </Dropdown>
                            )}
                        </li>
                    </ul>
                </nav>
            </header>
            <Drawer
                title="Menu chức năng"
                placement="left"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
            >
                <p>Quản lý tài khoản</p>
                <Divider />
                <p onClick={() => handleLogout()}>Đăng xuất</p>
                <Divider />
            </Drawer>
        </div>
    );
};

export default AppHeader;