import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api"; 

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        fullName: "",
        role: "Mahasiswa" 
    });
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/Auth/register", form);
            alert("Registrasi berhasil! Silakan login.");
            navigate("/login");
        } catch (err: any) {
            alert(err.response?.data?.message || "Gagal mendaftar. Username mungkin sudah ada.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] p-4">
            <div className="bg-white p-10 rounded-4xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-[#00D084] rounded-xl flex items-center justify-center text-white font-black text-2xl mb-4 shadow-lg shadow-green-100">
                        P
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">Daftar Akun</h2>
                    <p className="text-gray-400 text-sm">Buat akun untuk mulai meminjam ruangan</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                        <input
                            type="text" required
                            className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 bg-gray-50/50"
                            placeholder="Contoh: Tarissa Dewi"
                            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
                        <input
                            type="text" required
                            className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 bg-gray-50/50"
                            placeholder="Gunakan untuk login"
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                        <input
                            type="password" required
                            className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 bg-gray-50/50"
                            placeholder="••••••••"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="w-full bg-[#00D084] text-white py-4 rounded-3xl font-black text-lg hover:bg-[#00b372] transition-all shadow-lg shadow-green-100 mt-4">
                        Daftar Sekarang
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-8">
                    Sudah punya akun? <Link to="/login" className="text-[#00D084] font-bold hover:underline">Masuk di sini</Link>
                </p>
            </div>
        </div>
    );
}