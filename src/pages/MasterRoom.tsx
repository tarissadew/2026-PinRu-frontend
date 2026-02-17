import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getRooms, createRoom, deleteRoom, updateRoom } from "../services/api";
import {
    Plus,
    Trash2,
    Edit,
    X,
    MapPin,
    Users,
    LayoutDashboard
} from "lucide-react";

interface Room {
    id: number;
    name: string;
    capacity: number;
    location: string;
}

export default function MasterRoom() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [roomForm, setRoomForm] = useState({ name: "", capacity: 0, location: "" });

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const data = await getRooms();
            setRooms(data);
        } catch (err) {
            console.error("Gagal mengambil data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleAddClick = () => {
        setEditingId(null);
        setRoomForm({ name: "", capacity: 0, location: "" });
        setIsModalOpen(true);
    };

    const handleEditClick = (room: Room) => {
        setEditingId(room.id);
        setRoomForm({
            name: room.name,
            capacity: room.capacity,
            location: room.location
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number, name: string) => {
        if (window.confirm(`Hapus ruangan "${name}" secara permanen?`)) {
            try {
                await deleteRoom(id);
                alert("Ruangan berhasil dihapus!");
                fetchRooms();
            } catch (err: any) {
                alert("Gagal menghapus. Pastikan ruangan tidak sedang digunakan dalam transaksi.");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateRoom(editingId, roomForm);
                alert("Data ruangan diperbarui!");
            } else {
                await createRoom(roomForm);
                alert("Ruangan baru ditambahkan!");
            }
            setIsModalOpen(false);
            fetchRooms();
        } catch (err) {
            alert("Terjadi kesalahan saat menyimpan data.");
        }
    };

    return (
        <DashboardLayout role="Admin">
            {/* Header Section */}
            <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tighter">Master Ruangan</h1>
                    <p className="text-gray-400 font-bold text-sm mt-1">Total {rooms.length} ruangan terdaftar di sistem.</p>
                </div>
                <button
                    onClick={handleAddClick}
                    className="bg-[#00D084] text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-[#00b372] transition-all shadow-xl shadow-green-100"
                >
                    <Plus size={20} strokeWidth={3} /> Tambah Ruangan
                </button>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 text-gray-400 animate-pulse font-black">
                    <div className="w-12 h-12 border-4 border-gray-100 border-t-[#00D084] rounded-full animate-spin mb-4"></div>
                    Sinkronisasi Database...
                </div>
            ) : rooms.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-200">
                        <LayoutDashboard size={40} />
                    </div>
                    <p className="text-gray-400 font-bold">Belum ada data ruangan yang tersedia.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rooms.map((room: any) => (
                        <div key={room.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#00D084] mb-6 group-hover:bg-[#00D084] group-hover:text-white transition-all">
                                <MapPin size={32} />
                            </div>
                            <div className="space-y-2 mb-8">
                                <h3 className="text-2xl font-black text-gray-800 tracking-tight leading-tight group-hover:text-[#00D084] transition-colors">
                                    {room.name}
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                                        <Users size={14} className="group-hover:text-[#00D084] transition-colors" /> {room.capacity} Orang
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                                        <MapPin size={14} className="group-hover:text-[#00D084] transition-colors" /> {room.location || "Lantai Utama"}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-50 pt-6">
                                <div className="flex gap-2">
                                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase border border-green-100">
                                        Verified
                                    </span>
                                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase border border-blue-100">
                                        Active
                                    </span>
                                </div>

                                <div className="flex gap-1">
                                    <button
                                        onClick={() => handleEditClick(room)}
                                        className="p-2.5 text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                                        title="Edit Ruangan"
                                    >
                                        <Edit size={18} strokeWidth={2.5} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(room.id, room.name)}
                                        className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        title="Hapus Ruangan"
                                    >
                                        <Trash2 size={18} strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>

                            <p className="absolute bottom-2 right-8 text-[8px] text-gray-200 font-bold italic tracking-tighter">
                                ROOM_ID: {room.id}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* MODAL POP-UP */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative animate-in fade-in zoom-in duration-200 border border-gray-100">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-8 top-8 text-gray-300 hover:text-gray-600 p-2 hover:bg-gray-50 rounded-full transition-all"
                        >
                            <X size={20} strokeWidth={3} />
                        </button>

                        <div className="mb-10">
                            <div className="w-14 h-14 bg-green-50 text-[#00D084] rounded-2xl flex items-center justify-center mb-4">
                                <Plus size={28} strokeWidth={3} />
                            </div>
                            <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                                {editingId ? "Edit Ruangan" : "Tambah Ruangan"}
                            </h2>
                            <p className="text-gray-400 text-sm font-bold mt-1 tracking-tight">Perbarui data aset ruangan PinRu.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Ruangan</label>
                                <input
                                    type="text" required value={roomForm.name}
                                    placeholder="Contoh: Lab Komputer A"
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#00D084] bg-gray-50/50 font-bold text-gray-700 placeholder:text-gray-300 transition-all"
                                    onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Kapasitas (Orang)</label>
                                <input
                                    type="number" required value={roomForm.capacity || ""}
                                    placeholder="0"
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#00D084] bg-gray-50/50 font-bold text-gray-700 placeholder:text-gray-300 transition-all"
                                    onChange={(e) => setRoomForm({ ...roomForm, capacity: parseInt(e.target.value) || 0 })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Lokasi / Lantai</label>
                                <input
                                    type="text" required value={roomForm.location}
                                    placeholder="Contoh: Gedung B - Lantai 3"
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#00D084] bg-gray-50/50 font-bold text-gray-700 placeholder:text-gray-300 transition-all"
                                    onChange={(e) => setRoomForm({ ...roomForm, location: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#00D084] text-white py-5 rounded-3xl font-black text-lg hover:bg-[#00b372] transition-all shadow-xl shadow-green-100 mt-4 flex items-center justify-center gap-3"
                            >
                                {editingId ? "Perbarui Ruangan" : "Simpan Ruangan"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}