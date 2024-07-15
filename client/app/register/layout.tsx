import Footer from "@/app/components/footer";

const RegisterLayout = ({
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
 
export default RegisterLayout;