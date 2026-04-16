import { formatCurrency } from "../utils/formatCurrency";

const gridCols = "grid-cols-[1.4fr_1fr_1fr]";

function GainRow({ label, stValue, ltValue, isBold, textColor }) {
  const base = isBold ? "font-semibold" : "font-normal";
  return (
    <div className={`grid ${gridCols} gap-2 py-2.5 text-sm ${base}`}>
      <span>{label}</span>
      <span className={`text-right tabular-nums ${textColor || ""}`}>{formatCurrency(stValue)}</span>
      <span className={`text-right tabular-nums ${textColor || ""}`}>{formatCurrency(ltValue)}</span>
    </div>
  );
}

export default function CapitalGainsCard({
  title,
  variant,
  stcg,
  ltcg,
  savings,
}) {
  const isDark = variant === "dark";
  const isBlue = variant === "blue";

  const netST = stcg.profits - stcg.losses;
  const netLT = ltcg.profits - ltcg.losses;
  const realised = netST + netLT;

  const cardClass = isDark
    ? "border border-[#263354] bg-[#0D1421]"
    : "bg-gradient-to-br from-[#0052FE] to-[#00A3FF]";

  const dividerColor = isDark ? "border-[#263354]" : "border-white/20";
  const subtleText = isDark ? "text-gray-500" : "text-blue-200";

  return (
    <div className={`rounded-xl ${cardClass} overflow-hidden text-white`}>
      <div className={`px-5 py-3.5 ${isDark ? "border-b border-[#263354]" : "bg-white/10"}`}>
        <h2 className="text-base font-semibold">{title}</h2>
      </div>

      <div className="px-5 py-4">
        <div className={`grid ${gridCols} gap-2 pb-2 text-[11px] uppercase tracking-wider ${subtleText}`}>
          <span></span>
          <span className="text-right">Short-term</span>
          <span className="text-right">Long-term</span>
        </div>

        <div className={`border-b ${dividerColor}`}>
          <GainRow label="Profits" stValue={stcg.profits} ltValue={ltcg.profits} />
        </div>
        <div className={`border-b ${dividerColor}`}>
          <GainRow label="Losses" stValue={stcg.losses} ltValue={ltcg.losses} />
        </div>
        <div className={`border-b ${dividerColor}`}>
          <GainRow label="Net Capital Gains" stValue={netST} ltValue={netLT} isBold />
        </div>

        <div className="mt-4 mb-1">
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-blue-100"}`}>
            {isDark ? "Realised Capital Gains:" : "Effective Capital Gains:"}
          </p>
          <p className={`text-2xl font-bold tabular-nums ${isBlue && realised > 0 ? "text-green-300" : ""}`}>
            {formatCurrency(realised)}
          </p>
        </div>

        {isBlue && savings > 0 && (
          <p className="mt-2 text-sm text-blue-100">
            🎉 Your taxable capital gains are reduced by: {formatCurrency(savings)}
          </p>
        )}
      </div>
    </div>
  );
}
