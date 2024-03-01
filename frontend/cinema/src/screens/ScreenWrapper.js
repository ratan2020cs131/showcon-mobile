import Topbar from "../components/Topbar";

const ScreenWrapper = ({ title, children, sub }) => {
  return (
    <>
      {title && <Topbar title={title} sub={sub}/>}
      {children}
    </>
  );
};

export default ScreenWrapper;
