import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/UserBreadcrums";
import Header from "../../layouts/UserLayouts/UserHeader";
import Sidemenu from "../../layouts/UserLayouts/UserSidemenu";
import Honda_winnerX from "../../assets/photos/motors/hondax.png";
import Honda_ADV_160 from "../../assets/photos/motors/hondaa.png";
import Honda_Click from "../../assets/photos/motors/hondaClick.png";
import Honda_Alpha from "../../assets/photos/motors/hondaAlpha.png";
import Honda_RS from "../../assets/photos/motors/hondaRS.png";
import Suzuki_Raider_Fi_150 from "../../assets/photos/motors/suzuki.png";
import Suzuki_Raider from "../../assets/photos/motors/suzuki-gsx.png";
import Kawasaki_klx from "../../assets/photos/motors/kawasaki.png";
import Kawasaki_Barako from "../../assets/photos/motors/kawasakiBarako.png";
import Kawasaki_CT100B from "../../assets/photos/motors/kawasakiCT100B.png";
import Kawasaki_CT from "../../assets/photos/motors/kawasakiCT.png";
import Yamaha_Mio_Gear_125 from "../../assets/photos/motors/mio_gear125.png";
import Yamaha_Mio_i125 from "../../assets/photos/motors/YamahaMioi125.png";
import Yamaha_Mio_Sporty from "../../assets/photos/motors/YamahaMioSporty.png";
import Suzuki_Burgman from "../../assets/photos/motors/SuzukiBurgman.png";

function Motorcycles() {
    const navigate = useNavigate();
    const [selectedBrand, setSelectedBrand] = React.useState("All");
    const [sortOption, setSortOption] = React.useState("Default");
    const [searchTerm, setSearchTerm] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 12;

    const motorcycles = [
        { id: 1, brand: "Honda", model: "Honda WINNER X", price: "131,900", image: Honda_winnerX, Link: "/HondaX" },
        { id: 2, brand: "Honda", model: "Honda ADV 160", price: "164,900", image: Honda_ADV_160, Link: "/HondaADV" },
        { id: 3, brand: "Honda", model: "Honda CLICK125", price: "80,900", image: Honda_Click, Link: "/HondaClick" },
        { id: 4, brand: "Honda", model: "Honda TMX125 Alpha", price: "56,900", image: Honda_Alpha, Link: "/HondaAlpha" },
        { id: 5, brand: "Honda", model: "Honda RS125", price: "75,900", image: Honda_RS, Link: "/HondaRS" },
        { id: 6, brand: "Suzuki", model: "Suzuki Raider Fi 150", price: "119,900", image: Suzuki_Raider_Fi_150, Link: "/SuzukiFI" },
        { id: 7, brand: "Suzuki", model: "Suzuki GSX-S150", price: "133,900", image: Suzuki_Raider, Link: "/SuzukiGSX" },
        { id: 8, brand: "Suzuki", model: "Suzuki Burgman Street 125-EX", price: "92,400", image: Suzuki_Burgman, Link: "/SuzukiBurgman" },
        { id: 9, brand: "Kawasaki", model: "Kawasaki KLX150", price: "129,900", image: Kawasaki_klx, Link: "/KawasakiKLX" },
        { id: 10, brand: "Kawasaki", model: "Kawasaki Barako II 175", price: "90,500", image: Kawasaki_Barako, Link: "/KawasakiBarako" },
        { id: 11, brand: "Kawasaki", model: "Kawasaki CT125", price: "58,700", image: Kawasaki_CT, Link: "/KawasakiCT" },
        { id: 12, brand: "Kawasaki", model: "Kawasaki CT100B", price: "52,200", image: Kawasaki_CT100B, Link: "/KawasakiCT100B" },
        { id: 13, brand: "Yamaha", model: "Yamaha Mio Gear 125", price: "77,400", image: Yamaha_Mio_Gear_125, Link: "/YamahaMio" },
        { id: 14, brand: "Yamaha", model: "Yamaha Mio i125", price: "77,900", image: Yamaha_Mio_i125, Link: "/YamahaMioi125" },
        { id: 15, brand: "Yamaha", model: "Yamaha Mio Sporty", price: "73,900", image: Yamaha_Mio_Sporty, Link: "/YamahaMioSporty" },
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
                return a.id - b.id;
            case "Latest":
                return b.id - a.id;
            case "Low to High":
                return parseFloat(a.price.replace(/,/g, "")) - parseFloat(b.price.replace(/,/g, ""));
            case "High to Low":
                return parseFloat(b.price.replace(/,/g, "")) - parseFloat(a.price.replace(/,/g, ""));
            default:
                return a.id - b.id;
        }
    });

    const totalPages = Math.ceil(sortedMotorcycles.length / itemsPerPage);
    const paginatedMotorcycles = sortedMotorcycles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb title="Motorcycles" active="Motorcycles" />
                    <div className="flex flex-wrap justify-between items-center mt-4 mb-4">
                        <div className="border border-black header-element header-search md:!block !hidden my-auto auto-complete-search">
                            <input
                                type="text"
                                className="header-search-bar form-control"
                                id="header-search"
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
                        {paginatedMotorcycles.map((motorcycle) => (
                            <div
                                key={motorcycle.id}
                                className="block cursor-pointer"
                                onClick={() => {
                                    navigate(motorcycle.Link);
                                    window.scrollTo({ top: 0 });
                                }}
                            >
                                <div className="border border-gray-300 p-3 rounded shadow-sm hover:shadow-lg transition rounded-lg overflow-hidden">
                                    <img
                                        src={motorcycle.image}
                                        alt={motorcycle.model}
                                        className="w-full h-auto rounded mb-2 transition-transform duration-300 ease-in-out hover:scale-110"
                                    />
                                    <h3 className="text-lg font-semibold text-gray-800">{motorcycle.model}</h3>
                                    <div className="bg-red-600 text-white rounded-md p-3 mt-1">
                                        <h6 className="font-bold text-white">₱{motorcycle.price}.00</h6>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                        <div>
                            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                            {Math.min(currentPage * itemsPerPage, sortedMotorcycles.length)} of{" "}
                            {sortedMotorcycles.length} results
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                className="px-3 py-1 bg-gray-400 text-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`px-3 py-1 ${
                                        currentPage === index + 1
                                            ? "bg-red-500 text-white"
                                            : "bg-gray-400 text-gray-800"
                                    } rounded`}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                className="px-3 py-1 bg-gray-400 text-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-4"></div>
            </div>
        </>
    );
}

export default Motorcycles;
