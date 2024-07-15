import Footer from "@/app/components/footer";

const LoginLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return ( 
        <div className="w-full">
            {children}
            <Footer/>
        </div>
     );
}
 
export default LoginLayout;