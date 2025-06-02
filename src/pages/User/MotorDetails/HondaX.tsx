import Breadcrumb from "../../../components/UserBreadcrums"
import Header from "../../../layouts/UserLayouts/UserHeader"
import Sidemenu from "../../../layouts/UserLayouts/UserSidemenu"
import Honda_winnerX from "../../../assets/photos/motors/hondax.png";
import Honda_ADV_160 from "../../../assets/photos/motors/hondaa.png";
import Honda_Click from "../../../assets/photos/motors/hondaClick.png"
import Honda_Alpha from "../../../assets/photos/motors/hondaAlpha.png";
import Honda_RS from "../../../assets/photos/motors/hondaRS.png";
import { Link } from "react-router-dom";
import Installment from "../../../layouts/UserLayouts/InstallmentCalculator/Installment";
import { useState } from "react";



function HondaX() {
    const [showCalculator, setShowCalculator] = useState(false);
    const motorcyclePrice = 131900; // Your motorcycle price
    return (
        <>
        <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Honda WINNER X"
                        links={[{ text: "Motorcycles", link: "/motorcycles" }]}
                        active="Honda WINNER X"/> 
                    <div className="xxl:col-span-9 col-span-12">
                        <div className="box overflow-hidden main-content-card">
                            <div className="box-body p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1 border-2 border-gray-300">
                                        <img src={Honda_winnerX} alt="Honda ADV 160" className="w-50 h-full object-cover" />
                                    </div>
                                    <div className="col-span-1">
                                        <h1 className="mt-8 mb-6">Honda Winner X</h1>
                                        <h4 className="mt-2 mb-2">₱131,900.00</h4>
                                        <p>Price may vary upon branch visit.</p>
                                        <h4 className="mt-1 mb-6">Features</h4>
                                        <ul>
                                            <li>• Assist & Slipper Clutch</li>
                                            <li>• 150cc DOCH, 6-Speed Liquid-Cooled Engine</li>
                                            <li>• Bank Angle Sensor</li>
                                            <li>• Digital Meter Panel</li>
                                            <li>• USB Charging Port</li>
                                            <li>• Anti Lock Braking System</li>
                                            <li>• Aggressive Sports Styling</li>
                                            <li>• Smart Key System</li>
                                            <li>• Gold Cast Wheel Color</li>
                                            <li>• All-LED Lighting System</li>
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
                                <p className="text-gray-700">
                                    <span className=" font-bold text-gray-800">Honda Winner X – Ride Like a Champion! </span>
                                    Experience power and style with a 150cc DOHC, 6-speed, liquid-cooled engine. Key features include a USB Charging Port, Smart Key System, LED Lighting, Digital Meter, Bank Angle Sensor, Slipper Clutch, and ABS (for select variants). 
                                    <span className="font-semibold text-gray-800"> Variants & Prices: </span> 
                                    Standard – PHP 123,900 (White, Red), ABS Premium – PHP 129,900 (Black, Red), ABS Racing – PHP 131,900 (Red). 
                                    <span className="font-bold text-black-600">🏆 Get yours today!</span>
                                </p>
                                <h4 className="mt-6 mb-2 flex ">Specification</h4>
                                <div className="flex">
                                    
                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                        <th className="border border-red-500 p-2">Engine Type</th>
                                        <td className="border border-red-500 p-2">4-Stroke, 4-Valve, DOHC, Liquid-Cooled</td>
                                        </tr>
                                        <tr>
                                        <th className="border border-red-500 p-2">Displacement</th>
                                        <td className="border border-red-500 p-2">149cc</td>
                                        </tr>
                                        <tr>
                                        <th className="border border-red-500 p-2">Starting System</th>
                                        <td className="border border-red-500 p-2">Electric</td>
                                        </tr>
                                        <tr>
                                        <th className="border border-red-500 p-2">Ignition System</th>
                                        <td className="border border-red-500 p-2">Full Transistorized</td>
                                        </tr>
                                        <tr>
                                        <th className="border border-red-500 p-2">Brake Type (Front)</th>
                                        <td className="border border-red-500 p-2">Hydraulic Disc with ABS</td>
                                        </tr>
                                        <tr>
                                        <th className="border border-red-500 p-2">Brake Type (Rear)</th>
                                        <td className="border border-red-500 p-2">Hydraulic Disc</td>
                                        </tr>
                                        <tr>
                                        <th className="border border-red-500 p-2">Tire Size (Front)</th>
                                        <td className="border border-red-500 p-2">90/80-17M/C 46P (Tubeless)</td>
                                        </tr>
                                        <tr>
                                        <th className="border border-red-500 p-2">Tire Size (Rear)</th>
                                        <td className="border border-red-500 p-2">120/70-17M/C 58P (Tubeless)</td>
                                        </tr>
                                        <tr>
                                        <th className="border border-red-500 p-2">Wheel Type</th>
                                        <td className="border border-red-500 p-2">Cast Wheel</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                        <th className="border border-red-500 p-2">Overall Dimensions: L x W x H</th>
                                        <td className="border border-red-500 p-2">2,019 x 725 x 1,104 mm</td>
                                        </tr>
                                        <tr>
                                        <th className="border border-red-500 p-2">Seat Height</th>
                                        <td className="border border-red-500 p-2">795 mm</td>
                                        </tr>
                                        <tr>
                                        <th className="border border-red-500 p-2">Ground Clearance</th>
                                        <td className="border border-red-500 p-2">151 mm</td>
                                        </tr>
                                        <tr>
                                        <th className="border border-red-500 p-2">Fuel Tank Capacity</th>
                                        <td className="border border-red-500 p-2">4.5 L</td>
                                        </tr>
                                        <tr>
                                        <th className="border border-red-500 p-2">Fuel System</th>
                                        <td className="border border-red-500 p-2">PGM-Fi</td>
                                        </tr>
                                        <tr>
                                        <th className="border border-red-500 p-2">Battery Type</th>
                                        <td className="border border-red-500 p-2">12V 5Ah MF-WET</td>
                                        </tr>
                                        <tr>
                                        <th className="border border-red-500 p-2">Maximum Power</th>
                                        <td className="border border-red-500 p-2">11.5kW @ 9,000rpm</td>
                                        </tr>
                                        <tr>
                                        <th className="border border-red-500 p-2">Maximum Torque</th>
                                        <td className="border border-red-500 p-2">13.5Nm @ 7,000rpm</td>
                                        </tr>
                                    </tbody>
                                </table>




                                </div>
                                    <h4 className="mt-8 mb-2">Related Products</h4>
                                        <p>
                                        Explore our featured Honda motorcycles, starting with the Honda ADV160. More models coming soon!
                                        </p>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

                                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                        <Link to="/HondaADV" className="block text-center"
                                            onClick={() => window.scrollTo({ top: 100})}>
                                            <img
                                                src={Honda_ADV_160}
                                                alt="Honda ADV160"
                                            />
                                            <p className="text-sm font-medium hover:underline">Honda ADV160</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱164,900.00</p>
                                        </Link>
                                    </div>
                                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                        <Link to="/HondaClick" className="block text-center"
                                            onClick={() => window.scrollTo({ top: 100})}>
                                            <img
                                                src={Honda_Click}
                                                alt="Honda CLICK125"
                                            />
                                            <p className="text-sm font-medium hover:underline">Honda CLICK125</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱80,900.00</p>
                                        </Link>
                                    </div>
                                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                        <Link to="/HondaAlpha" className="block text-center"
                                            onClick={() => window.scrollTo({ top: 100})}>
                                            <img
                                                src={Honda_Alpha}
                                                alt="Honda TMX125 Alpha"
                                            />
                                            <p className="text-sm font-medium hover:underline">Honda TMX125 Alpha</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱56,900.00</p>
                                        </Link>
                                    </div>
                                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                        <Link to="/HondaRS" className="block text-center"
                                            onClick={() => window.scrollTo({ top: 100})}>
                                            <img
                                                src={Honda_RS}  
                                                alt="Honda RS125"
                                            />
                                            <p className="text-sm font-medium hover:underline">Honda RS125</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱75,900.00</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HondaX;
