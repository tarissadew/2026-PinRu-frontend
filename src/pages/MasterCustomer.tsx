import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getAllUsers, deleteUser } from "../services/api";
import {
  MoreVertical,
  Mail,
  Trash2,
  Search 
} from "lucide-react";

export default function MasterCustomer() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers("Mahasiswa");
      setUsers(data);
    } catch (err) {
      console.error("Gagal memuat pengguna:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = async (id: number, name: string) => {
    if (window.confirm(`Hapus akun permanent untuk "${name}"?`)) {
      try {
        await deleteUser(id);
        alert("Akun berhasil dihapus!");
        loadUsers();
      } catch (err) {
        alert("Gagal menghapus user. Mungkin user masih memiliki riwayat pinjaman.");
      }
    }
  };

  return (
    <DashboardLayout role="Admin">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Master Customer</h1>
          <p className="text-gray-400 font-bold text-sm mt-1">Data mahasiswa yang terdaftar di sistem PinRu</p>
        </div>

        {/* Search Input menggantikan tombol Tambah User */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Cari nama atau username..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#00D084] focus:border-transparent font-bold text-sm shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update state saat mengetik
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-20 text-gray-400 animate-pulse font-bold">
          <div className="w-10 h-10 border-4 border-gray-100 border-t-[#00D084] rounded-full animate-spin mb-4"></div>
          Memuat database mahasiswa...
        </div>
      ) : filteredUsers.length === 0 ? ( // Menggunakan filteredUsers untuk pengecekan kosong
        <div className="text-center py-20 bg-gray-50 rounded-4xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-bold">Mahasiswa "{searchTerm}" tidak ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mapping menggunakan filteredUsers agar tampilan mengikuti hasil pencarian */}
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white border border-gray-100 rounded-4xl p-6 shadow-sm hover:shadow-xl transition-all relative group">

              {/* Menu Dropdown */}
              <div className="absolute top-6 right-4">
                <div className="relative group/menu">
                  <button className="p-2 text-gray-300 hover:text-gray-600 rounded-full hover:bg-gray-50">
                    <MoreVertical size={20} />
                  </button>
                  <div className="absolute right-0 top-full hidden group-hover/menu:block bg-white border border-gray-100 shadow-xl rounded-2xl py-2 w-32 z-10">
                    <button
                      onClick={() => handleDeleteUser(user.id, user.fullName)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} /> Hapus Akun
                    </button>
                  </div>
                </div>
              </div>

              {/* Header Card (Profil) */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-linear-to-br from-green-400 to-[#00D084] text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-md">
                  {user.fullName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-gray-800 text-lg leading-tight">{user.fullName}</h4>
                  <div className="flex items-center gap-1 text-gray-400 text-[11px] font-bold mt-1">
                    <Mail size={12} className="text-green-500" /> {user.email} {/* Menggunakan kolom email baru */}
                  </div>
                </div>
              </div>

              {/* Data Card Content */}
              <div className="bg-[#F8F9FA] rounded-3xl p-5 border border-gray-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Login ID</span>
                  <span className="text-xs font-black text-gray-700">{user.username}</span> {/* Nama pengguna unik */}
                </div>
                <div className="w-full h-px bg-gray-200 border-dashed border-b"></div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Official Email</span>
                  <span className="text-xs font-black text-gray-700">{user.email}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-between items-center border-t border-gray-50 pt-4">
                <div className="flex gap-2">
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase border border-green-100">Verified</span>
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase border border-blue-100">Active</span>
                </div>
                <p className="text-[10px] text-gray-300 font-bold italic tracking-tighter">DB_UID: {user.id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}