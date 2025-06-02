import Breadcrumb from "../../../components/AdminBreadcrums"
import Header from "../../../layouts/AdminLayouts/AdminHeader"
import Sidemenu from "../../../layouts/AdminLayouts/AdminSidemenu"
import Suzuki_Raider_Fi_150 from "../../../assets/photos/motors/suzuki.png";
import Suzuki_GSX from "../../../assets/photos/motors/suzuki-gsx.png";
import { Link } from "react-router-dom";

function AdminSuzukiG() {
    return (
        <>
        <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Suzuki GSX-S150"
                        links={[{ text: "Motorcycles", link: "/admin-motorcycles" }]}
                        active="Suzuki GSX-S150"/> 
                    <div className="xxl:col-span-9 col-span-12">
                        <div className="box overflow-hidden main-content-card">
                            <div className="box-body p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1 border-2 border-gray-400">
                                        <img src={Suzuki_GSX} alt="Kawasaki Dominar 400" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="col-span-1">
                                    <h1 className="mt-8 mb-6">Suzuki Raider150 Fi</h1>
                                    <h4 className="mt-2 mb-2">₱133,900.00</h4>
                                    <p>Price may vary upon branch visit.</p>
                                    <h4 className="mt-4 mb-2">Features</h4>
                                    <ul>
                                        <li>• 150CC Fuel-Injected Engine, DOHC, 4-Valve, 6-Speed</li>
                                        <li>• LED Headlight</li>
                                        <li>• Storage Space</li>
                                        <li>• Full Digital Instrument Panel Inspired by Suzuki GSX-S1000</li>
                                    </ul>

                                        <Link to="/details"
                                            className="mt-3 mb-6 block w-60 text-center px-4 py-2 gap-2 rounded-lg text-white bg-gray-600"
                                            onClick={() => window.scrollTo({ top: 0})}>
                                             Edit Details
                                        </Link>
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
                                            <th className="border border-red-500 p-2">Engine Type</th>
                                            <td className="border border-red-500 p-2">4-Stroke, DOHC, 4-Valve, 6-Speed</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Displacement</th>
                                            <td className="border border-red-500 p-2">147.3 cc</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Starting System</th>
                                            <td className="border border-red-500 p-2">Electric & Primary Kick</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum Power</th>
                                            <td className="border border-red-500 p-2">14.1 KW/10,500 RPM</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum Torque</th>
                                            <td className="border border-red-500 p-2">14.0 NM/9,000 RPM</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Bore X Stroke</th>
                                            <td className="border border-red-500 p-2">62.0 MM X 48.8 MM</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Ignition System</th>
                                            <td className="border border-red-500 p-2">N/A</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Brake Type (Front)</th>
                                            <td className="border border-red-500 p-2">Disc</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Brake Type (Rear)</th>
                                            <td className="border border-red-500 p-2">Disc</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Tire Size (Front)</th>
                                            <td className="border border-red-500 p-2">90/80 – 17M/C (Tubeless Tires)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Tire Size (Rear)</th>
                                            <td className="border border-red-500 p-2">130/70 – 17M/C (Tubeless Tires)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Wheel Type</th>
                                            <td className="border border-red-500 p-2">Mags</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Overall Dimensions: L x W x H</th>
                                            <td className="border border-red-500 p-2">2,020 x 745 x 1040 (mm)</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Curb Weight</th>
                                            <td className="border border-red-500 p-2">130 Kg</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Seat Height</th>
                                            <td className="border border-red-500 p-2">785 mm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel Tank Capacity</th>
                                            <td className="border border-red-500 p-2">11 L</td>
                                        </tr>
                                    </tbody>
                                </table>

                                </div>
                                    <h4 className="mt-8 mb-2">Related Models</h4>
                                        <p>
                                        Explore our featured motorcycles, starting with top models like the Suzuki Raider FI 150. More models coming soon
                                        </p>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

                                    <Link to="/aSuzukiFI" className="block text-center"
                                        onClick={() => window.scrollTo({ top: 0})}>
                                        <img
                                            src={Suzuki_Raider_Fi_150}
                                            alt="Honda WINNER X"
                                            className="w-50 mx-auto mb-2 rounded-lg border border-black"/>
                                        <p className="text-sm font-medium hover:underline">Suzuki Raider FI 150</p>
                                        <p className="text-gray-600">₱119,900.00</p>
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
export default AdminSuzukiG;