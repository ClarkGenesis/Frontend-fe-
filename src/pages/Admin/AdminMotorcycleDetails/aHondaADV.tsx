import Breadcrumb from "../../../components/AdminBreadcrums"
import Header from "../../../layouts/AdminLayouts/AdminHeader"
import Sidemenu from "../../../layouts/AdminLayouts/AdminSidemenu"
import Honda_ADV_160 from "../../../assets/photos/motors/hondaa.png";
import Honda_winnerX from "../../../assets/photos/motors/hondax.png";
import { Link } from "react-router-dom";

function AdminHondaA() {
    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Honda ADV 160"
                        links={[{ text: "Motorcycles", link: "/admin-motorcycles" }]}
                        active="Honda ADV 160"
                    />
                    <div className="xxl:col-span-9 col-span-12">
                        <div className="box overflow-hidden main-content-card">
                            <div className="box-body p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1 border-2 border-gray-400">
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

                                        <Link to="/details"
                                            className="mt-3 mb-6 block w-60 text-center px-4 py-2 gap-2 rounded-lg text-white bg-gray-600"
                                            onClick={() => window.scrollTo({ top: 0})}>
                                             Edit Details
                                        </Link>
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
                                    <h4 className="mt-8 mb-2">Related Models</h4>
                                        <p>
                                        Explore our featured Honda motorcycles, starting with the Honda WINNER X. More models coming soon!
                                        </p>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

                                    <Link to="/aHondaX" className="block text-center"
                                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                        <img
                                            src={Honda_winnerX}
                                            alt="Honda WINNER X"
                                            className="w-50 mx-auto mb-2 rounded-lg border border-black"/>
                                        <p className="text-sm font-medium hover:underline">Honda WINNER X</p>
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
export default AdminHondaA;
