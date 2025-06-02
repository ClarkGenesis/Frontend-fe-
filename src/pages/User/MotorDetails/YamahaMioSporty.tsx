import Breadcrumb from "../../../components/UserBreadcrums"
import Header from "../../../layouts/UserLayouts/UserHeader"
import Sidemenu from "../../../layouts/UserLayouts/UserSidemenu"
import Yamaha_Mio_Gear_125 from "../../../assets/photos/motors/mio_gear125.png"
import Yamaha_Mio_i125 from "../../../assets/photos/motors/YamahaMioi125.png"
import Yamaha_Mio_Sporty from "../../../assets/photos/motors/YamahaMioSporty.png"
import { Link } from "react-router-dom"
import Installment from "../../../layouts/UserLayouts/InstallmentCalculator/Installment";
import { useState } from "react";

function YamahaMioSporty() {
    const [showCalculator, setShowCalculator] = useState(false);
    const motorcyclePrice =73900; // Your motorcycle price
    return (
        <>
        <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Yamaha Mio i125"
                        links={[{ text: "Motorcycles", link: "/motorcycles" }]}
                        active="Yamaha Mio i125"/> 
                    <div className="xxl:col-span-9 col-span-12">
                        <div className="box overflow-hidden main-content-card">
                            <div className="box-body p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1 border-2 border-gray-400">
                                        <img src={Yamaha_Mio_Sporty} alt="Kawasaki Dominar 400" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="col-span-1">
                                    <h1 className="mt-8 mb-6">Yamaha Mio Sporty</h1>
                                    <h4 className="mt-2 mb-2">₱73,900.00</h4>
                                    <p>Price may vary upon branch visit.</p>
                                    <h4 className="mt-4 mb-2">Features</h4>
                                    <ul>
                                        <li>• REFLECTORIZED GRAPHICS (MATTE BOLD EDITION)</li>
                                        <li>• MIO EMBLEM(MATTE BOLD EDITION)</li>
                                        <li>• TAIL LIGHT</li>
                                        <li>• THERMAL WELDED DOUBLE SEAT</li>
                                        <li>• DISC BRAKE</li>
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
                                    The ride amplifies individuality by bringing an array of personal choices. Immerse yourself in a culture with a refreshing design of the Mio Sporty. Know your distinctive ride that expresses limitless fun and vibrance on the road.
                                </p>

                                <h4 className="mt-6 mb-2 flex ">Specification</h4>
                                <div className="flex">
                                    
                            
                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Engine Type</th>
                                            <td className="border border-red-500 p-2">Air-cooled, 4-Stroke, SOHC, 2-Valve</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Bore & stroke</th>
                                            <td className="border border-red-500 p-2">50.0 x 57.9mm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum torque</th>
                                            <td className="border border-red-500 p-2">7.2N・m(0.7kgf・m)/5500r/min</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Engine oil capacity</th>
                                            <td className="border border-red-500 p-2">0.9 L</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Transmission type</th>
                                            <td className="border border-red-500 p-2">None</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Cylinder arrangement</th>
                                            <td className="border border-red-500 p-2">Single Cylinder</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Compression ratio</th>
                                            <td className="border border-red-500 p-2">8.8:1</td>
                                        </tr>
                                    </tbody>
                                </table>


                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Starting System</th>
                                            <td className="border border-red-500 p-2">Electric Starter & Kickstarter</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel supply system</th>
                                            <td className="border border-red-500 p-2">Carburetor</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Displacement</th>
                                            <td className="border border-red-500 p-2">114 cm³</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum horse power</th>
                                            <td className="border border-red-500 p-2">5.7kW(7.7PS)/8500r/min</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Lubrication system</th>
                                            <td className="border border-red-500 p-2">Wet sump</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Clutch type</th>
                                            <td className="border border-red-500 p-2">Dry, Centrifugal, Shoe</td>
                                        </tr>
                                    </tbody>
                                </table>


                                </div>
                                    <h4 className="mt-8 mb-2">Related Products</h4>
                                        <p>
                                        Explore our featured motorcycles, starting with top models like the Yamaha Mio Gear125. More models coming soon
                                        </p>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                        <Link to="/YamahaMio" className="block text-center"
                                            onClick={() => window.scrollTo({ top: 100})}>
                                            <img
                                                src={Yamaha_Mio_Gear_125}
                                                alt="Yamaha Mio Gear125"
                                            />
                                            <p className="text-sm font-medium hover:underline">Yamaha Mio Gear125</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱77,400.00</p>
                                        </Link>
                                    </div>
                                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                        <Link to="/YamahaMioi125" className="block text-center"
                                            onClick={() => window.scrollTo({ top: 100})}>
                                            <img
                                                src={Yamaha_Mio_i125}
                                                alt="Yamaha Mio Gear125"
                                            />
                                            <p className="text-sm font-medium hover:underline">Yamaha Mio Gear125</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱77,400.00</p>
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
export default YamahaMioSporty;
