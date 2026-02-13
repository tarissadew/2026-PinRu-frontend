import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulasi Login (Nanti kita hubungkan ke API User/Customer)
        if (email === "admin@pinru.com" && password === "admin123") {
            navigate("/admin/dashboard");
        } else if (email && password) {
            navigate("/customer/dashboard");
        } else {
            alert("Mohon isi email dan password dengan benar");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="flex justify-center mb-8">
                    <div className="w-12 h-12 bg-green-500 rounded-xl"></div>
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Selamat Datang</h2>
                <p className="text-center text-gray-500 mb-8">Masuk ke akun PinRu kamu</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                            placeholder="nama@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-200">
                        Masuk Sekarang
                    </button>
                </form>
            </div>
        </div>
    );
}