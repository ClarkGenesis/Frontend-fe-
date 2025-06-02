import Header from '../layouts/HomeHeader';
import Footer from "../layouts/HomeFooter";
import Background from "../assets/photos/bg2.png";
import TopImage from "../assets/photos/about.png";

function About() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }}>
      <div className="flex justify-center bg-gray-100">
        <img src={TopImage} alt="Top section" />
      </div>
        <div className="flex justify-center items-center pt-10 backdrop-blur-md">
          <div className="max-w-2xl p-6 bg-white bg-opacity-50">
            <p className="text-center text-lg text-black-700">
              Our Online Pre-Registration System for Motor Dealerships makes it easy for customers
              to register their motorcycles. It helps users submit applications, check their status,
              and reduce paperwork. The system is designed to be fast, simple, and convenient for both buyers and dealerships.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
