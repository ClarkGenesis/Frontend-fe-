import Breadcrumb from "../../../components/AdminBreadcrums"
import Header from "../../../layouts/AdminLayouts/AdminHeader"
import Sidemenu from "../../../layouts/AdminLayouts/AdminSidemenu"
import Honda_winnerX from "../../../assets/photos/motors/hondax.png";
import Honda_ADV_160 from "../../../assets/photos/motors/hondaa.png";
import { Link } from "react-router-dom";

function AdminHondaX() {
    return (
        <>
        <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Honda WINNER X"
                        links={[{ text: "Motorcycles", link: "/admin-motorcycles" }]}
                        active="Honda WINNER X"/> 
                    <div className="xxl:col-span-9 col-span-12">
                        <div className="box overflow-hidden main-content-card">
                            <div className="box-body p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1 border-2 border-gray-400">
                                        <img src={Honda_winnerX} alt="Honda ADV 160" className="w-50 h-full object-cover" />
                                    </div>
                                    <div className="col-span-1">
                                        <h1 className="mt-8 mb-6">Honda All New Winner X</h1>
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

                                        <Link to="/details"
                                            className="mt-3 mb-6 block w-60 text-center px-4 py-2 gap-2 rounded-lg text-white bg-gray-600"
                                            onClick={() => window.scrollTo({ top: 0})}>
                                             Edit Details
                                        </Link>
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
                                    <h4 className="mt-8 mb-2">Related Models</h4>
                                        <p>
                                        Explore our featured Honda motorcycles, starting with the Honda ADV160. More models coming soon!
                                        </p>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

                                    <Link to="/aHondaADV" className="block text-center"
                                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                        <img
                                            src={Honda_ADV_160}
                                            alt="Honda WINNER X"
                                            className="w-50 mx-auto mb-2 rounded-lg border border-black"/>
                                        <p className="text-sm font-medium hover:underline">Honda ADV160</p>
                                        <p className="text-gray-600">₱164,900.00</p>
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
export default AdminHondaX;
