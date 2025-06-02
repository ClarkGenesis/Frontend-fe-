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

function KawasakiCT100B() {
    const [showCalculator, setShowCalculator] = useState(false);
    const motorcyclePrice = 58700; // Your motorcycle price

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
                                        <img src={Kawasaki_CT100B} alt="Kawasaki Dominar 400" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="col-span-1">
                                    <h1 className="mt-8 mb-6">Kawasaki CT100B</h1>
                                    <h4 className="mt-2 mb-2">₱52,200.00</h4>
                                    <p>Price may vary upon branch visit.</p>
                                    <h4 className="mt-4 mb-2">Features</h4>
                                    <ul>
                                        <li>• 4-Sroke, 2-Valve, SOHC Engine</li>
                                        <li>• Roller Rocker Arm</li>
                                        <li>• Round Headlamp</li>

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
                                    Just like its twin, the CT100B is a hero in fuel efficiency! Equipped with 4-stroke, SOHC, 100cc engine, this model can also give extraordinary mileage to its driver. Plus, it sports the classic Philippine tricycle look with lesser plastic parts and round headlamp. The CT100B is your go-to tricycle model, fuel efficient and at the same time very economical.
                                </p>

                                <h4 className="mt-6 mb-2 flex ">Specification</h4>
                                <div className="flex">
                                    
                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Engine Type</th>
                                            <td className="border border-red-500 p-2">4-stroke, SOHC</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum Power</th>
                                            <td className="border border-red-500 p-2">7.7HP @ 7500 rpm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel Tank Capacity</th>
                                            <td className="border border-red-500 p-2">10.5 L</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Displacement</th>
                                            <td className="border border-red-500 p-2">102 cc</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum Torque</th>
                                            <td className="border border-red-500 p-2">7.7HP @ 7500 rpm</td>
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
                                            <td className="border border-red-500 p-2">Kick Start</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Transmission</th>
                                            <td className="border border-red-500 p-2">4-speed constant mesh</td>
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
                                            Explore our featured motorcycles, starting with top models like the Kawasaki KLX150 BF and more. More models coming soon
                                        </p>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                                    <Link to="/KawasakiKLX" className="block text-center"
                                        onClick={() => window.scrollTo({ top: 100})}>
                                        <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                            <img
                                                src={Kawasaki_klx}  
                                                alt="Kawasaki KLX150 BF"
                                            />
                                            <p className="text-sm font-medium hover:underline">Kawasaki KLX150 BF</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱129,900.00</p>
                                        </div>
                                    </Link>
                                    <Link to="/KawasakiBarako" className="block text-center"
                                        onClick={() => window.scrollTo({ top: 100})}>
                                        <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                            <img
                                                src={Kawasaki_Barako}  
                                                alt="Kawasaki Barako II 175"
                                            />
                                            <p className="text-sm font-medium hover:underline">Kawasaki Barako II 175</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱90,500.00</p>
                                        </div>
                                    </Link>
                                    <Link to="/KawasakiCT" className="block text-center"
                                        onClick={() => window.scrollTo({ top: 100})}>
                                        <div className="p-3 rounded shadow-md border border-gray-300 rounded-md">
                                            <img
                                                src={Kawasaki_CT}  
                                                alt="Kawasaki Barako II 175"
                                            />
                                            <p className="text-sm font-medium hover:underline">Kawasaki CT125</p>
                                            <p className="bg-red-500 text-white rounded p-3 mt-3 rounded-md">₱58,700.00</p>
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
export default KawasakiCT100B;