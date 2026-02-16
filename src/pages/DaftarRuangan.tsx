import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getRooms, createBooking } from "../services/api";
import { Users, MapPin, Search, Calendar, Clock } from "lucide-react"; // Semua ikon terpakai sekarang

export default function DaftarRuangan() {
    const [rooms, setRooms] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<any>(null);
    const [formData, setFormData] = useState({ startTime: "", endTime: "" });

    const currentUserId = localStorage.getItem("userId");
    const currentUserName = localStorage.getItem("userName"); // Terpakai di header modal

    useEffect(() => {
        getRooms().then(setRooms);
    }, []);

    const filteredRooms = rooms.filter(room => 
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openBookingModal = (room: any) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUserId) return alert("Sesi habis, silakan login kembali.");

        const payload = {
            userId: parseInt(currentUserId),
            roomId: selectedRoom.id,
            startTime: new Date(formData.startTime).toISOString(),
            endTime: new Date(formData.endTime).toISOString(),
            remarks: `Booking via Eksplorasi oleh ${currentUserName}` // currentUserName terpakai di sini
        };

        try {
            await createBooking(payload);
            alert("Peminjaman berhasil diajukan!");
            setIsModalOpen(false);
        } catch (err) {
            alert("Gagal mengajukan peminjaman. Cek kembali jadwal Anda.");
        }
    };

    return (
        <DashboardLayout role="Customer">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-black text-gray-800 tracking-tight">Eksplorasi Ruangan</h1>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 font-bold text-sm w-64 shadow-sm" 
                        placeholder="Cari ruangan..." 
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRooms.map((room) => (
                    <div key={room.id} className="bg-white rounded-4xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all group">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#00D084] mb-6 group-hover:bg-[#00D084] group-hover:text-white transition-all">
                            <MapPin size={32} />
                        </div>
                        <h3 className="text-xl font-black text-gray-800 mb-2">{room.name}</h3>
                        <div className="flex items-center gap-4 text-gray-400 font-bold text-xs uppercase tracking-wider mb-6">
                            <span className="flex items-center gap-1"><Users size={14}/> {room.capacity} Orang</span>
                            <span className="flex items-center gap-1"><MapPin size={14}/> {room.location}</span>
                        </div>
                        <button 
                            onClick={() => openBookingModal(room)}
                            className="w-full py-4 bg-[#00D084] text-white font-black rounded-2xl hover:bg-[#00b372] transition-all shadow-lg shadow-green-50"
                        >
                            Booking Sekarang
                        </button>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-white rounded-4xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-black text-gray-800">Ajukan Peminjaman</h2>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Pemohon: {currentUserName}</p>
                            </div>
                            <div className="w-10 h-10 bg-green-50 text-[#00D084] rounded-xl flex items-center justify-center">
                                <Calendar size={20} /> {/* Ikon Calendar terpakai */}
                            </div>
                        </div>
                        
                        <p className="text-gray-400 text-sm mb-6 font-bold flex items-center gap-2">
                             <MapPin size={14} className="text-[#00D084]" /> Ruangan: <span className="text-gray-800">{selectedRoom?.name}</span>
                        </p>
                        
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">
                                    <Clock size={12} /> Waktu Mulai {/* Ikon Clock terpakai */}
                                </label>
                                <input 
                                    type="datetime-local" required
                                    className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-green-500 font-bold text-sm"
                                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">
                                    <Clock size={12} /> Waktu Selesai
                                </label>
                                <input 
                                    type="datetime-local" required
                                    className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-green-500 font-bold text-sm"
                                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-50">Batal</button>
                                <button type="submit" className="flex-1 py-4 rounded-2xl font-black bg-[#00D084] text-white shadow-lg shadow-green-100 hover:bg-[#00b372]">Kirim Pengajuan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}