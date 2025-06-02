import Breadcrumb from "../../../components/AdminBreadcrums"
import Header from "../../../layouts/AdminLayouts/AdminHeader"
import Sidemenu from "../../../layouts/AdminLayouts/AdminSidemenu"
import Kawasaki_klx from "../../../assets/photos/motors/kawasaki.png";
import { Link } from "react-router-dom";

function AdminKawasakiK() {
    return (
        <>
        <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Kawasaki KLX150"
                        links={[{ text: "Motorcycles", link: "/admin-motorcycles" }]}
                        active="Kawasaki KLX150"/> 
                    <div className="xxl:col-span-9 col-span-12">
                        <div className="box overflow-hidden main-content-card">
                            <div className="box-body p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1 border-2 border-gray-400">
                                        <img src={Kawasaki_klx} alt="Kawasaki Dominar 400" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="col-span-1">
                                    <h1 className="mt-8 mb-6">Kawasaki KLX150 BF</h1>
                                    <h4 className="mt-2 mb-2">₱129,900.00</h4>
                                    <p>Price may vary upon branch visit.</p>
                                    <h4 className="mt-4 mb-2">Features</h4>
                                    <ul>
                                        <li>• Class-First LED Headlamp</li>
                                        <li>• New Digital Console Panel</li>
                                        <li>• Slim and Lightweight Body</li>
                                        <li>• KLX150 Model Exclusives</li>
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
                                The KLX 150BF, the successor to the KLX 150L, offers improved off-road performance with a reliable single-cylinder engine, lightweight perimeter frame, and inverted front fork.
                                </p>

                                <h4 className="mt-6 mb-2 flex ">Specification</h4>
                                <div className="flex">
                                    
                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Engine Type</th>
                                            <td className="border border-red-500 p-2">4-Stroke, Air-cooled, SOHC, Single Cylinder</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Displacement</th>
                                            <td className="border border-red-500 p-2">144 cc</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Dimension (LxWxH)</th>
                                            <td className="border border-red-500 p-2">2050 x 960 x 1195 mm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum Power</th>
                                            <td className="border border-red-500 p-2">11.53 HP (8.6 kW) / 8000 rpm</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Maximum Torque</th>
                                            <td className="border border-red-500 p-2">11.3 N.m (1.2 kgf.m) / 6500 rpm</td>
                                        </tr>
                                    </tbody>
                                </table>


                                <table className="w-full border border-gray-400">
                                    <tbody>
                                        <tr>
                                            <th className="border border-red-500 p-2">Curb Weight</th>
                                            <td className="border border-red-500 p-2">199 kg</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Fuel Capacity</th>
                                            <td className="border border-red-500 p-2">6.9 L</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Wheel Type</th>
                                            <td className="border border-red-500 p-2">Spoke</td>
                                        </tr>
                                        <tr>
                                            <th className="border border-red-500 p-2">Brake Type (Front & Rear)</th>
                                            <td className="border border-red-500 p-2">Disc</td>
                                        </tr>
                                    </tbody>
                                </table>


                                </div>
                                    <h4 className="mt-8 mb-2">Related Models</h4>
                                        <p>
                                        Explore our featured motorcycles, starting with top models like the Kawasaki Dominar400. More models coming soon
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
export default AdminKawasakiK;

