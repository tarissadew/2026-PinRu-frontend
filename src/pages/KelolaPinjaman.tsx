import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getBookings, updateBookingStatus } from "../services/api";
import { Check, X, CheckCircle2 } from "lucide-react";

export default function KelolaPinjaman() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => { fetchBookings(); }, []);

    const fetchBookings = () => {
        getBookings().then(setBookings).catch(console.error);
    };

    const handleAction = async (id: number, status: string) => {
        try {
            await updateBookingStatus(id, status);
            fetchBookings();
            alert(`Berhasil: ${status}`);
        } catch (err) { alert("Gagal"); }
    };

    return (
        <DashboardLayout role="Admin">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Persetujuan Pinjaman</h1>
            {/* Render tabel yang kamu buat tadi di sini */}
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100 text-[11px] uppercase tracking-widest text-gray-400 font-bold">
                        <tr>
                            <th className="p-5">Peminjam</th>
                            <th className="p-5">Ruangan</th>
                            <th className="p-5 text-center">Status</th>
                            <th className="p-5 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {bookings.map((booking: any) => (
                            <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-5 font-bold text-gray-800 text-sm">{booking.customerName}</td>
                                <td className="p-5 text-gray-600 text-sm">{booking.roomName}</td>
                                <td className="p-5 text-center">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                        booking.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                        booking.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="p-5 flex justify-center gap-2">
                                    {booking.status === 'Pending' ? (
                                        <>
                                            <button onClick={() => handleAction(booking.id, 'Approved')} className="p-2 bg-green-500 text-white rounded-xl shadow-lg shadow-green-100"><Check size={14} /></button>
                                            <button onClick={() => handleAction(booking.id, 'Rejected')} className="p-2 bg-white text-red-500 border border-red-100 rounded-xl"><X size={14} /></button>
                                        </>
                                    ) : (
                                        <CheckCircle2 size={18} className="text-gray-200" />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}