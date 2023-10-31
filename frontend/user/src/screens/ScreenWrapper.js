import Topbar from '../components/Topbar';

const ScreenWrapper = ({ children }) => {
    return (
        <>
            <Topbar />
            {children}
        </>
    )
}

export default ScreenWrapper;
