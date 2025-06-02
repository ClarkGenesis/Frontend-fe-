import { Link } from "react-router-dom";
import logo1 from "../assets/photos/logo-text.png";

function Header() {
    return (
        <header className="fixed left-0 top-0 w-full flex justify-between items-center px-6 py-4 bg-black z-50">
            <Link to="/" className="flex items-center">
                <img
                    src={logo1}
                    alt="Brand Logo"
                    className="w-32"/>
            </Link>

            <nav>
                <ul className="flex items-right py-2 px-4 gap-8 text-white font-medium">
                    <li>
                        <Link
                            to="/"
                            className="text-white flex items-center gap-2 hover:underline "
                            onClick={() => window.scrollTo({ top: 0})}>
                            <i className="bi bi-house"></i> Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="text-white flex items-center gap-2 hover:underline"
                            onClick={() => window.scrollTo({ top: 0})}>
                            <i className="bi bi-info-circle"></i> About Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className="text-white flex items-center gap-2 hover:underline"
                            onClick={() => window.scrollTo({ top: 0})}>
                            <i className="bi bi-envelope"></i> Contact
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login"
                            className="text-white flex items-center gap-2 hover:underline"
                            onClick={() => window.scrollTo({ top: 0})}>
                            <i className="bi bi-box-arrow-in-right"></i> Log In
                        </Link>
                    </li>
                </ul>
            </nav>

            <Link
                to="/register"
                className="bg-red-600 text-white font-semibold py-2 px-4 rounded-full border-2 border-white"
                onClick={() => window.scrollTo({ top: 0})}>
                Register Now
            </Link>
        </header>
    );
};

export default Header;