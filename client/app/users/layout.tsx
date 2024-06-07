import Footer from "../components/footer";
import NavBar from "./components/navbar";

const LoginLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <>
      <NavBar/>
      {children}
      <Footer/>
      </>
    );
  };
  
  export default LoginLayout;