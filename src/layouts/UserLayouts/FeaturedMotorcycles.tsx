import Honda_winnerX from "../../assets/photos/motors/hondax.png";
import Yamaha_Mio_Gear_125 from "../../assets/photos/motors/mio_gear125.png";
import Kawasaki_klx from "../../assets/photos/motors/kawasaki.png";
import Suzuki_Raider_Fi_150 from "../../assets/photos/motors/suzuki.png";
import { Link } from "react-router-dom";


function Featured1() {
    return (
        
    <div className="mt-8">
        <div className="box overflow-hidden main-content-card shadow-md">
            <div className="box-body p-5 mb-4">
                <h1 className="text-lg text-gray-800">Featured Motorcycles</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-4 my-4">
                <Link to="/SuzukiFI" className="block" onClick={() => window.scrollTo({ top: 30, behavior: 'smooth' })}>
                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                        <img
                            src={Suzuki_Raider_Fi_150}
                            alt="Yamaha XSR 155"
                            className="w-full h-auto rounded mb-2"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">Suzuki Raider Fi 150</h3>

                        {/* Pricing Details Box */}
                        <div className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">
                            <h6 className="font-bold text-white">₱119,900.00</h6>
                        </div>
                    </div>
                </Link>

                <Link to="/YamahaMio" className="block" onClick={() => window.scrollTo({ top: 30, behavior: 'smooth' })}>
                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                        <img
                            src={Yamaha_Mio_Gear_125}
                            alt="Yamaha XSR 155"
                            className="w-full h-auto rounded mb-2"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">Yamaha Mio Gear 125</h3>

                        {/* Pricing Details Box */}
                        <div className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">
                            <h6 className="font-bold text-white">₱77,400.00</h6>
                        </div>
                    </div>
                </Link>

                <Link to="/HondaX" className="block" onClick={() => window.scrollTo({ top: 30, behavior: 'smooth' })}>
                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                        <img
                            src={Honda_winnerX}
                            alt="Yamaha XSR 155"
                            className="w-full h-auto rounded mb-2"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">Honda Winner X</h3>

                        {/* Pricing Details Box */}
                        <div className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">
                            <h6 className="font-bold text-white">₱131,900.00</h6>
                        </div>
                    </div>
                </Link>

                <Link to="/KawasakiKLX" className="block" onClick={() => window.scrollTo({ top: 30  , behavior: 'smooth' })}>
                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                        <img
                            src={Kawasaki_klx}
                            alt="Yamaha XSR 155"
                            className="w-full h-auto rounded mb-2"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">Kawasaki KLX150</h3>

                        {/* Pricing Details Box */}
                        <div className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">
                            <h6 className="font-bold text-white">₱129,900.00</h6>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default Featured1;