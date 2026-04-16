export default function Loader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#263354] border-t-cyan-400" />
        <p className="text-sm text-gray-500">Loading data...</p>
      </div>
    </div>
  );
}
