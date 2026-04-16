import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleHolding, toggleAll } from "../store/holdingsSlice";
import { formatCurrency, formatCurrencyShort, formatHolding } from "../utils/formatCurrency";

const INITIAL_VISIBLE = 10;

export default function HoldingsTable() {
  const dispatch = useDispatch();
  const { data, selected } = useSelector((state) => state.holdings);
  const [showAll, setShowAll] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);

  const indexedData = useMemo(() => data.map((h, i) => ({ ...h, _origIndex: i })), [data]);

  const sortedData = useMemo(() => {
    if (!sortOrder) return indexedData;
    return [...indexedData].sort((a, b) =>
      sortOrder === "desc"
        ? b.stcg.gain - a.stcg.gain
        : a.stcg.gain - b.stcg.gain
    );
  }, [indexedData, sortOrder]);

  const visibleData = showAll ? sortedData : sortedData.slice(0, INITIAL_VISIBLE);
  const selectedCount = Object.values(selected).filter(Boolean).length;
  const allSelected = data.length > 0 && selectedCount === data.length;
  const someSelected = selectedCount > 0 && !allSelected;

  const handleToggleAll = () => {
    dispatch(toggleAll(!allSelected));
  };

  const handleToggleRow = (origIndex) => {
    dispatch(toggleHolding(origIndex));
  };

  const handleSortShortTerm = () => {
    setSortOrder((prev) => {
      if (prev === null) return "desc";
      if (prev === "desc") return "asc";
      return "desc";
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[#263354] bg-[#0D1421]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b border-[#263354] text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              <th className="w-12 px-4 py-3.5">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={handleToggleAll}
                  className="h-4 w-4 cursor-pointer rounded border-gray-600 bg-transparent text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                />
              </th>
              <th className="px-4 py-3.5">Asset</th>
              <th className="px-4 py-3.5 text-right">
                <div>Holdings</div>
                <div className="text-[10px] font-normal normal-case tracking-normal text-gray-600">Avg Buy Price</div>
              </th>
              <th className="px-4 py-3.5 text-right">Current Price</th>
              <th
                className="cursor-pointer select-none px-4 py-3.5 text-right transition-colors hover:text-gray-300"
                onClick={handleSortShortTerm}
              >
                <span className="inline-flex items-center gap-1">
                  {sortOrder && (
                    <svg
                      className={`h-3.5 w-3.5 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  )}
                  Short-Term
                </span>
              </th>
              <th className="px-4 py-3.5 text-right">Long-Term</th>
              <th className="px-4 py-3.5 text-right">Amount to Sell</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a2744]">
            {visibleData.map((holding) => {
              const origIndex = holding._origIndex;
              const isSelected = !!selected[origIndex];
              return (
                <tr
                  key={`${holding.coin}-${holding.coinName}-${origIndex}`}
                  onClick={() => handleToggleRow(origIndex)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-[#122040]"
                      : "hover:bg-[#111c33]"
                  }`}
                >
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleRow(origIndex)}
                      onClick={(e) => e.stopPropagation()}
                      className="h-4 w-4 cursor-pointer rounded border-gray-600 bg-transparent text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={holding.logo}
                        alt={holding.coin}
                        className="h-8 w-8 rounded-full bg-gray-800 object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg";
                        }}
                      />
                      <div>
                        <p className="font-medium text-white">
                          {holding.coinName.length > 16 ? holding.coinName.slice(0, 16) + "..." : holding.coinName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {holding.coin}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <p className="font-medium text-white">
                      {formatHolding(holding.totalHolding)} {holding.coin}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatCurrency(holding.averageBuyPrice)}/{holding.coin}
                    </p>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <PriceWithTooltip price={holding.currentPrice} />
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <GainCell
                      gain={holding.stcg.gain}
                      balance={holding.stcg.balance}
                      coin={holding.coin}
                    />
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <GainCell
                      gain={holding.ltcg.gain}
                      balance={holding.ltcg.balance}
                      coin={holding.coin}
                    />
                  </td>
                  <td className="px-4 py-3.5 text-right font-medium text-white">
                    {isSelected
                      ? `${formatHolding(holding.totalHolding)} ${holding.coin}`
                      : <span className="text-gray-600">-</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {data.length > INITIAL_VISIBLE && (
        <div className="border-t border-[#263354] px-4 py-3">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </div>
  );
}

function PriceWithTooltip({ price }) {
  const shortText = formatCurrencyShort(price);
  const fullText = formatCurrency(price);
  const needsTooltip = shortText !== fullText;

  return (
    <span className="group relative inline-block font-medium text-white">
      {shortText}
      {needsTooltip && (
        <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-white px-2.5 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          {fullText}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-white" />
        </span>
      )}
    </span>
  );
}

function GainCell({ gain, balance, coin }) {
  const isPositive = gain > 0;
  const isNegative = gain < 0;
  const isZero = gain === 0 && balance === 0;

  if (isZero) {
    return (
      <div>
        <p className="text-gray-400">{formatCurrency(0)}</p>
        <p className="text-xs text-gray-600">0 {coin}</p>
      </div>
    );
  }

  return (
    <div>
      <p
        className={`font-medium ${
          isPositive
            ? "text-green-400"
            : isNegative
              ? "text-red-400"
              : "text-white"
        }`}
      >
        {formatCurrency(gain)}
      </p>
      <p className="text-xs text-gray-500">
        {formatHolding(balance)} {coin}
      </p>
    </div>
  );
}
