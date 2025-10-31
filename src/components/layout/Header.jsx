import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#111] flex justify-end items-center p-4 border-b border-zinc-800">
      <button className="mr-6 hover:text-red-500 transition">
        <Bell size={22} />
      </button>

      <div className="flex items-center gap-3">
        <span className="text-gray-300 font-medium">Welcome, User</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-10 h-10 rounded-full border border-gray-700"
        />
      </div>
    </header>
  );
}
