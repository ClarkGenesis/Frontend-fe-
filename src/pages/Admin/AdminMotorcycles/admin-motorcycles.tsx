import Breadcrumb from "../../../components/AdminBreadcrums";
import Header from "../../../layouts/AdminLayouts/AdminHeader";
import Sidemenu from "../../../layouts/AdminLayouts/AdminSidemenu";
import Honda_winnerX from "../../../assets/photos/motors/hondax.png";
import Honda_ADV_160 from "../../../assets/photos/motors/hondaa.png";
import Suzuki_Raider_Fi_150 from "../../../assets/photos/motors/suzuki.png";
import Suzuki_Raider from "../../../assets/photos/motors/suzuki-gsx.png";
import Kawasaki_klx from "../../../assets/photos/motors/kawasaki.png";
import Yamaha_Mio_Gear_125 from "../../../assets/photos/motors/mio_gear125.png";
import React from "react";
import { Link } from "react-router-dom";


function AdminMotorcycles() {
    const [selectedBrand, setSelectedBrand] = React.useState("All");
    const [sortOption, setSortOption] = React.useState("Default");
    const [searchTerm, setSearchTerm] = React.useState("");

    const motorcycles = [
        { id: 1, brand: "Honda", model: "Honda WINNER X", price: "131,900", downpayment: "26,380", monthly: "5,483", image: Honda_winnerX, Link: "/aHondax" },
        { id: 2, brand: "Honda", model: "Honda ADV 160", price: "164,900", downpayment: "32,980", monthly: "6,867", image: Honda_ADV_160, Link: "/aHondaADV" },
        { id: 3, brand: "Suzuki", model: "Suzuki Raider Fi 150", price: "119,900", downpayment: "23,980", monthly: "4,992", image: Suzuki_Raider_Fi_150, Link: "/aSuzukiFI" },
        { id: 4, brand: "Suzuki", model: "Suzuki GSX-S150", price: "133,900", downpayment: "26,780", monthly: "5,567", image: Suzuki_Raider, Link: "/aSuzukiGSX" },
        { id: 5, brand: "Kawasaki", model: "Kawasaki KLX150", price: "129,900", downpayment: "25,980", monthly: "5,408", image: Kawasaki_klx, Link: "/aKawasakiKLX" },
        { id: 6, brand: "Yamaha", model: "Yamaha Mio Gear 125", price: "77,400", downpayment: "15,480", monthly: "3,210", image: Yamaha_Mio_Gear_125, Link: "/aYamahaMio" },
    ];
    

    const filteredMotorcycles = motorcycles.filter((motorcycle) => {
        if (selectedBrand === "All") return true;
        return motorcycle.brand === selectedBrand;
    }).filter((motorcycle) => {
        return motorcycle.model.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const sortedMotorcycles = filteredMotorcycles.sort((a, b) => {
        switch (sortOption) {
            case "Popularity":
                return a.id - b.id; // Keep sorting by ID for popularity
            case "Latest":
                return b.id - a.id; // Latest means sorting by descending ID
            case "Low to High":
                return parseFloat(a.price.replace(/,/g, "")) - parseFloat(b.price.replace(/,/g, ""));
            case "High to Low":
                return parseFloat(b.price.replace(/,/g, "")) - parseFloat(a.price.replace(/,/g, ""));
            default:
                return a.id - b.id; // Default sorting by ID
        }
    });
    

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Motorcycles"
                        active="Motorcycles"
                        buttons={
                            <Link to="/add-motorcycle" className="bg-red-600 border border-black text-white px-4 py-2 rounded flex items-center gap-2">
                                <i className="ri-add-line"></i> Add Motorcycle
                            </Link>
                        }
                    />
                    <div className="flex flex-wrap justify-between items-center mt-4 mb-4">

                        <div className="border border-black header-element header-search md:!block !hidden my-auto auto-complete-search">
                            <input type="text" className="header-search-bar form-control" id="header-search"
                                placeholder="Search Model"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <a href="javascript:void(0);" className="header-search-icon border-0">
                                <i className="ri-search-line"></i>
                            </a>
                        </div>

                        <select
                            className="border border-gray-300 m-4 rounded bg-white text-gray-700"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="Default">Default sorting</option>
                            <option value="Popularity">Sort by popularity</option>
                            <option value="Latest">Sort by latest</option>
                            <option value="Low to High">Sort by: price: low to high</option>
                            <option value="High to Low">Sort by: price: high to low</option>
                        </select>

                        <select
                            className="border border-gray-300 rounded bg-white text-gray-700"
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Honda">Honda</option>
                            <option value="Suzuki">Suzuki</option>
                            <option value="Kawasaki">Kawasaki</option>
                            <option value="Yamaha">Yamaha</option>
                        </select>

                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {sortedMotorcycles.map((motorcycle) => (
                            <Link to={motorcycle.Link} key={motorcycle.id} className="block"
                                onClick={() => window.scrollTo({ top: 0})}>
                                <div className="border border-gray-300 p-3 rounded shadow-sm hover:shadow-lg transition rounded-md">
                                    {/* Motorcycle Image */}
                                    <img
                                        src={motorcycle.image}
                                        alt={motorcycle.model}
                                        className="w-full h-auto rounded mb-2"
                                    />
                                    <h3 className="text-lg font-semibold text-gray-800">{motorcycle.model}</h3>

                                    {/* Pricing Details Box */}
                                    <div className="bg-red-600 text-white rounded p-3 mt-1 rounded-md">
                                        <h6 className="font-bold text-white">₱{motorcycle.price}.00</h6>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>


                    <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                        <div>Showing 1 to {sortedMotorcycles.length} of {sortedMotorcycles.length} results</div>
                        <div className="flex items-center gap-2">
                            <button
                                className="px-3 py-1 bg-gray-400 text-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled
                            >
                                Previous
                            </button>

                            <button className="px-3 py-1 bg-red-500 text-white rounded">
                                1
                            </button>

                            <button
                                className="px-3 py-1 bg-gray-400 text-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    <div className="mt-5"></div>
                </div>
            </div>
        </>
    );
}
export default AdminMotorcycles;
