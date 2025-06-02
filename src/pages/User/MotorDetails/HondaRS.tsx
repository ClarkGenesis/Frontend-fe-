
import Breadcrumb from "../../../components/UserBreadcrums";
import Header from "../../../layouts/UserLayouts/UserHeader";
import Sidemenu from "../../../layouts/UserLayouts/UserSidemenu";
import Honda_ADV_160 from "../../../assets/photos/motors/hondaa.png";
import Honda_winnerX from "../../../assets/photos/motors/hondax.png";
import Honda_Click from "../../../assets/photos/motors/hondaClick.png";
import Honda_RS from "../../../assets/photos/motors/hondaRS.png";
import Honda_Alpha from "../../../assets/photos/motors/hondaAlpha.png";
import { Link } from "react-router-dom";
import Installment from "../../../layouts/UserLayouts/InstallmentCalculator/Installment";
import { useState } from "react";

function HondaRS() {
    const [showCalculator, setShowCalculator] = useState(false);
    const motorcyclePrice = 75900; // Your motorcycle price
    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Honda CLICK125"
                        links={[{ text: "Motorcycles", link: "/motorcycles" }]}
                        active="Honda CLICK125"
                    />
                    <div className="xxl:col-span-9 col-span-12">
                        <div className="box overflow-hidden main-content-card">
                            <div className="box-body p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1 border-2 border-gray-300">
                                        <img src={Honda_RS} alt="Honda ADV 160" className="w-50 h-full object-cover" />
                                    </div>
                                    <div className="col-span-1">
                                        <h1 className="mt-8 mb-6">Honda RS125</h1>
                                        <h4 className="mt-2 mb-2">₱75,900.00</h4>
                                        <p>Price may vary upon branch visit.</p>
                                        <h4 className="mt-1 mb-6">Features</h4>
                                        <ul>
                                            <li>• METER PANEL WITH NEW DIAL DESIGN</li>
                                            <li>• 125CC, LIQUID COOLED, PGM-FI, ESP ENGINE</li>
                                            <li>• NEW STRIPES DESIGN</li>
                                            <li>• SPORTY MUFFLER WITH PROTECTOR COVER</li>
                                            <li>• SPORTY PILLION STEP</li>
                                            <li>• COMFORTABLE SEAT CUSHION</li>
                                            <li>• SPORTY FRONT FENDER</li>
                                            <li>• SHARP TAILLIGHT DESIGN</li>
                                        </ul>

                                        <div className="flex flex-col gap-2 m-2 p-2 mt-4 ">
                                            <Link 
                                                to="/form"
                                                className="w-60 text-center px-4 py-2 rounded-lg text-white bg-blue-600 border border-black"
                                                onClick={() => window.scrollTo({ top: 0})}>
                                                <i className="bi bi-pencil-square"></i> Pre-Register
                                            </Link>

                                            <button 
                                                onClick={() => setShowCalculator(true)}
                                                className="mt-2 w-60 text-center px-4 py-2 rounded-lg text-white bg-gray-600 border border-black"
                                            >
                                                <i className="bi bi-cash"></i> Installment Calculator
                                            </button>

                                            {showCalculator && (
                                                <Installment
                                                    motorcyclePrice={motorcyclePrice}
                                                    onClose={() => setShowCalculator(false)}
                                                />
                                            )}
                                        </div>

                                    </div>
                                </div>

                                <h4 className="mt-4 mb-2">Description</h4>
                                <p>
                                    The RS125 not only lets you look stylish on the road but also allows you to experience the thrill of what it’s like to be a true motorcycle rider. It has an air-cooled, 125 cc, 4-Stroke, Overhead Cam (OHC) engine, giving for a powerful performance with a maximum power of 7.12 kW @ 7,500 rpm. At the same time, its Euro 3-compliant PGM-Fi fuel system provides an excellent 67.5 Km/L fuel efficiency based on the World Motorcycle Test Cycle (WMTC) Test Method.
                                </p>
                                <h4 className="mt-6 mb-2 flex ">Specification</h4>
                                <div className="flex">
                                    
                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Engine Type</th>
                                            <td className="border border-red-500 p-2">4-Stroke, Air-Cooled, Overhead Cam (OHC)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Ignition System</th>
                                            <td className="border border-red-500 p-2">Fully-Transistorized</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Suspension (front)</th>
                                            <td className="border border-red-500 p-2">Telescopic</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Brake Type (Rear)</th>
                                            <td className="border border-red-500 p-2">Brake Type (Rear)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Wheel Type</th>
                                            <td className="border border-red-500 p-2">Spoke</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Curb Weight</th>
                                            <td className="border border-red-500 p-2">104 Kg</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel Tank Capacity</th>
                                            <td className="border border-red-500 p-2">3.9 L</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum Power</th>
                                            <td className="border border-red-500 p-2">7.12 kW @ 7,500 rpm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Displacement</th>
                                            <td className="border border-red-500 p-2">125 cc</td>
                                        </tr>
                                        
                                    </tbody>
                                </table>

                                <table className="w-full h-2 border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Bore & Stroke</th>
                                            <td className="border border-red-500 p-2">52.4 x 57.9 (mm)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Suspension (rear)</th>
                                            <td className="border border-red-500 p-2">Twin</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Tire Size (Front)</th>
                                            <td className="border border-red-500 p-2">70/90 – 17 M/C 38P</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Wheelbase</th>
                                            <td className="border border-red-500 p-2">1,228 mm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Seat Height</th>
                                            <td className="border border-red-500 p-2">767 mm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel System</th>
                                            <td className="border border-red-500 p-2">PGM Fi</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum Torque</th>
                                            <td className="border border-red-500 p-2">9.55 N.m @ 6,500 rpm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Starting System</th>
                                            <td className="border border-red-500 p-2">Electric & Kick</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Transmission Type</th>
                                            <td className="border border-red-500 p-2">Manual, 4-speed, Constant Mesh</td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                                    <h4 className="mt-8 mb-2">Related Products</h4>
                                        <p>
                                            Explore our featured Honda motorcycles, starting with the Honda WINNER X and Honda ADV160 . More models coming soon!
                                        </p>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                                <Link to="/HondaX" className="block text-center"
                                    onClick={() => window.scrollTo({ top: 100})}>
                                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                        <img
                                            src={Honda_winnerX}
                                            alt="Honda WINNER X"
                                        />
                                        <p className="text-sm font-medium hover:underline">Honda WINNER X</p>
                                        <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱131,900.00</p>
                                    </div>
                                </Link>
                                <Link to="/HondaADV" className="block text-center"
                                    onClick={() => window.scrollTo({ top: 100})}>
                                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                        <img
                                            src={Honda_ADV_160}
                                            alt="Honda ADV160"
                                        />
                                        <p className="text-sm font-medium hover:underline">Honda ADV160</p>
                                        <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱164,900.00</p>
                                    </div>
                                </Link>
                                <Link to="/HondaAlpha" className="block text-center"
                                    onClick={() => window.scrollTo({ top: 100})}>
                                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                        <img
                                            src={Honda_Alpha}
                                            alt="Honda TMX125 Alpha"
                                        />
                                        <p className="text-sm font-medium hover:underline">Honda TMX125 Alpha</p>
                                        <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱56,900.00</p>
                                    </div>
                                </Link>
                                <Link to="/HondaClick" className="block text-center"
                                    onClick={() => window.scrollTo({ top: 100})}>
                                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                        <img
                                            src={Honda_Click}
                                            alt="Honda CLICK125"
                                        />
                                        <p className="text-sm font-medium hover:underline">Honda CLICK125</p>
                                        <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱80,900.00</p>
                                    </div>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HondaRS;