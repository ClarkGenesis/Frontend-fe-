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
    const motorcyclePrice = 119900; // Your motorcycle price
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
                                    <div className="col-span-1 border-2 border-gray-400">
                                        <img src={Suzuki_Raider_Fi_150} alt="Kawasaki Dominar 400" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="col-span-1">
                                    <h1 className="mt-8 mb-6">Suzuki Raider Fi 150</h1>
                                    <h4 className="mt-2 mb-2">₱119,900.00</h4>
                                    <p>Price may vary upon branch visit.</p>
                                    <h4 className="mt-4 mb-2">Features</h4>
                                    <ul>
                                        <li>• 150CC Fuel-Injected Engine, DOHC, 4-Valve, 6-Speed</li>
                                        <li>• 1-Action Key Shutter</li>
                                        <li>• Full Digital Instrument Panel</li>
                                        <li>• Full LED Headlight</li>
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
                                The Suzuki Raider R150 FI, celebrating 20 years of dominance, introduces new colors and two exciting variants. Known as the Pinnacle of Hyper Underbones in the 150cc category, it continues to deliver top-tier power and performance.
                                </p>

                                <h4 className="mt-6 mb-2 flex ">Specification</h4>
                                <div className="flex">
                                    
                            
                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Max Power</th>
                                            <td className="border border-red-500 p-2">13.6KW /10,000RPM</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Max Torque</th>
                                            <td className="border border-red-500 p-2">13.8NM / 8,500RPM</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Engine Type</th>
                                            <td className="border border-red-500 p-2">4-Stroke, DOHC, 4-Valve</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Engine Displacement</th>
                                            <td className="border border-red-500 p-2">147.3CC</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel System</th>
                                            <td className="border border-red-500 p-2">Fuel Injection</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Cooling System</th>
                                            <td className="border border-red-500 p-2">Liquid-Cooled</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Compression Ratio</th>
                                            <td className="border border-red-500 p-2">11.5:1</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Transmission Type</th>
                                            <td className="border border-red-500 p-2">6-Speed</td>
                                        </tr>
                                    </tbody>
                                </table>


                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Brakes (Front)</th>
                                            <td className="border border-red-500 p-2">Disc</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Brakes (Rear)</th>
                                            <td className="border border-red-500 p-2">Disc</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Suspension (Front)</th>
                                            <td className="border border-red-500 p-2">Telescopic, Coil Spring, Oil Damped</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Tire Size (Front)</th>
                                            <td className="border border-red-500 p-2">70/90 – 17 38P (Tubeless Type)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Tire Size (Rear)</th>
                                            <td className="border border-red-500 p-2">80/90 – 17 50P (Tubeless Type)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Overall Dimensions (LxWxH)</th>
                                            <td className="border border-red-500 p-2">1,960MM x 675MM x 980MM</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Seat Height</th>
                                            <td className="border border-red-500 p-2">765MM</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel Tank Capacity</th>
                                            <td className="border border-red-500 p-2">4L</td>
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
                                                alt="Honda WINNER X"
                                            />
                                            <p className="text-sm font-medium hover:underline">Suzuki GSX-S150</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱133,900.00</p>
                                        </Link>
                                    </div>
                                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                        <Link to="/SuzukiBurgman" className="block text-center"
                                            onClick={() => window.scrollTo({ top: 100})}>
                                            <img
                                                src={Suzuki_Burgman}
                                                alt="Suzuki Burgman Street 125-EX"
                                            />
                                            <p className="text-sm font-medium hover:underline">Suzuki Burgman Street 125-EX</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱92,400.00</p>
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