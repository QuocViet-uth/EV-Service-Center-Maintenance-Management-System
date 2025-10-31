export default function ProgressBar({ progress }) {
  return (
    <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden relative">
      <div
        className={`h-full rounded-full transition-all duration-1000 ease-out
        ${progress < 100 ? "animate-pulse-bar" : ""}`}
        style={{
          width: `${progress}%`,
          background: progress < 100
            ? "linear-gradient(90deg, #ff0000, #ff4d4d)"
            : "linear-gradient(90deg, #00ff9d, #00b873)",
          boxShadow:
            progress < 100
              ? "0 0 15px rgba(255,0,0,0.6)"
              : "0 0 12px rgba(0,255,130,0.7)",
        }}
      />
    </div>
  );
}
