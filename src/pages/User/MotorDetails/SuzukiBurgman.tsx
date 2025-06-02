import Breadcrumb from "../../../components/UserBreadcrums"
import Header from "../../../layouts/UserLayouts/UserHeader"
import Sidemenu from "../../../layouts/UserLayouts/UserSidemenu"
import Suzuki_Raider_Fi_150 from "../../../assets/photos/motors/suzuki.png";
import Suzuki_GSX from "../../../assets/photos/motors/suzuki-gsx.png";
import Suzuki_Burgman from "../../../assets/photos/motors/SuzukiBurgman.png";
import { Link } from "react-router-dom";
import Installment from "../../../layouts/UserLayouts/InstallmentCalculator/Installment";
import { useState } from "react";

function SuzukiF() {
    const [showCalculator, setShowCalculator] = useState(false);
    const motorcyclePrice = 92400; // Your motorcycle price
    return (
        <>
        <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Suzuki Raider Fi 150"
                        links={[{ text: "Motorcycles", link: "/motorcycles" }]}
                        active="Suzuki Raider Fi 150"/> 
                    <div className="xxl:col-span-9 col-span-12">
                        <div className="box overflow-hidden main-content-card">
                            <div className="box-body p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1 border-2 border-gray-300">
                                        <img src={Suzuki_Burgman} alt="Kawasaki Dominar 400" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="col-span-1">
                                    <h2 className="mt-10 mb-6">Suzuki Burgman Street 125-EX</h2>
                                    <h4 className="mt-2 mb-2">₱92,400.00</h4>
                                    <p>Price may vary upon branch visit.</p>
                                    <h4 className="mt-4 mb-2">Features</h4>
                                    <ul>
                                        <li>• NEW SEP-ALPHA ENGINE</li>
                                        <li>• ENGINE AUTO STOP-START SYSTEM & SILENT STARTER SYSTEM</li>
                                        <li>• 12 INCH REAR WHEEL</li>
                                        <li>• RICH & ELEGANT STYLE</li>
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
                                    The Executive has arrived, Suzuki Philippines has launched the Burgman Street 125 EX – Executive Class. An additional variant to the much loved Burgman Street, the Burgman Street 125 EX has more refined styling exuding rich elegance and boasts of more advanced features in response to what the market wants. Experience first class riding with maxi looks and features perfect for the executive in you. Ride in luxury with still the maxi scooter you can afford – the Burgman Street 125 EX!
                                </p>

                                <h4 className="mt-6 mb-2 flex ">Specification</h4>
                                <div className="flex">
                                    
                            
                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Engine Type</th>
                                            <td className="border border-red-500 p-2">4-STROKE M 1-CYLINDER, SOHC</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum Power</th>
                                            <td className="border border-red-500 p-2">6.3 KW / 6,500 RPM</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Ignition System</th>
                                            <td className="border border-red-500 p-2">Fully Transistorized</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Tire Size (Front)</th>
                                            <td className="border border-red-500 p-2">90/90-12, TUBELESS</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Overall Dimensions: L x W x H</th>
                                            <td className="border border-red-500 p-2">1, 905 x 700 x 1, 140 (mm)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Ground Clearance</th>
                                            <td className="border border-red-500 p-2">160 mm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Battery Type</th>
                                            <td className="border border-red-500 p-2">N/A</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Displacement</th>
                                            <td className="border border-red-500 p-2">125 cc</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel System</th>
                                            <td className="border border-red-500 p-2">Fuel Injection</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Transmission Type</th>
                                            <td className="border border-red-500 p-2">CVT</td>
                                        </tr>
                                    </tbody>
                                </table>


                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum Torque</th>
                                            <td className="border border-red-500 p-2">10.0 N-M / 5,000 RPM</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Brake Type (Front)</th>
                                            <td className="border border-red-500 p-2">Disc</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Tire Size (Rear)</th>
                                            <td className="border border-red-500 p-2">100/80-12, TUBELESS</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Curb Weight</th>
                                            <td className="border border-red-500 p-2">112 Kg</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel Tank Capacity</th>
                                            <td className="border border-red-500 p-2">5.5 L</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Compression Ratio</th>
                                            <td className="border border-red-500 p-2">N/A</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Starting System</th>
                                            <td className="border border-red-500 p-2">Kick & Electric</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Bore X Stroke</th>
                                            <td className="border border-red-500 p-2">52.5 X 57.4 MM (2.1 X 2.3 INCHES)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Brake Type (Rear)</th>
                                            <td className="border border-red-500 p-2">Drum</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Wheel Type</th>
                                            <td className="border border-red-500 p-2">Mags</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Seat Height</th>
                                            <td className="border border-red-500 p-2">780 mm</td>
                                        </tr>
                                    </tbody>
                                </table>

                                </div>
                                    <h4 className="mt-8 mb-2">Related Products</h4>
                                        <p>
                                        Explore our featured motorcycles, starting with top models like the Suzuki GSX-S150. More models coming soon
                                        </p>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

                                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                        <Link to="/SuzukiGSX" className="block text-center"
                                            onClick={() => window.scrollTo({ top: 100})}>
                                            <img
                                                src={Suzuki_GSX}
                                                alt="Suzuki GSX-S150"
                                            />
                                            <p className="text-sm font-medium hover:underline">Suzuki GSX-S150</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱133,900.00</p>
                                        </Link>
                                    </div>
                                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                        <Link to="/SuzukiFI" className="block text-center"
                                            onClick={() => window.scrollTo({ top: 100})}>
                                            <img
                                                src={Suzuki_Raider_Fi_150}
                                                alt="Suzuki_Raider_Fi_150"
                                            />
                                            <p className="text-sm font-medium hover:underline">Suzuki Raider Fi 150</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱119,900.00</p>
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
export default SuzukiF;