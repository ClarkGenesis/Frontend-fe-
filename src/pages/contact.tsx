import Header from "../layouts/HomeHeader";
import Footer from "../layouts/HomeFooter";
import Background from "../assets/photos/bg2.png";

function Contact() {
  return (
    <>
      <div
        className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <Header />
        <div className="flex-1 flex justify-center items-center px-4 mt-10">
          <div className="w-full max-w-md p-8 rounded-lg shadow-lg border border-black bg-white bg-opacity-50 backdrop-blur-lg">
            <div className="flex flex-col items-center space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Need Help?</h2>
              
              <div className="space-y-6 w-full">
                <div className="text-center">
                  <h3 className="text-gray-700 font-medium mb-2">Call Us</h3>
                  <p className="text-gray-900 font-semibold">(+63) 9173077038</p>
                </div>

                <div className="text-center">
                  <h3 className="text-gray-700 font-medium mb-2">Email Us</h3>
                  <p className="text-gray-900 font-semibold">support@premio.ph</p>
                </div>

                <div className="text-center">
                  <h3 className="text-gray-700 font-medium mb-2">Location</h3>
                  <p className="text-gray-900 font-semibold">
                    Capt. Vicente Roa St.,<br />
                    Cagayan de Oro City,<br />
                    9000 Misamis Oriental
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Contact;
