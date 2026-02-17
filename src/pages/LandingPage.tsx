import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import { getRooms } from "../services/api";
import { MapPin, Users, ArrowRight } from "lucide-react"; 

interface Room {
  id: number;
  name: string;
  location: string;
  capacity: number;
  isAvailable: boolean;
}

export default function LandingPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRooms().then(data => setRooms(data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      
      {/* Hero Section */}
      <header id="hero" className="text-center py-28 px-4">
        <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tighter">
          Pinjam Ruangan Jadi <span className="text-[#00D084]">Lebih Mudah</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed mb-10">
          Cek ketersediaan ruangan secara real-time dan ajukan peminjaman dengan cepat tanpa ribet birokrasi.
        </p>
        <a 
          href="#ruangan" 
          className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl inline-flex items-center gap-2"
        >
          Mulai Jelajahi <ArrowRight size={20} />
        </a>
      </header>

      {/* Rooms Section */}
      <section id="ruangan" className="px-10 pb-32">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">Daftar Ruangan Tersedia</h2>
          <div className="h-1 flex-1 mx-8 bg-gray-100 rounded-full hidden md:block"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="h-52 bg-linear-to-br from-green-50 to-white rounded-4xl mb-6 flex items-center justify-center border border-gray-50 overflow-hidden relative">
                 <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-[#00D084] group-hover:scale-110 transition-transform duration-500">
                    <MapPin size={40} />
                 </div>
                 <span className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    room.isAvailable ? 'bg-white/80 text-green-600 border-green-100' : 'bg-white/80 text-red-600 border-red-100'
                  } backdrop-blur-md`}>
                    {room.isAvailable ? 'Tersedia' : 'Penuh'}
                  </span>
              </div>

              <div className="px-6 pb-6">
                <h3 className="font-black text-2xl text-gray-800 mb-2">{room.name}</h3>
                <div className="flex items-center gap-4 text-gray-400 font-bold text-xs uppercase tracking-widest mb-8">
                   <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#00D084]" /> {room.location}</span>
                   <span className="flex items-center gap-1.5"><Users size={14} className="text-[#00D084]" /> {room.capacity} Orang</span>
                </div>
                
                <button 
                  onClick={() => navigate("/register")}
                  className="w-full py-4 bg-gray-50 text-gray-500 font-black rounded-2xl hover:bg-[#00D084] hover:text-white transition-all shadow-xs"
                >
                  Lihat Detail & Pinjam
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}