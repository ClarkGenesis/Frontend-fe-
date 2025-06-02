import Breadcrumb from "../../../components/AdminBreadcrums"
import Header from "../../../layouts/AdminLayouts/AdminHeader"
import Sidemenu from "../../../layouts/AdminLayouts/AdminSidemenu"
import Yamaha_Mio_Gear_125 from "../../../assets/photos/motors/mio_gear125.png"
import { Link } from "react-router-dom"

function YamahaM() {
    return (
        <>
        <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Yamaha Mio Gear 125"
                        links={[{ text: "Motorcycles", link: "/admin-motorcycles" }]}
                        active="Yamaha Mio Gear 125"/> 
                    <div className="xxl:col-span-9 col-span-12">
                        <div className="box overflow-hidden main-content-card">
                            <div className="box-body p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1 border-2 border-gray-400">
                                        <img src={Yamaha_Mio_Gear_125} alt="Kawasaki Dominar 400" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="col-span-1">
                                    <h1 className="mt-8 mb-6">Yamaha Mio Gear125</h1>
                                    <h4 className="mt-2 mb-2">₱77,400.00</h4>
                                    <p>Price may vary upon branch visit.</p>
                                    <h4 className="mt-4 mb-2">Features</h4>
                                    <ul>
                                        <li>• Tough Design</li>
                                        <li>• Electric Power Socket</li>
                                        <li>• Tubeless Tires</li>
                                        <li>• Rider Side Back Step</li>
                                        <li>• Slip-Resistant Wide Footboard</li>
                                        <li>• Double Hooks</li>
                                        <li>• Stop and Start System</li>
                                        <li>• New 125CC Blue Core Engine with SMG</li>
                                        <li>• LED Headlight with Hazard Lamps</li>
                                        <li>• Answer Back System</li>
                                        <li>• Slim and Compact Body Design</li>
                                        <li>• New Brown Seat</li>
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
                                The MIO Gear is designed to traverse the rugged concrete city. Built to be functional, resilient, and expressive. It has everything you need for the everyday challenge of the metro. Travel with toughness and experience freedom with a wide range of extensibility primed for the urban ride.
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
                                            <th className="border border-red-500 p-2">Cylinder Arrangement</th>
                                            <td className="border border-red-500 p-2">Single Cylinder</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Displacement</th>
                                            <td className="border border-red-500 p-2">125 cm³</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Bore & Stroke</th>
                                            <td className="border border-red-500 p-2">52.4 x 57.9 mm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Compression Ratio</th>
                                            <td className="border border-red-500 p-2">9.5:1</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum Horsepower</th>
                                            <td className="border border-red-500 p-2">7.0 kW (9.4 PS) @ 8,000 r/min</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum Torque</th>
                                            <td className="border border-red-500 p-2">9.6 N·m (1.0 kgf·m) @ 5,500 r/min</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Starting System</th>
                                            <td className="border border-red-500 p-2">Electric Starter & Kickstarter</td>
                                        </tr>
                                    </tbody>
                                </table>


                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Lubrication System</th>
                                            <td className="border border-red-500 p-2">Force-feed Lubrication, Wet Sump</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Engine Oil Capacity</th>
                                            <td className="border border-red-500 p-2">0.8 L</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel Supply System</th>
                                            <td className="border border-red-500 p-2">Fuel Injection</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Clutch Type</th>
                                            <td className="border border-red-500 p-2">Dry, Centrifugal</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Transmission Type</th>
                                            <td className="border border-red-500 p-2">V-Belt Automatic</td>
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
                                            <th className="border border-red-500 p-2">Fuel Tank Capacity</th>
                                            <td className="border border-red-500 p-2">11 L</td>
                                        </tr>
                                    </tbody>
                                </table>


                                </div>
                                    <h4 className="mt-8 mb-2">Related Models</h4>
                                        <p>
                                        Explore our featured motorcycles, starting with top models like the Yamaha YZF-R15M. More models coming soon
                                        </p>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default YamahaM;
