import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-6 px-10 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#00D084] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-100">
                    P
                </div>
                <span className="text-2xl font-black text-gray-800 tracking-tighter">PinRu</span>
            </div>

            <div className="flex gap-8 items-center">
                <a href="#hero" className="text-gray-500 hover:text-[#00D084] font-bold text-sm transition-colors uppercase tracking-widest">Beranda</a>
                <a href="#ruangan" className="text-gray-500 hover:text-[#00D084] font-bold text-sm transition-colors uppercase tracking-widest">Ruangan</a>
                
                <div className="flex gap-3 items-center ml-4 border-l border-gray-100 pl-8">
                    <Link 
                        to="/login" 
                        className="text-gray-500 px-5 py-2.5 rounded-xl font-bold text-sm hover:text-gray-800 transition-all"
                    >
                        Masuk
                    </Link>

                    <Link 
                        to="/register" 
                        className="bg-[#00D084] text-white px-7 py-3 rounded-2xl font-black text-sm hover:bg-[#00b372] transition-all shadow-xl shadow-green-100"
                    >
                        Mulai Daftar
                    </Link>
                </div>
            </div>
        </nav>
    );
}