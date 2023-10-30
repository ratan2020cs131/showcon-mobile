import Topbar from '../components/Topbar';

const ScreenWrapper = ({data, children }) => {
    return (
        <>
            <Topbar title={data.cinema}/>
            {children}
        </>
    )
}

export default ScreenWrapper;
