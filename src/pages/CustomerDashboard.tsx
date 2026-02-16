import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getBookings, getRooms } from "../services/api";
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  User, 
  MapPin, 
  Users,
  Plus
} from "lucide-react";

export default function CustomerDashboard() {
    const [myBookings, setMyBookings] = useState([]);
    const [availableRooms, setAvailableRooms] = useState([]);
    const [loading, setLoading] = useState(true); 
    
    const currentUserName = localStorage.getItem("userName") || "Guest"; 
    const userRole = localStorage.getItem("userRole") || "Mahasiswa";

    useEffect(() => {
        const loadDashboardData = async () => {
            setLoading(true);
            try {
                const [bookingsData, roomsData] = await Promise.all([
                    getBookings(),
                    getRooms()
                ]);
                
                // Filter agar hanya menampilkan booking milik user ini
                const filteredBookings = bookingsData.filter((b: any) => b.customerName === currentUserName);
                setMyBookings(filteredBookings);
                
                // Menampilkan 3 ruangan pertama untuk rekomendasi
                setAvailableRooms(roomsData.slice(0, 3));
            } catch (err) {
                console.error("Gagal memuat dashboard", err);
            } finally {
                setLoading(false);
            }
        };
        loadDashboardData();
    }, []);

    return (
        <DashboardLayout role="Customer">
            {/* 1. Header & Info Akun Pribadi */}
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">
                        Selamat Datang, <span className="text-[#00D084]">{currentUserName}</span>! 👋
                    </h1>
                    <p className="text-gray-500 text-sm">Berikut adalah ringkasan aktivitas peminjaman kamu.</p>
                </div>
                
                {/* Info Akun Pribadi */}
                <div className="flex items-center gap-3 bg-white border border-gray-100 p-3 px-5 rounded-2xl shadow-sm">
                    <div className="w-10 h-10 bg-green-50 text-[#00D084] rounded-xl flex items-center justify-center">
                        <User size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-800 leading-none">{currentUserName}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">{userRole}</p>
                    </div>
                </div>
            </header>

            {loading ? (
                /* Menghilangkan warning 'loading' dengan menggunakannya di sini */
                <div className="flex flex-col items-center py-20 animate-pulse text-gray-400">
                    <div className="w-12 h-12 border-4 border-gray-100 border-t-[#00D084] rounded-full animate-spin mb-4"></div>
                    <p>Sinkronisasi data...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                    {/* 2. Riwayat Peminjaman Pribadi */}
                    <div className="xl:col-span-2">
                        <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                            <Calendar size={20} className="text-[#00D084]" /> Riwayat Saya
                        </h2>
                        
                        {myBookings.length === 0 ? (
                            <div className="bg-gray-50 border-2 border-dashed border-gray-100 rounded-4xl p-10 text-center">
                                <p className="text-gray-400 font-medium">Belum ada peminjaman yang tercatat untuk akun ini.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {myBookings.map((booking: any) => (
                                    <div key={booking.id} className="bg-white border border-gray-100 rounded-4xl p-6 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black uppercase border
                                                ${booking.status === "Approved" ? "bg-green-50 text-green-600 border-green-100" : 
                                                  booking.status === "Rejected" ? "bg-red-50 text-red-600 border-red-100" : 
                                                  "bg-yellow-50 text-yellow-600 border-yellow-100"}`}>
                                                {booking.status === "Approved" ? <CheckCircle2 size={10} /> : 
                                                 booking.status === "Rejected" ? <XCircle size={10} /> : <Clock size={10} />}
                                                {booking.status}
                                            </div>
                                        </div>
                                        <h3 className="font-black text-gray-800 text-lg">{booking.roomName}</h3>
                                        <p className="text-[11px] text-gray-400 font-bold mb-6 flex items-center gap-1">
                                            <Clock size={12} className="text-[#00D084]" /> 
                                            {new Date(booking.startTime).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
                                        </p>
                                        <div className="flex justify-between bg-gray-50 p-4 rounded-2xl text-[11px] font-black">
                                            <span className="text-gray-400 uppercase">Waktu</span>
                                            <span>{new Date(booking.startTime).getHours()}.00 - {new Date(booking.endTime).getHours()}.00</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 3. Rekomendasi Kelas yang Bisa di Booking */}
                    <div>
                        <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                            <MapPin size={20} className="text-blue-500" /> Tersedia Sekarang
                        </h2>
                        <div className="space-y-4">
                            {availableRooms.map((room: any) => (
                                <div key={room.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs flex items-center justify-between group hover:border-blue-100 transition-all">
                                    <div>
                                        <p className="font-black text-gray-800 group-hover:text-blue-600 transition-colors">{room.name}</p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-[10px] text-gray-400 flex items-center gap-1 font-bold">
                                                <Users size={10}/> {room.capacity} Orang
                                            </span>
                                            <span className="text-[10px] text-gray-400 flex items-center gap-1 font-bold">
                                                <MapPin size={10}/> {room.location}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                        <Plus size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}