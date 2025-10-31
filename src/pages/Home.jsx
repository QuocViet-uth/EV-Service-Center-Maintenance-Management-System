import { Link } from "react-router-dom";
import { Wrench, CalendarCheck, Bell, CarFront } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0C0D] text-white">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">
        <h1 className="text-5xl font-bold max-w-3xl bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
          EV Maintenance Reimagined
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl mt-4">
          Smart scheduling, real-time tracking, and complete EV care at your fingertips.
        </p>

        <div className="flex gap-6 mt-10">
          <Link to="/login" className="px-8 py-3 rounded-md font-semibold bg-cyan-500 hover:bg-cyan-400 text-black">
            Login
          </Link>
          <Link to="/customer" className="border border-zinc-600 hover:border-cyan-400 px-8 py-3 rounded-md font-semibold text-zinc-300 hover:text-cyan-400">
            Explore
          </Link>
        </div>

        <img
          className="w-[600px] mt-12 drop-shadow-[0_0_30px_rgba(0,255,255,0.3)]"
          src="https://assets.stickpng.com/images/580b585b2edbce24c47b2cae.png"
          alt="EV Car"
        />
      </section>


      {/* FEATURE HIGHLIGHTS */}
      <section className="py-16 bg-[#0D1012]">
        <h2 className="text-center text-3xl font-semibold mb-12">Why Choose Us</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-10 max-w-6xl mx-auto">
          {[
            { icon: <CalendarCheck size={28} />, label: "Easy Scheduling", text: "Book your service in seconds." },
            { icon: <Bell size={28} />, label: "Smart Reminders", text: "Never miss a maintenance cycle." },
            { icon: <CarFront size={28} />, label: "Real-Time Tracking", text: "Track your EV service progress live." }
          ].map((f, i) => (
            <div key={i} className="text-center p-6 bg-black border border-zinc-800 rounded-lg hover:border-cyan-400 transition">
              <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-zinc-900 text-cyan-400 mb-4">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold">{f.label}</h3>
              <p className="text-zinc-400 mt-2">{f.text}</p>
            </div>
          ))}
        </div>
      </section>


      {/* SERVICES */}
      <section className="py-16">
        <h2 className="text-center text-3xl font-semibold mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-10 max-w-6xl mx-auto">
          {[
            { icon: <Wrench size={26} />, name: "Standard Maintenance" },
            { icon: <CarFront size={26} />, name: "EV Health Check" },
            { icon: <Bell size={26} />, name: "Alert & Reminder" }
          ].map((s, i) => (
            <div key={i} className="flex gap-3 py-4 px-5 bg-[#0D1012] border border-zinc-800 rounded-lg hover:border-cyan-500 transition">
              {s.icon}
              <span className="font-medium">{s.name}</span>
            </div>
          ))}
        </div>
      </section>


      {/* HOW IT WORKS */}
      <section className="bg-[#0C0F10] py-16">
        <h2 className="text-center text-3xl font-semibold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 px-12 max-w-5xl mx-auto">

          {["Book", "Track", "Drive"].map((t, i) => (
            <div key={i} className="text-center">
              <span className="w-16 h-16 mx-auto mb-4 grid place-items-center text-2xl rounded-full bg-cyan-600 font-bold text-black shadow-lg">
                {i + 1}
              </span>
              <h3 className="text-xl font-semibold">{t}</h3>
              <p className="text-zinc-400 mt-2">{["Select service & slot", "Monitor service progress", "Pick up and enjoy"][i]}</p>
            </div>
          ))}

        </div>
      </section>


      {/* FOOTER */}
      <footer className="text-center py-6 text-zinc-500 text-sm border-t border-zinc-800">
        © 2025 EV Service System — All Rights Reserved
      </footer>

    </div>
  );
}
