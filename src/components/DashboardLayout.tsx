import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  DoorOpen, 
  CalendarCheck, 
  LogOut,
  MapPin 
} from "lucide-react";

interface Props {
  children: React.ReactNode;
  role: "Admin" | "Customer";
}

export default function DashboardLayout({ children, role }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Guest";

  const getActiveClass = (path: string) => {
    return location.pathname === path
      ? "bg-green-50 text-green-600 font-bold shadow-sm"
      : "text-gray-400 hover:bg-gray-50 hover:text-gray-600";
  };

  const menuItems = [
    { 
      name: "Dashboard", 
      icon: <LayoutDashboard size={20} />, 
      path: role === "Admin" ? "/admin/dashboard" : "/customer/dashboard", 
      showFor: ["Admin", "Customer"] 
    },
    { 
      name: "Master Customer", 
      icon: <Users size={20} />, 
      path: "/admin/customers", 
      showFor: ["Admin"] 
    },
    { 
      name: "Master Ruangan", 
      icon: <DoorOpen size={20} />, 
      path: "/admin/rooms", 
      showFor: ["Admin"] 
    },
    { 
      name: "Kelola Pinjaman", 
      icon: <CalendarCheck size={20} />, 
      path: "/admin/bookings", 
      showFor: ["Admin"] 
    },
    { 
      name: "Daftar Ruangan", 
      icon: <MapPin size={20} />, 
      path: "/customer/rooms", 
      showFor: ["Customer"] 
    },
    { 
      name: "Riwayat Pinjaman", 
      icon: <CalendarCheck size={20} />, 
      path: "/customer/history", 
      showFor: ["Customer"]
    },
  ];

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/"); 
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <aside className="w-72 bg-white border-r border-gray-100 p-6 flex flex-col fixed h-full z-20">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-[#00D084] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-100">
            P
          </div>
          <span className="text-2xl font-bold text-gray-800 tracking-tight">PinRu</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            if (!item.showFor.includes(role)) return null;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${getActiveClass(item.path)}`}
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mb-4 px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Logged in as</p>
            <p className="text-xs font-bold text-gray-700 truncate">{userName}</p>
            <p className="text-[9px] text-[#00D084] font-black uppercase">{role}</p>
        </div>

        <div className="pt-6 border-t border-gray-50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-colors font-semibold text-sm"
          >
            <LogOut size={20} />
            Keluar
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-72 p-10 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}