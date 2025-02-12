import React from 'react';
import { Layout, Row, Col, Typography, Divider } from 'antd';
import './footer.scss';
import Icon, { TikTokOutlined, YoutubeOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Text, Link } = Typography;

const CustomFooter = () => {
    return (
        <Footer className="custom-footer">
            <Row justify="space-around" align="top">
                {/* Phần thông tin liên hệ */}
                <Col span={6}>
                    <Text strong>Liên hệ với chúng tôi</Text>
                    <Divider className="footer-divider" />
                    <ul>
                        <li>
                            <Icon type="environment" /> Số 2 Ngõ 109 Bằng Liệt - Hà Nội
                        </li>
                        <li>
                            <Icon type="phone" /> +84 123 456 789
                        </li>
                        <li>
                            <Icon type="mail" /> 22092005nguyenhung@gmail.com
                        </li>
                    </ul>
                </Col>

                {/* Phần liên kết nhanh */}
                <Col span={6}>
                    <Text strong>Liên kết nhanh</Text>
                    <Divider className="footer-divider" />
                    <ul>
                        <li>
                            <Link href="/">Trang chủ</Link>
                        </li>
                        <li>
                            <Link href="/san-pham">Sản phẩm</Link>
                        </li>
                        <li>
                            <Link href="/gioi-thieu">Giới thiệu</Link>
                        </li>
                        <li>
                            <Link href="/lien-he">Liên hệ</Link>
                        </li>
                    </ul>
                </Col>

                {/* Phần mạng xã hội */}
                <Col span={6}>
                    <Text strong>Theo dõi chúng tôi</Text>
                    <Divider className="footer-divider" />
                    <div className="social-icons">
                        <Link href="https://facebook.com" target="_blank">
                            <YoutubeOutlined />
                        </Link>
                        <Link href="https://twitter.com" target="_blank">
                            <TikTokOutlined />
                        </Link>
                    </div>
                </Col>
            </Row>

            {/* Phần bản quyền */}
            <Row justify="center" className="copyright">
                <Text type="secondary">
                    © 2025 Bản quyền thuộc về <Link href="/">NMHx</Link>
                </Text>
            </Row>
        </Footer>
    );
};

export default CustomFooter;