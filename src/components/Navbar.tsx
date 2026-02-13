import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-6 px-10 bg-white border-b border-gray-100">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
                <span className="text-xl font-bold text-gray-800">PinRu</span>
            </div>
            <div className="flex gap-6 items-center">
                <a href="#" className="text-gray-600 hover:text-green-600">Beranda</a>
                <a href="#" className="text-gray-600 hover:text-green-600">Ruangan</a>
                <Link to="/login" className="bg-green-500 text-white px-5 py-2 rounded-full font-medium hover:bg-green-600 transition-all">
                    Masuk
                </Link>
            </div>
        </nav>
    );
}