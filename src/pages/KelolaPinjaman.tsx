import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getBookings, updateBookingStatus } from "../services/api";
import { Check, X, CheckCircle2, Clock, Calendar, Search } from "lucide-react";

export default function KelolaPinjaman() {
    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const data = await getBookings();
            setBookings(data);
        } catch (err) {
            console.error("Gagal mengambil data pinjaman", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBookings(); }, []);

    const filteredBookings = bookings.filter((booking: any) => {
        const dateString = new Date(booking.startTime).toLocaleDateString();
        return (
            booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dateString.includes(searchTerm)
        );
    });

    const handleAction = async (id: number, status: string) => {
        try {
            await updateBookingStatus(id, status);
            alert(`Peminjaman berhasil di-${status}`);
            fetchBookings();
        } catch (err) {
            alert("Gagal mengubah status. Cek koneksi backend.");
        }
    };

    return (
        <DashboardLayout role="Admin">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">Persetujuan Pinjaman</h1>
                    <p className="text-gray-400 font-bold text-sm mt-1">Kelola permohonan akses ruangan dari mahasiswa.</p>
                </div>

                <div className="relative w-full md:w-80">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari peminjam, ruangan, atau tanggal..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#00D084] font-bold text-sm shadow-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            {loading ? (
                <div className="flex justify-center py-20 animate-pulse text-[#00D084] font-black">Memproses Data...</div>
            ) : (
                <div className="bg-white rounded-4xl border border-gray-100 overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50 border-b border-gray-50 text-[10px] uppercase tracking-widest text-gray-400 font-black">
                            <tr>
                                <th className="p-6">Peminjam</th>
                                <th className="p-6">Ruangan</th>
                                <th className="p-6 text-center">Status</th>
                                <th className="p-6 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-20 text-center text-gray-400 font-bold italic">
                                        {searchTerm ? `Hasil pencarian "${searchTerm}" tidak ditemukan.` : "Belum ada data pengajuan pinjaman."}
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((booking: any) => (
                                    <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center font-black text-xs uppercase">
                                                    {booking.customerName.substring(0, 2)}
                                                </div>
                                                <span className="font-bold text-gray-800 text-sm">{booking.customerName}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <p className="font-bold text-gray-700 text-sm">{booking.roomName}</p>
                                            <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400 font-bold">
                                                <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(booking.startTime).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> {new Date(booking.startTime).getHours()}.00</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border ${booking.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-100' :
                                                    booking.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                                                        'bg-orange-50 text-orange-600 border-orange-100'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex justify-center gap-2">
                                                {booking.status !== 'Approved' && (
                                                    <button
                                                        onClick={() => handleAction(booking.id, 'Approved')}
                                                        className="p-2.5 bg-[#00D084] text-white rounded-xl shadow-lg shadow-green-100 hover:scale-105 transition-transform"
                                                        title="Ubah ke Setujui"
                                                    >
                                                        <Check size={16} strokeWidth={3} />
                                                    </button>
                                                )}

                                                {booking.status !== 'Rejected' && (
                                                    <button
                                                        onClick={() => handleAction(booking.id, 'Rejected')}
                                                        className="p-2.5 bg-white text-red-500 border border-red-100 rounded-xl hover:bg-red-50 transition-colors"
                                                        title="Ubah ke Tolak"
                                                    >
                                                        <X size={16} strokeWidth={3} />
                                                    </button>
                                                )}
                                                {booking.status !== 'Pending' && (
                                                     <CheckCircle2 size={16} className="text-gray-200 mt-2" />
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </DashboardLayout>
    );
}