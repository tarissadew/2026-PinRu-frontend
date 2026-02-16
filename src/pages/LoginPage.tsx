import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api"; // Import fungsi API

export default function LoginPage() {
    const [username, setUsername] = useState(""); // Ganti email ke username
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Panggil API Backend
            const data = await login({ username, password });
            
            // Simpan data asli dari database ke browser
            localStorage.setItem("userName", data.fullName);
            localStorage.setItem("userRole", data.role);

            // Arahkan berdasarkan role asli dari database
            if (data.role === "Admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/customer/dashboard");
            }
        } catch (err: any) {
            alert("Username atau Password salah!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
            <div className="bg-white p-10 rounded-4xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-[#00D084] rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-green-100 mb-4">
                        P
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">Selamat Datang</h2>
                    <p className="text-gray-400 text-sm">Masuk ke akun PinRu kamu</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-50/50"
                            placeholder="Ketik username..."
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-50/50"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-[#00D084] text-white py-4 rounded-3xl font-black text-lg hover:bg-[#00b372] transition-all shadow-lg shadow-green-100">
                        Masuk Sekarang
                    </button>
                </form>
            </div>
        </div>
    );
}