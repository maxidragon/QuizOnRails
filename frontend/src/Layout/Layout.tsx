import Navbar from "./Navbar";
import Copyright from "./Copyright";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {props.children}
      <Copyright />
    </>
  );
};

export default Layout;