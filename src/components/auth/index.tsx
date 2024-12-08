import { Button, Result } from "antd";
import { useCurrentApp } from "components/context/app.context";

interface IProps {
    children: React.ReactNode;
}

const ProtectedRoute = (props: IProps) => {
    const { isAuthenticated } = useCurrentApp();
    if (isAuthenticated === false) {
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary">Back Home</Button>}
            />
        )
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default ProtectedRoute;