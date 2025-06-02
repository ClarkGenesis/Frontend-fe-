import Breadcrumb from "../../../components/UserBreadcrums";
import Header from "../../../layouts/UserLayouts/UserHeader";
import Sidemenu from "../../../layouts/UserLayouts/UserSidemenu";
import Honda_ADV_160 from "../../../assets/photos/motors/hondaa.png";
import Honda_winnerX from "../../../assets/photos/motors/hondax.png";
import Honda_Click from "../../../assets/photos/motors/hondaClick.png";
import Honda_Alpha from "../../../assets/photos/motors/hondaAlpha.png";
import Honda_RS from "../../../assets/photos/motors/hondaRS.png";
import { Link } from "react-router-dom";
import Installment from "../../../layouts/UserLayouts/InstallmentCalculator/Installment";
import { useState } from "react";


function HondaA() {
    const [showCalculator, setShowCalculator] = useState(false);
    const motorcyclePrice = 77400; // Your motorcycle price
    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Honda ADV 160"
                        links={[{ text: "Motorcycles", link: "/motorcycles" }]}
                        active="Honda ADV 160"
                    />
                    <div className="xxl:col-span-9 col-span-12">
                        <div className="box overflow-hidden main-content-card">
                            <div className="box-body p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1 border-2 border-gray-300 ">
                                        <img src={Honda_ADV_160} alt="Honda ADV 160" className="w-50 h-full object-cover" />
                                    </div>
                                    <div className="col-span-1">
                                        <h1 className="mt-8 mb-6">Honda ADV160</h1>
                                        <h4 className="mt-2 mb-2">₱164,900.00</h4>
                                        <p>Price may vary upon branch visit.</p>
                                        <h4 className="mt-1 mb-6">Features</h4>
                                        <ul>
                                            <li>• NEW LARGE LUGGAGE BOX</li>
                                            <li>• TWIN SUBSTRATE REAR SUSPENSION</li>
                                            <li>• ALL LED LIGHTING SYSTEM</li>
                                            <li>• NEW HIGHER ADJUSTABLE WIND SCREEN</li>
                                            <li>• DIGITAL SPORTS METER PANEL</li>
                                            <li>• HONDA SMART KEY</li>
                                            <li>• NEW USB CHARGER</li>
                                            <li>• ANTI LOCK BRAKING SYSTEM (ABS) W/DIY DISC BRAKES</li>
                                            <li>• NEW GENERATION 157cc 4-VALVE, LIQUID COOLED, ESP+ ENGINE</li>
                                            <li>• IDLING STOP SYSTEM</li>
                                            <li>• HAZARD LIGHT WITH EMERGENCY STOP SIGNAL (ESS)</li>
                                            <li>• TAPERED HANDLE BAR</li>
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
                                The Honda ADV 160 is a versatile scooter with a 157cc liquid-cooled ESP+ engine, delivering 11.8 kW power and
                                 14.7 Nm torque. It features a large luggage box, twin rear suspension, and a digital meter panel for a sporty ride.
                                </p>
                                <h4 className="mt-6 mb-2 flex ">Specification</h4>
                                <div className="flex">
                                    
                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Engine Type</th>
                                            <td className="border border-red-500 p-2">4-Stroke, 4-Valve, SOHC, Liquid-Cooled, eSP+</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Ignition System</th>
                                            <td className="border border-red-500 p-2">Full Transistorized</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Tire Size (Front)</th>
                                            <td className="border border-red-500 p-2">110/80-14M/C 53P (Tubeless)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Overall Dimensions: L x W x H</th>
                                            <td className="border border-red-500 p-2">1,950 x 763 x 1,196 (mm)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel Tank Capacity</th>
                                            <td className="border border-red-500 p-2">8.1 L</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel Consumption</th>
                                            <td className="border border-red-500 p-2">45.0 km/L (WMTC Test Method)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Displacement</th>
                                            <td className="border border-red-500 p-2">157 cc</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Tire Size (Rear)</th>
                                            <td className="border border-red-500 p-2">130/70-13M/C 57P (Tubeless)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Seat Height</th>
                                            <td className="border border-red-500 p-2">780 mm</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="w-full h-2 border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Seat Height</th>
                                            <td className="border border-red-500 p-2">780 mm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Brake Type (Front)</th>
                                            <td className="border border-red-500 p-2">Hydraulic Disc with ABS</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel System</th>
                                            <td className="border border-red-500 p-2">PGM-Fi</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum Power</th>
                                            <td className="border border-red-500 p-2">11.8 kW @ 8,500 rpm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Starting System</th>
                                            <td className="border border-red-500 p-2">Electric (ACG Starter)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Wheel Type</th>
                                            <td className="border border-red-500 p-2">Cast Wheel</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Ground Clearance</th>
                                            <td className="border border-red-500 p-2">165 mm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Battery Type</th>
                                            <td className="border border-red-500 p-2">12V – 5Ah (MF-WET)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum Torque</th>
                                            <td className="border border-red-500 p-2">14.7 Nm @ 6,500 rpm</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                    <h4 className="mt-8 mb-2">Related Products</h4>
                                        <p>
                                        Explore our featured Honda motorcycles, starting with the Honda WINNER X and more. More models coming soon!
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
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱164,900.00</p>
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
                                    <Link to="/HondaRS" className="block text-center"
                                        onClick={() => window.scrollTo({ top: 100})}>
                                        <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                            <img
                                                src={Honda_RS}
                                                alt="Honda RS125"
                                            />
                                            <p className="text-sm font-medium hover:underline">Honda RS125</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱75,900.00</p>
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
export default HondaA;
