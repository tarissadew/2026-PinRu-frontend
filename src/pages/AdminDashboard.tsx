import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getBookings } from "../services/api";
import { Search, TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = () => {
        getBookings().then(setBookings).catch(console.error);
    };

    const filteredBookings = bookings.filter((b: any) => {
        const matchesSearch = b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.roomName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || b.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Ambil 3 data terbaru berdasarkan ID
    const recentBookings = [...bookings].sort((a: any, b: any) => b.id - a.id).slice(0, 3);

    // Fungsi helper format waktu
    const formatTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit', 
            day: '2-digit', 
            month: 'short' 
        });
    };

    return (
        <DashboardLayout role="Admin">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Dashboard</h1>
                <p className="text-gray-500">Selamat datang kembali, Admin PinRu! Berikut adalah ringkasan hari ini.</p>
            </header>

            {/* --- SECTION 1: STATS CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><TrendingUp size={24} /></div>
                    </div>
                    <p className="text-gray-400 text-sm font-medium">Total Peminjaman</p>
                    <h2 className="text-3xl font-bold text-gray-800">{bookings.length}</h2>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><Clock size={24} /></div>
                    </div>
                    <p className="text-gray-400 text-sm font-medium">Menunggu (Pending)</p>
                    <h2 className="text-3xl font-bold text-orange-500">
                        {bookings.filter((b: any) => b.status === 'Pending').length}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><CheckCircle2 size={24} /></div>
                    </div>
                    <p className="text-gray-400 text-sm font-medium">Disetujui</p>
                    <h2 className="text-3xl font-bold text-green-600">
                        {bookings.filter((b: any) => b.status === 'Approved').length}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-red-50 text-red-600 rounded-2xl"><AlertCircle size={24} /></div>
                    </div>
                    <p className="text-gray-400 text-sm font-medium">Ditolak</p>
                    <h2 className="text-3xl font-bold text-red-600">
                        {bookings.filter((b: any) => b.status === 'Rejected').length}
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* --- SECTION 2: TABEL MONITORING (Kiri) --- */}
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Monitoring Peminjaman</h3>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Cari..."
                                    className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select
                                className="border border-gray-200 px-3 py-2 text-sm rounded-xl outline-none"
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="All">Semua</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100 text-[11px] uppercase tracking-widest text-gray-400 font-bold">
                                <tr>
                                    <th className="p-5">Peminjam</th>
                                    <th className="p-5">Ruangan</th>
                                    <th className="p-5">Waktu Mulai</th>
                                    <th className="p-5">Waktu Selesai</th>
                                    <th className="p-5 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking: any) => (
                                        <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-5">
                                                <p className="font-bold text-gray-800 text-sm">{booking.customerName}</p>
                                                <p className="text-[10px] text-gray-400 font-medium tracking-tight">ID: #{booking.id}</p>
                                            </td>
                                            <td className="p-5 text-gray-600 text-sm font-semibold">{booking.roomName}</td>
                                            <td className="p-5 text-gray-500 text-xs font-medium">
                                                {formatTime(booking.startTime)}
                                            </td>
                                            <td className="p-5 text-gray-500 text-xs font-medium">
                                                {formatTime(booking.endTime)}
                                            </td>
                                            <td className="p-5 text-center">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${booking.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                    booking.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-16 text-center text-gray-400 italic text-sm">Tidak ada data peminjaman yang ditemukan.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- SECTION 3: AKTIVITAS TERBARU (Kanan) --- */}
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Booking Terbaru</h3>
                    <div className="space-y-4">
                        {recentBookings.map((booking: any) => (
                            <div key={booking.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                                <div className={`p-3 rounded-2xl ${booking.status === 'Approved' ? 'bg-green-50 text-green-600' :
                                    booking.status === 'Rejected' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                                    }`}>
                                    <Clock size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1">{booking.roomName}</h4>
                                    <p className="text-xs text-gray-500 mb-2 font-medium">{booking.customerName}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-gray-400 font-bold tracking-tight uppercase">ID: #{booking.id}</span>
                                        <span className={`text-[10px] font-black uppercase ${booking.status === 'Approved' ? 'text-green-600' : booking.status === 'Rejected' ? 'text-red-600' : 'text-orange-600'}`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-[#00D084] p-6 rounded-[2.5rem] text-white shadow-xl shadow-green-100/50">
                        <h4 className="font-bold mb-2 flex items-center gap-2">Tips Admin</h4>
                        <p className="text-[11px] opacity-90 leading-relaxed font-medium">
                            Monitoring ketersediaan ruangan secara real-time untuk menghindari konflik jadwal antar mahasiswa.
                        </p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}