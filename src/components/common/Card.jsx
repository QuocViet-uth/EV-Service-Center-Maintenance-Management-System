export default function Card({ title, children, className = "" }) {
  return (
    <div
      className={`bg-[#121212] border border-zinc-800 rounded-xl p-5 
      transition-all duration-300 hover:scale-[1.01]
      hover:border-red-500 hover:shadow-[0_0_25px_rgba(255,0,0,0.2)]
      ${className}`}
    >
      {title && <div className="text-sm text-zinc-500 mb-3 uppercase">{title}</div>}
      {children}
    </div>
  );
}
