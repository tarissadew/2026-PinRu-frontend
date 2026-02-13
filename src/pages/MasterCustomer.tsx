import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getBookings } from "../services/api";
import { 
  MoreVertical, 
  Mail, 
  Calendar, 
  Edit3, 
  Trash2, 
  UserCheck 
} from "lucide-react";

export default function MasterCustomer() {
  const [customerStats, setCustomerStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data booking asli untuk menghitung statistik per user
    getBookings()
      .then((data) => {
        const stats = data.reduce((acc: any, curr: any) => {
          const name = curr.customerName;
          if (!acc[name]) {
            acc[name] = { 
              name: name, 
              count: 0, 
              email: `${name.toLowerCase().replace(/\s/g, '')}@univ.ac.id`,
              lastActive: curr.startTime 
            };
          }
          acc[name].count += 1;
          return acc;
        }, {});
        setCustomerStats(Object.values(stats));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <DashboardLayout role="Admin">
      {/* Header Halaman */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Database Pengguna</h1>
          <p className="text-gray-500 text-sm">Mengelola data mahasiswa dan riwayat peminjaman.</p>
        </div>
        <button className="bg-[#00D084] text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#00b372] shadow-lg shadow-green-100 transition-all flex items-center gap-2">
          <UserCheck size={18} /> Tambah User
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 animate-pulse">Memuat data pengguna...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {customerStats.map((c) => (
            <div key={c.name} className="bg-white border border-gray-100 rounded-4xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group">
              
              {/* Tombol Opsi (MoreVertical) - Sekarang Digunakan */}
              <div className="absolute top-6 right-4">
                <div className="relative group/menu">
                  <button className="p-2 text-gray-300 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                  
                  {/* Dropdown Menu yang Muncul saat Hover di Ikon */}
                  <div className="absolute right-0 top-full hidden group-hover/menu:block bg-white border border-gray-100 shadow-xl rounded-2xl py-2 w-32 z-10">
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50">
                      <Edit3 size={14} /> Edit
                    </button>
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50">
                      <Trash2 size={14} /> Hapus
                    </button>
                  </div>
                </div>
              </div>

              {/* Header Card: Avatar & Nama */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-linear-to-br from-green-400 to-[#00D084] text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-green-100">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-800 text-lg leading-tight">{c.name}</h4>
                  <div className="flex items-center gap-1 text-gray-400 text-[11px] mt-1 font-medium">
                    <Mail size={12} className="text-green-500" /> {c.email}
                  </div>
                </div>
              </div>

              {/* Body Card: Statistik Dinamis */}
              <div className="bg-[#F8F9FA] rounded-3xl p-5 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                    <Calendar size={14} /> Total Pinjam
                  </div>
                  <span className="text-sm font-black text-gray-800">
                    {c.count} <span className="text-[10px] text-gray-400 font-bold">KALI</span>
                  </span>
                </div>
                
                {/* Visual Progress Bar (Berdasarkan frekuensi pinjam) */}
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#00D084] h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(0,208,132,0.4)]" 
                    style={{ width: `${Math.min(c.count * 10, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Footer Card: Label & Info Tambahan */}
              <div className="mt-6 flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border border-green-100">
                    Verified
                  </span>
                  <span className="bg-gray-50 text-gray-400 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border border-gray-100">
                    Active
                  </span>
                </div>
                <p className="text-[10px] text-gray-300 font-bold italic">
                  ID: {Math.floor(Math.random() * 9000) + 1000}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}