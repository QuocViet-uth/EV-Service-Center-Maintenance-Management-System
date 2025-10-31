import { NavLink } from "react-router-dom";
import { Home, Calendar, Wrench, Users, Cog } from "lucide-react";

const menu = [
  { path: "/customer", label: "Dashboard", icon: <Home size={20} /> },
  { path: "/booking", label: "Booking", icon: <Calendar size={20} /> },
  { path: "/service", label: "Service", icon: <Wrench size={20} /> },
  { path: "/profile", label: "Profile", icon: <Users size={20} /> },
  { path: "/settings", label: "Settings", icon: <Cog size={20} /> },
  // { to: "/customer", label: "Dashboard" },
  // { to: "/customer/booking", label: "Booking" },
  // { to: "/customer/status", label: "Service Status" },
  // { to: "/customer/profile", label: "Vehicle Profile" },
];

export default function Sidebar() {
  return (
    <div className="w-60 bg-black border-r border-zinc-800">
      <h1 className="text-red-600 text-2xl font-bold px-6 py-4">
        EV SERVICE
      </h1>

      <ul className="mt-4">
        {menu.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-6 hover:bg-zinc-900 transition
                ${isActive ? "text-red-600 font-semibold" : "text-gray-300"}`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
