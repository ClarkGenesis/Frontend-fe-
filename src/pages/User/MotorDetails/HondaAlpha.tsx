
import Breadcrumb from "../../../components/UserBreadcrums";
import Header from "../../../layouts/UserLayouts/UserHeader";
import Sidemenu from "../../../layouts/UserLayouts/UserSidemenu";
import Honda_ADV_160 from "../../../assets/photos/motors/hondaa.png";
import Honda_winnerX from "../../../assets/photos/motors/hondax.png";
import Honda_Click from "../../../assets/photos/motors/hondaClick.png";
import Honda_Alpha from "../../../assets/photos/motors/hondaAlpha.png";
import Honda_RS from "../../../assets/photos/motors/hondaRS.png";
import Installment from "../../../layouts/UserLayouts/InstallmentCalculator/Installment";
import { Link } from "react-router-dom";
import { useState } from "react";


function HondaAlpha() {
    const [showCalculator, setShowCalculator] = useState(false);
    const motorcyclePrice = 56900; // Your motorcycle price
    return (
        <>
        <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Honda TMX125 Alpha"
                        links={[{ text: "Motorcycles", link: "/motorcycles" }]}
                        active="Honda TMX125 Alpha"
                    />
                    <div className="xxl:col-span-9 col-span-12">
                        <div className="box overflow-hidden main-content-card">
                            <div className="box-body p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1 border-2 border-gray-300">
                                        <img src={Honda_Alpha} alt="Honda ADV 160" className="w-50 h-full object-cover" />
                                    </div>
                                    <div className="col-span-1">
                                        <h1 className="mt-8 mb-6">Honda TMX125 Alpha</h1>
                                        <h4 className="mt-2 mb-2">₱56,900.00</h4>
                                        <p>Price may vary upon branch visit.</p>
                                        <h4 className="mt-1 mb-6">Features</h4>
                                        <ul>
                                            <li>• SPORTY MUFFLER</li>
                                            <li>• CAFE RACER INSPIRED DESIGN</li>
                                            <li>• AUTOMATIC HEADLIGHT ON</li>
                                            <li>• SIGNAL LIGHT (FRONT & BACK)</li>
                                            <li>• INFORMATIVE METER PANEL</li>
                                            <li>• ELECTRIC STARTER</li>
                                            <li>• 5 GEAR SPEED</li>
                                            <li>• 18″ TIRE</li>
                                            <li>• FLAT DUAL SEAT DESIGN</li>
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
                                    TMX125 Alpha is powered by the legendary Overhead Valve (OHV) engine, making it unique from other motorbikes. This OHV engine uses a push rod to balance acceleration and control for hours of easy and hassle-free operations while being fuel-efficient at 62.5km/L at 45Km/H constant speed. And to meet the customers’ requirement for best balance of engine power and acceleration, the rear sprocket is improved from 44T to 38T, making it perfect bike for daily commuting usage.
                                </p>
                                <h4 className="mt-6 mb-2 flex ">Specification</h4>
                                <div className="flex">
                                    
                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Engine Type</th>
                                            <td className="border border-red-500 p-2">4-Stroke, Over Head Valve (OHV)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Ignition System</th>
                                            <td className="border border-red-500 p-2">AC – CDI Magnetic</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Tire Size (Front)</th>
                                            <td className="border border-red-500 p-2">2.50 x 18″ 40L</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Overall Dimensions: L x W x H</th>
                                            <td className="border border-red-500 p-2">1,904 x 754 x 1,026 (mm)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Ground Clearance</th>
                                            <td className="border border-red-500 p-2">156 mm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Curb Weight</th>
                                            <td className="border border-red-500 p-2">112 Kg</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Battery Type</th>
                                            <td className="border border-red-500 p-2">12 V – 5 Ah – MF – WET</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Displacement</th>
                                            <td className="border border-red-500 p-2">125 cc</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Brake Type (Front)</th>
                                            <td className="border border-red-500 p-2">Mechanical Leading Trailing (Drum Brake)</td>
                                        </tr>
                                        
                                    </tbody>
                                </table>

                                <table className="w-full h-2 border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Tire Size (Rear)</th>
                                            <td className="border border-red-500 p-2">2.75 x 18″ 48P</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Curb Weight</th>
                                            <td className="border border-red-500 p-2">113 Kg</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel Tank Capacity</th>
                                            <td className="border border-red-500 p-2">8.6 L</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Engine Oil Capacity</th>
                                            <td className="border border-red-500 p-2">1.1 L</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Starting System</th>
                                            <td className="border border-red-500 p-2">Electric & Kick</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Brake Type (Rear)</th>
                                            <td className="border border-red-500 p-2">Mechanical Leading Trailing (Drum Brake)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Wheel Type</th>
                                            <td className="border border-red-500 p-2">Spoke</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Seat Height</th>
                                            <td className="border border-red-500 p-2">759 mm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel System</th>
                                            <td className="border border-red-500 p-2">Carburetor</td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                                    <h4 className="mt-8 mb-2">Related Products</h4>
                                        <p>
                                            Explore our featured Honda motorcycles, starting with the Honda WINNER X, Honda ADV160 and Honda CLICK125 . More models coming soon!
                                        </p>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

                                    <Link to="/HondaX" className="block text-center"
                                        onClick={() => window.scrollTo({ top: 100 })}>
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
                                        onClick={() => window.scrollTo({ top: 100 })}>
                                        <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                            <img
                                                src={Honda_ADV_160}
                                                alt="Honda ADV160"
                                            />
                                            <p className="text-sm font-medium hover:underline">Honda ADV160</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱164,900.00</p>
                                        </div>
                                    </Link>
                                    <Link to="/HondaClick" className="block text-center"
                                        onClick={() => window.scrollTo({ top: 100 })}>
                                        <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                            <img
                                                src={Honda_Click}
                                                alt="Honda CLICK125"
                                            />
                                            <p className="text-sm font-medium hover:underline">Honda CLICK125</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱80,900.00</p>
                                        </div>
                                    </Link>
                                    <Link to="/HondaClick" className="block text-center"
                                        onClick={() => window.scrollTo({ top: 100 })}>
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
export default HondaAlpha;
