import Breadcrumb from "../../../components/UserBreadcrums"
import Header from "../../../layouts/UserLayouts/UserHeader"
import Sidemenu from "../../../layouts/UserLayouts/UserSidemenu"
import Kawasaki_klx from "../../../assets/photos/motors/kawasaki.png";
import Kawasaki_Barako from "../../../assets/photos/motors/kawasakiBarako.png";
import Kawasaki_CT from "../../../assets/photos/motors/kawasakiCT.png";
import Kawasaki_CT100B from "../../../assets/photos/motors/kawasakiCT100B.png";
import { Link } from "react-router-dom";
import Installment from "../../../layouts/UserLayouts/InstallmentCalculator/Installment";
import { useState } from "react";

function KawasakiBarako() {
    const [showCalculator, setShowCalculator] = useState(false);
    const motorcyclePrice = 90500; // Your motorcycle price

    return (
        <>
        <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Kawasaki KLX150"
                        links={[{ text: "Motorcycles", link: "/motorcycles" }]}
                        active="Kawasaki KLX150"/> 
                    <div className="xxl:col-span-9 col-span-12">
                        <div className="box overflow-hidden main-content-card">
                            <div className="box-body p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1 border-2 border-gray-300">
                                        <img src={Kawasaki_Barako} alt="Kawasaki Dominar 400" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="col-span-1">
                                    <h1 className="mt-8 mb-6">Kawasaki Barako II 175</h1>
                                    <h4 className="mt-2 mb-2">₱90,500.00</h4>
                                    <p>Price may vary upon branch visit.</p>
                                    <h4 className="mt-4 mb-2">Features</h4>
                                    <ul>
                                        <li>• 4-Stroke, Single Overhead Camshaft, Single-Cylinder Engine</li>
                                        <li>• Automatic Compression Release System</li>
                                        <li>• Updated Instrumentation Panel</li>
                                        <li>• Environment-Friendly Exhaust System</li>
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
                                    The Barako II is known by the tricycle market as a reliable partner and a heavy-duty machine equipped with a 177cc 4-stroke engine that is equipped with Kawasaki Automatic Compression Release (KACR) that gives the rider ease in kick-starting. The Barako II also comes with an updated instrumentation panel that makes information more accessible to the users.
                                </p>

                                <h4 className="mt-6 mb-2 flex ">Specification</h4>
                                <div className="flex">
                                    
                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Engine Type</th>
                                            <td className="border border-red-500 p-2">4-Stroke, SOHC</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum Power</th>
                                            <td className="border border-red-500 p-2">12.74 HP @ 7,500 rpm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel Tank Capacity</th>
                                            <td className="border border-red-500 p-2">12 L</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Displacement</th>
                                            <td className="border border-red-500 p-2">177 cc</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum Torque</th>
                                            <td className="border border-red-500 p-2">13.1 N.M. @ 4,500 rpm</td>
                                        </tr>
                                    </tbody>
                                </table>


                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Cooling System</th>
                                            <td className="border border-red-500 p-2">Air-cooled</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Starting System</th>
                                            <td className="border border-red-500 p-2">Electric & Kick Start</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Transmission</th>
                                            <td className="border border-red-500 p-2">4-speed constant</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Wheel Type</th>
                                            <td className="border border-red-500 p-2">Spoke</td>
                                        </tr>
                                    </tbody>
                                </table>


                                </div>
                                    <h4 className="mt-8 mb-2">Related Products</h4>
                                        <p>
                                            Explore our featured motorcycles, starting with top models like the Kawasaki KLX150 BF and Kawasaki CT125. More models coming soon
                                        </p>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                        <Link to="/KawasakiKLX" className="block text-center"
                                            onClick={() => window.scrollTo({ top: 100})}>
                                            <img
                                                src={Kawasaki_klx}  
                                                alt="Kawasaki KLX150 BF"/>
                                            <p className="text-sm font-medium hover:underline">Kawasaki KLX150 BF</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱129,900.00</p>
                                        </Link>
                                    </div>
                                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                        <Link to="/KawasakiCT" className="block text-center"
                                            onClick={() => window.scrollTo({ top: 100})}>
                                            <img
                                                src={Kawasaki_CT}  
                                                alt="Kawasaki CT125"/>
                                            <p className="text-sm font-medium hover:underline">Kawasaki CT125</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱58,700.00</p>
                                        </Link>
                                    </div>
                                    <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                        <Link to="/KawasakiCT100B" className="block text-center"
                                            onClick={() => window.scrollTo({ top: 100})}>
                                            <img
                                                src={Kawasaki_CT100B}  
                                                alt="Kawasaki CT100B"/>
                                            <p className="text-sm font-medium hover:underline">Kawasaki CT100B</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱52,200.00</p>
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
export default KawasakiBarako;