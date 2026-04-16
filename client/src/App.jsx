import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHoldings } from "./store/holdingsSlice";
import { fetchCapitalGains } from "./store/capitalGainsSlice";
import CapitalGainsCard from "./components/CapitalGainsCard";
import HoldingsTable from "./components/HoldingsTable";
import Disclaimer from "./components/Disclaimer";
import Loader from "./components/Loader";
import ErrorState from "./components/ErrorState";
import { formatCurrency } from "./utils/formatCurrency";

export default function App() {
  const dispatch = useDispatch();
  const holdings = useSelector((state) => state.holdings);
  const capitalGains = useSelector((state) => state.capitalGains);

  useEffect(() => {
    dispatch(fetchHoldings());
    dispatch(fetchCapitalGains());
  }, [dispatch]);

  const afterHarvesting = useMemo(() => {
    const after = {
      stcg: { profits: capitalGains.stcg.profits, losses: capitalGains.stcg.losses },
      ltcg: { profits: capitalGains.ltcg.profits, losses: capitalGains.ltcg.losses },
    };

    holdings.data.forEach((holding, index) => {
      if (!holdings.selected[index]) return;

      if (holding.stcg.gain > 0) {
        after.stcg.profits += holding.stcg.gain;
      } else if (holding.stcg.gain < 0) {
        after.stcg.losses += Math.abs(holding.stcg.gain);
      }

      if (holding.ltcg.gain > 0) {
        after.ltcg.profits += holding.ltcg.gain;
      } else if (holding.ltcg.gain < 0) {
        after.ltcg.losses += Math.abs(holding.ltcg.gain);
      }
    });

    return after;
  }, [holdings.data, holdings.selected, capitalGains]);

  const preRealised =
    capitalGains.stcg.profits -
    capitalGains.stcg.losses +
    capitalGains.ltcg.profits -
    capitalGains.ltcg.losses;

  const postRealised =
    afterHarvesting.stcg.profits -
    afterHarvesting.stcg.losses +
    afterHarvesting.ltcg.profits -
    afterHarvesting.ltcg.losses;

  const savings = preRealised > postRealised ? preRealised - postRealised : 0;

  const isLoading = holdings.loading || capitalGains.loading;
  const error = holdings.error || capitalGains.error;

  if (isLoading) return <Loader />;
  if (error) {
    return (
      <ErrorState
        message={`Failed to load data: ${error}`}
        onRetry={() => {
          dispatch(fetchHoldings());
          dispatch(fetchCapitalGains());
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-5 flex items-baseline gap-3">
        <h1 className="text-xl font-bold text-white sm:text-2xl">
          Tax Optimisation
        </h1>
        <button className="group relative text-sm font-medium text-cyan-400 hover:underline">
          How it works?
          <div className="pointer-events-none absolute left-0 top-full z-50 mt-2 w-72 rounded-lg bg-white p-4 text-xs leading-relaxed text-gray-800 opacity-0 shadow-xl transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
            <ul className="list-disc space-y-1.5 pl-4">
              <li>See your capital gains for FY 2024-25 in the left card</li>
              <li>Check boxes for assets you plan on selling to reduce your tax liability</li>
              <li>Instantly see your updated tax liability in the right card</li>
            </ul>
            <p className="mt-2 font-medium">Pro tip: <span className="font-normal">Experiment with different combinations of your holdings to optimize your tax liability</span></p>
          </div>
        </button>
      </header>

      <Disclaimer />

      <section className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        <CapitalGainsCard
          title="Pre Harvesting"
          variant="dark"
          stcg={capitalGains.stcg}
          ltcg={capitalGains.ltcg}
        />
        <CapitalGainsCard
          title="After Harvesting"
          variant="blue"
          stcg={afterHarvesting.stcg}
          ltcg={afterHarvesting.ltcg}
          savings={savings}
        />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Holdings</h2>
        <HoldingsTable />
      </section>
    </div>
  );
}
