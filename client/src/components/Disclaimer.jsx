import { useState } from "react";

export default function Disclaimer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2.5 rounded-lg bg-[#162138] px-4 py-3 text-left text-sm font-medium text-white transition-colors hover:bg-[#1a2740]"
      >
        <svg className="h-5 w-5 shrink-0 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="flex-1">Important Notes And Disclaimers</span>
        <svg
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-1 rounded-lg bg-[#162138] px-4 py-3 text-sm leading-relaxed text-gray-300">
          <ul className="list-disc space-y-1 pl-4">
            <li>This tool is for educational and informational purposes only.</li>
            <li>Tax loss harvesting involves selling assets at a loss to offset capital gains.</li>
            <li>Consult a tax professional before making any financial decisions.</li>
            <li>Past performance does not guarantee future results.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
