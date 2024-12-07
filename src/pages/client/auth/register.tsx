import { Button, Divider, Form, FormProps, Input } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

interface IFieldType {
    fullName: string;
    password: string;
    email: string;
    phone: string;
};

const RegisterPage = () => {

    const [isFinish, setItFinish] = useState<boolean>(false);

    const onFinish: FormProps<IFieldType>['onFinish'] = (values) => {
        setItFinish(true);
        setTimeout(() => {
            console.log('Success:', values);
            setItFinish(false);
        }, 3000);
    };

    const onFinishFailed: FormProps<IFieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div style={{
                width: "30%",
                margin: "100px auto",
                height: "auto",
                boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
                padding: "50px",
                borderRadius: "12px",

            }}>
                <div style={{
                    width: "100%"
                }}>
                    <h1 className="text text-large">Đăng Ký Tài Khoản</h1>
                    <Divider />
                    <Form
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"

                    >
                        <Form.Item<IFieldType>
                            label="Họ và Tên: "
                            name="fullName"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<IFieldType>
                            label="Email: "
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email!' },
                            { type: "email", message: "Email không đúng định dạng!" }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<IFieldType>
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item<IFieldType>
                            label="Số Điện Thoại: "
                            name="phone"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit" loading={isFinish}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider>Or</Divider>
                    <p className="text text-normal" style={{ textAlign: "center" }}>
                        Đã có tài khoản ?
                        <span>
                            <Link to='/login' > Đăng Nhập </Link>
                        </span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;