import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getBookings, deleteBooking } from "../services/api";
import { Trash2, Clock, Calendar as CalIcon, Search } from "lucide-react";

export default function KelolaPinjaman() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const currentUserName = localStorage.getItem("userName");

    const loadData = async () => {
        const data = await getBookings();
        setBookings(data.filter((b: any) => b.customerName === currentUserName));
    };

    useEffect(() => { loadData(); }, []);

    const filteredBookings = bookings.filter((b) => {
        const dateString = new Date(b.startTime).toLocaleDateString();
        return (
            b.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dateString.includes(searchTerm)
        );
    });

    const handleDelete = async (id: number) => {
        if (window.confirm("Batalkan pengajuan ini?")) {
            await deleteBooking(id);
            loadData();
        }
    };

    return (
        <DashboardLayout role="Customer">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-black text-gray-800 tracking-tight">Kelola Pinjaman Anda</h1>
                
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text"
                        placeholder="Cari ruangan atau tanggal..." 
                        className="w-full pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#00D084] font-bold text-sm shadow-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-4xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <tr>
                            <th className="p-6">Ruangan</th>
                            <th className="p-6">Waktu Penggunaan</th>
                            <th className="p-6">Status</th>
                            <th className="p-6 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((b) => (
                                <tr key={b.id} className="hover:bg-gray-50/50 transition-all">
                                    <td className="p-6 font-bold text-gray-700">{b.roomName}</td>
                                    <td className="p-6">
                                        <div className="flex flex-col gap-1 text-xs font-bold text-gray-500">
                                            <span className="flex items-center gap-2">
                                                <CalIcon size={14}/> {new Date(b.startTime).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Clock size={14}/> {new Date(b.startTime).getHours()}.00 - {new Date(b.endTime).getHours()}.00
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                                            b.status === "Approved" ? "bg-green-50 text-green-600 border-green-100" : 
                                            b.status === "Rejected" ? "bg-red-50 text-red-600 border-red-100" : "bg-orange-50 text-orange-600 border-orange-100"
                                        }`}>
                                            {b.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-center">
                                        <button 
                                            onClick={() => handleDelete(b.id)} 
                                            className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all"
                                            title="Batalkan Pinjaman"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-16 text-center text-gray-400 font-bold italic">
                                    {searchTerm ? `Hasil pencarian "${searchTerm}" tidak ditemukan.` : "Belum ada riwayat peminjaman."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}