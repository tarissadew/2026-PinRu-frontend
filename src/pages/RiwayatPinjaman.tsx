import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getBookings, deleteBooking } from "../services/api";
import { Trash2, Clock, Calendar as CalIcon } from "lucide-react";

export default function KelolaPinjaman() {
    const [bookings, setBookings] = useState<any[]>([]);
    const currentUserName = localStorage.getItem("userName");

    const loadData = async () => {
        const data = await getBookings();
        // Filter agar hanya menampilkan milik user login
        setBookings(data.filter((b: any) => b.customerName === currentUserName));
    };

    useEffect(() => { loadData(); }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Batalkan pengajuan ini?")) {
            await deleteBooking(id);
            loadData();
        }
    };

    return (
        <DashboardLayout role="Customer">
            <h1 className="text-3xl font-black text-gray-800 mb-8">Kelola Pinjaman Anda</h1>
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
                        {bookings.map((b) => (
                            <tr key={b.id} className="hover:bg-gray-50/50 transition-all">
                                <td className="p-6 font-bold text-gray-700">{b.roomName}</td>
                                <td className="p-6">
                                    <div className="flex flex-col gap-1 text-xs font-bold text-gray-500">
                                        <span className="flex items-center gap-2"><CalIcon size={14}/> {new Date(b.startTime).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-2"><Clock size={14}/> {new Date(b.startTime).getHours()}.00 - {new Date(b.endTime).getHours()}.00</span>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                        b.status === "Approved" ? "bg-green-100 text-green-600" : 
                                        b.status === "Rejected" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                                    }`}>
                                        {b.status}
                                    </span>
                                </td>
                                <td className="p-6 text-center">
                                    <button onClick={() => handleDelete(b.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}