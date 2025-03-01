import { useCurrentApp } from "@/components/context/app.context";
import { loginAPI } from "@/services/api";
import { App, Button, Divider, Form, FormProps, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./responsive.scss"


interface IFieldType {
    username: string;
    password: string;
};

const LoginPage = () => {
    const [isFinish, setItFinish] = useState<boolean>(false);
    const { message } = App.useApp();
    const { setIsAuthenticated, setUser } = useCurrentApp();

    const navigate = useNavigate();
    const showMessage = (content: string) => {
        message.success(`${content}`);
    };


    const onFinish: FormProps<IFieldType>['onFinish'] = async (values) => {
        setItFinish(true);
        const res = await loginAPI(values.username, values.password);

        if (res.data) {
            showMessage("Đăng Nhập Thành Công");
            localStorage.setItem("access_token", res.data.access_token);
            setIsAuthenticated(true);
            setUser(res.data.user);
            navigate("/");
        } else {
            message.error("Đăng Nhập Thất Bại");
        }
        setItFinish(false);
    };

    return (
        <>
            <div className="login__container" >
                <div style={{
                    width: "100%"
                }}>
                    <h1 className="text text-large">Đăng Nhập</h1>
                    <Divider />
                    <Form
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"

                    >
                        <Form.Item<IFieldType>
                            label="Email: "
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập email!' },
                            { type: "email", message: "Vui lòng nhập đúng định dạng !!" }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<IFieldType>
                            label="Password: "
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit" loading={isFinish}>
                                Đăng Nhập
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider>Or</Divider>
                    <p className="text text-normal" style={{ textAlign: "center" }}>
                        Chưa có tài khoản:
                        <span>
                            <Link to='/register' > Đăng Ký </Link>
                        </span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default LoginPage;