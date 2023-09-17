import { useState } from "react";
import { Calculator } from "./components/calculator";

function App() {
  const [result, setResult] = useState<{
    months: number;
    assets: number;
    totalReturn: number;
    profit: number;
    percentage: number;
  } | null>(null);
  return (
    <main className="flex items-center py-4 gap-4 flex-col max-w-md mx-auto min-h-screen bg-slate-100 px-4">
      <h1 className="text-2xl md:text-4xl font-medium text-center">
        Investment Calculator
      </h1>
      <Calculator setResult={setResult} />
      {result !== null && (
        <div className="text-lg w-full grid gap-4">
          <h4>Investasi {result.months} bulan kamu:</h4>
          <table className="w-full border border-slate-300 rounded">
            <tr>
              <td className="p-2 border">Asetmu</td>
              <td className="p-2 border">
                Rp.{result.assets.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="p-2 border">Return</td>
              <td className="p-2 border">
                Rp.{result.totalReturn.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="p-2 border">Dengan Profit</td>
              <td className="p-2 border">
                Rp.{result.profit.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="p-2 border">Persentase</td>
              <td className="p-2 border">
                {(result.percentage / 12).toFixed(2)}% per bulan
              </td>
            </tr>
          </table>
        </div>
      )}
    </main>
  );
}

export default App;
