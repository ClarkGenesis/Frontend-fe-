import logo3 from "../assets/photos/logo-text.png";
function Footer() {
  return (
    <footer className="p-2 bg-gray-900 text-white">
      <div className="container mx-auto grid md:grid-cols-4 gap-8">
      <div>
          <img src={logo3} alt="Logo" className="h-16 w-auto mb-4" />
        </div>
        <div>
        <h3 className="text-lg text-white font-semibold">MC Brands</h3>
          <p className="mt-2 flex items-center">
            Honda
          </p>
          <p className="mt-2 flex items-center">
            Yamaha
          </p>
          <p className="mt-2 flex items-center">
            Suzuki
          </p>
          <p className="mt-2 flex items-center">
            Kawasaki
          </p>
        </div>
        <div>
          <h3 className="text-lg text-white font-semibold">Contact Us</h3>
          <p className="mt-2 flex items-center gap-2">
            <i className="bi bi-telephone-fill"></i> 
            (+63) 9123456789
          </p>
          <p className="flex items-center gap-2">
            <i className="bi bi-envelope-fill"></i> 
            support@example.com
          </p>
        </div>
      </div>

      <div className="text-center mt-5">
        <p>Copyright © 2025 PREMIO Registration | Developed by Cheap Coders</p>
      </div>
    </footer>
  );
}
export default Footer;