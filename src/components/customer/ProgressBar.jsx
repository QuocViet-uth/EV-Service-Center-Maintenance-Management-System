export default function ProgressBar({ progress = 0 }) {
  return (
    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${Math.min(100, Math.max(0, progress))}%`,
          background:
            progress < 100
              ? 'linear-gradient(90deg, #5044E5, #6B5CE6)'
              : 'linear-gradient(90deg, #10b981, #059669)',
        }}
      />
    </div>
  );
}
