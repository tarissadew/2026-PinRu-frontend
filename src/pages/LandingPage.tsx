import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getRooms } from "../services/api";

interface Room {
  id: number;
  name: string;
  location: string;
  capacity: number;
  isAvailable: boolean;
}

export default function LandingPage() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    // Memanggil API saat halaman dibuka
    getRooms().then(data => setRooms(data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      
      <header className="text-center py-20 px-4">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Pinjam Ruangan Jadi <span className="text-brand-green">Lebih Mudah</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-10">
          Cek ketersediaan ruangan secara real-time dan ajukan peminjaman dengan cepat.
        </p>
      </header>

      <section className="px-10 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Daftar Ruangan Tersedia</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="h-40 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400">
                🖼️ Room Image
              </div>
              <h3 className="font-bold text-xl mb-1">{room.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{room.location} • Kapasitas {room.capacity} Orang</p>
              
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  room.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {room.isAvailable ? 'Tersedia' : 'Penuh'}
                </span>
                <button className="text-brand-green font-semibold text-sm hover:underline">
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}