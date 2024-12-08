import { useCurrentApp } from "components/context/app.context";


const AppHeader = () => {
    const { user } = useCurrentApp();
    return (
        <>
            <h1>Header</h1>
            <div>
                {JSON.stringify(user)}
            </div>
        </>
    )
}

export default AppHeader;