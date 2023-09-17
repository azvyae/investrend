import { useEffect, useState } from "react";
import { getThousandsSeparator } from "../helper";

const thousandsSeparator = getThousandsSeparator();

function Calculator({
  setResult,
}: {
  setResult: React.Dispatch<
    React.SetStateAction<{
      months: number;
      assets: number;
      totalReturn: number;
      profit: number;
      percentage: number;
    } | null>
  >;
}) {
  const [months, setMonths] = useState("");
  const [initial, setInitial] = useState("");
  const [investment, setInvestment] = useState("");
  const [returnPerYear, setReturnPerYear] = useState("");
  useEffect(() => {
    const [mo, init, inv, retPerMonth] = [
      Number(months),
      Number(initial.replaceAll(thousandsSeparator, "")),
      Number(investment.replaceAll(thousandsSeparator, "")),
      Number(returnPerYear) / 100 / 12,
    ];
    let total = init;
    let totalNormal = init;
    for (let i = 0; i < mo; i++) {
      total += inv;
      totalNormal += inv;
      total += total * retPerMonth;
    }
    if (mo > 0 && init >= 0 && inv >= 0 && !Number.isNaN(retPerMonth)) {
      setResult({
        months: mo,
        assets: totalNormal,
        profit: total - totalNormal,
        totalReturn: total,
        percentage: Number(returnPerYear),
      });
    }
  }, [months, initial, investment, returnPerYear, setResult]);
  return (
    <form className="grid gap-2 w-full">
      <label htmlFor="months">Lama investasi (bulan)</label>
      <input
        className="border px-2 py-1 rounded"
        type="text"
        min={1}
        name="months"
        value={months}
        inputMode="numeric"
        onChange={(e) => {
          const num = Number(e.target.value.replaceAll(thousandsSeparator, ""));
          if (!Number.isNaN(num)) {
            if (Number(e.target.value) < 1) {
              return setMonths("1");
            }
            return setMonths(num.toLocaleString());
          }
        }}
        id="months"
      />
      <label htmlFor="initial">Nilai awal modal</label>
      <input
        className="border px-2 py-1 rounded"
        type="text"
        name="initial"
        inputMode="numeric"
        onChange={(e) => {
          const num = Number(e.target.value.replaceAll(thousandsSeparator, ""));
          if (!Number.isNaN(num)) {
            setInitial(num.toLocaleString());
          }
        }}
        id="initial"
        value={initial}
      />
      <label htmlFor="investment">Investasi per bulan</label>
      <input
        className="border px-2 py-1 rounded"
        type="text"
        name="investment"
        value={investment}
        inputMode="numeric"
        onChange={(e) => {
          const num = Number(e.target.value.replaceAll(thousandsSeparator, ""));
          if (!Number.isNaN(num)) {
            setInvestment(num.toLocaleString());
          }
        }}
        id="investment"
      />
      <label htmlFor="returnPerYear">Return per tahun (%)</label>
      <input
        className="border px-2 py-1 rounded"
        type="number"
        value={returnPerYear}
        inputMode="numeric"
        onChange={(e) => {
          if (Number(e.target.value) <= 100) setReturnPerYear(e.target.value);
        }}
        name="returnPerYear"
        id="returnPerYear"
      />
    </form>
  );
}

export { Calculator };
