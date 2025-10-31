export default function Button({ children, onClick, variant = "primary", className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md uppercase tracking-wide font-semibold transition-all duration-300
      ${variant === "ghost"
        ? "border border-zinc-700 text-zinc-300 hover:border-red-600 hover:text-red-500"
        : "bg-red-600 hover:bg-red-700 hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] text-white"
      }
      ${className}`}
    >
      {children}
    </button>
  );
}
