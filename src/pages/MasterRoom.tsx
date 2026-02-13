import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getRooms, createRoom } from "../services/api";
import { Plus, Trash2, Edit, X } from "lucide-react";

export default function MasterRoom() {
    const [rooms, setRooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newRoom, setNewRoom] = useState({ name: "", capacity: 0, location: "" });

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = () => {
        getRooms().then(setRooms).catch(console.error);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createRoom(newRoom);
            setIsModalOpen(false);
            setNewRoom({ name: "", capacity: 0, location: "" });
            fetchRooms(); // Refresh daftar ruangan
            alert("Ruangan berhasil ditambahkan!");
        } catch (err) {
            console.error(err);
            alert("Gagal menambah ruangan");
        }
    };

    return (
        <DashboardLayout role="Admin">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Master Ruangan</h1>
                    <p className="text-gray-500">Kelola daftar ruangan yang tersedia untuk dipinjam.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#00D084] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#00b372] transition-all shadow-lg shadow-green-100"
                >
                    <Plus size={20} /> Tambah Ruangan
                </button>
            </header>

            {/* Grid Ruangan */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room: any) => (
                    <div key={room.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="w-full h-40 bg-gray-50 rounded-2xl mb-4 flex items-center justify-center text-gray-300 font-bold text-4xl group-hover:bg-green-50 group-hover:text-green-200 transition-colors">
                            {room.name.charAt(0)}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{room.name}</h3>
                        <p className="text-sm text-gray-400 mb-4">{room.location || "Lantai Utama"}</p>
                        <div className="flex justify-between items-center border-t border-gray-50 pt-4">
                            <span className="text-xs font-bold uppercase text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                {room.capacity} Orang
                            </span>
                            <div className="flex gap-1">
                                <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"><Edit size={18}/></button>
                                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18}/></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- MODAL POP-UP --- */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-md rounded-4xl p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
                        >
                            <X size={24} />
                        </button>
                        
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Tambah Ruangan Baru</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Ruangan</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                    placeholder="Contoh: Ruang Meeting A"
                                    onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Kapasitas (Orang)</label>
                                <input 
                                    type="number" 
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                    placeholder="0"
                                    onChange={(e) => setNewRoom({...newRoom, capacity: parseInt(e.target.value)})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Lokasi/Lantai</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                    placeholder="Contoh: Lantai 2"
                                    onChange={(e) => setNewRoom({...newRoom, location: e.target.value})}
                                />
                            </div>
                            <button 
                                type="submit"
                                className="w-full bg-[#00D084] text-white py-4 rounded-2xl font-bold hover:bg-[#00b372] transition-all shadow-lg shadow-green-100 mt-4"
                            >
                                Simpan Ruangan
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}