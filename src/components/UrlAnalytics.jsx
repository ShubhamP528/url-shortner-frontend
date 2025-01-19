import { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register necessary chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const UrlAnalytics = ({ onFetchAnalytics }) => {
  const [alias, setAlias] = useState("");
  const [analytics, setAnalytics] = useState(null);

  const handleFetch = async () => {
    const data = await onFetchAnalytics(alias);
    setAnalytics(data);
  };

  // Clicks by Date chart data
  const clicksByDateData = analytics
    ? {
        labels: analytics.clicksByDate.map((item) => item.date),
        datasets: [
          {
            label: "Clicks",
            data: analytics.clicksByDate.map((item) => item.clicks),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
        ],
      }
    : null;

  // OS Analytics Pie chart data
  const osData = analytics
    ? {
        labels: analytics.osType.map((os) => os.name),
        datasets: [
          {
            data: analytics.osType.map((os) => os.uniqueClicks),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
          },
        ],
      }
    : null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6 max-w-3xl mx-auto sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        Individual URL Analytics
      </h2>

      {/* Alias Input and Fetch Button */}
      <div className="mb-4">
        <label htmlFor="alias" className="block text-gray-700 mb-2">
          Short URL Alias:
        </label>
        <input
          id="alias"
          type="text"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          className="w-full border rounded p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter short URL alias"
        />
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={handleFetch}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Fetch Analytics
        </button>
      </div>

      {analytics && (
        <div className="mt-6 space-y-8">
          {/* Clicks by Date Chart */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center sm:text-left">
              Clicks by Date
            </h3>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="aspect-w-16 aspect-h-9">
                <Line data={clicksByDateData} />
              </div>
            </div>
          </div>

          {/* OS Analytics Chart */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center sm:text-left">
              OS Analytics
            </h3>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="aspect-w-16 aspect-h-9">
                <Pie data={osData} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlAnalytics;
