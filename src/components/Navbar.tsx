import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-6 px-10 bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00D084] rounded-lg flex items-center justify-center text-white font-black">
                    P
                </div>
                <span className="text-xl font-bold text-gray-800 tracking-tight">PinRu</span>
            </div>

            <div className="flex gap-8 items-center">
                <a href="/" className="text-gray-500 hover:text-[#00D084] font-medium transition-colors">Beranda</a>
                <a href="#ruangan" className="text-gray-500 hover:text-[#00D084] font-medium transition-colors">Ruangan</a>
                
                <div className="flex gap-3 items-center ml-4">
                    <Link 
                        to="/login" 
                        className="text-gray-600 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all"
                    >
                        Masuk
                    </Link>

                    <Link 
                        to="/register" 
                        className="bg-[#00D084] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#00b372] transition-all shadow-lg shadow-green-100"
                    >
                        Daftar
                    </Link>
                </div>
            </div>
        </nav>
    );
}