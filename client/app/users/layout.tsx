import Footer from "../components/footer";
import NavBar from "./components/navbar";

const LoginLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <div className="w-full"> 
      <NavBar/>
      {children}
      <Footer/>
      </div>
    );
  };
  
  export default LoginLayout;