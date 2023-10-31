import Topbar from '../components/Topbar';

const ScreenWrapper = ({title, children }) => {
    return (
        <>
            {title&&<Topbar title={title}/>}
            {children}
        </>
    )
}

export default ScreenWrapper;
