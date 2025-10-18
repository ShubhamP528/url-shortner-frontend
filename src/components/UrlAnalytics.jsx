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
import {
  FiBarChart2,
  FiTrendingUp,
  FiMonitor,
  FiCheckCircle,
  FiSearch,
} from "react-icons/fi";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!alias.trim()) {
      setError("Please enter a URL alias");
      return;
    }

    setIsLoading(true);
    setError("");
    setAnalytics(null);

    try {
      const data = await onFetchAnalytics(alias);
      setAnalytics(data);
      setError("");
    } catch (err) {
      console.error("Error fetching URL analytics:", err);
      setError(err.message || "Failed to fetch analytics. Please try again.");
      setAnalytics(null);
    } finally {
      setIsLoading(false);
    }
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
    <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md mt-4 sm:mt-6 max-w-4xl mx-auto">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center sm:text-left">
        Individual URL Analytics
      </h2>

      {/* Alias Input and Fetch Button */}
      <div className="mb-4">
        <label
          htmlFor="alias"
          className="block text-gray-700 font-semibold mb-2"
        >
          Short URL Alias <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="alias"
            type="text"
            value={alias}
            onChange={(e) => {
              setAlias(e.target.value);
              if (error) {
                setError("");
              }
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleFetch();
              }
            }}
            className={`w-full border rounded-lg p-3 sm:p-4 pr-10 sm:pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base ${
              error ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            placeholder="Enter short URL alias (e.g., my-link)"
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
        </div>
        <p className="text-gray-500 text-xs mt-1">
          Enter the alias part of your short URL (the part after the domain)
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleFetch}
          disabled={isLoading || !alias.trim()}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Fetching Analytics...
            </div>
          ) : (
            <div className="flex items-center">
              <FiBarChart2 className="mr-2" />
              Fetch Analytics
            </div>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-red-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Analytics Results */}
      {analytics && (
        <div className="mt-6">
          {/* Success Header */}
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-green-800 flex items-center">
                <FiBarChart2 className="mr-2" />
                Analytics for "{alias}"
              </h3>
            </div>
          </div>

          <div className="space-y-8">
            {/* Summary Stats */}
            {analytics.totalClicks !== undefined && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {analytics.totalClicks || 0}
                  </div>
                  <div className="text-blue-800 font-medium">Total Clicks</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {analytics.uniqueUsers || 0}
                  </div>
                  <div className="text-green-800 font-medium">Unique Users</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {analytics.clicksByDate ? analytics.clicksByDate.length : 0}
                  </div>
                  <div className="text-purple-800 font-medium">Active Days</div>
                </div>
              </div>
            )}

            {/* Clicks by Date Chart */}
            {analytics.clicksByDate && analytics.clicksByDate.length > 0 ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <FiTrendingUp className="mr-2" />
                  Clicks by Date
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <Line
                    data={clicksByDateData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        title: {
                          display: true,
                          text: "Daily Click Performance",
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            stepSize: 1,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-2">
                  <FiBarChart2 className="w-16 h-16 mx-auto text-gray-400" />
                </div>
                <p className="text-gray-600">
                  No click data available for this URL
                </p>
              </div>
            )}

            {/* OS Analytics Chart */}
            {analytics.osType && analytics.osType.length > 0 ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <FiMonitor className="mr-2" />
                  Operating System Analytics
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div className="max-w-md mx-auto">
                    <Pie
                      data={osData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: "bottom",
                          },
                          title: {
                            display: true,
                            text: "Clicks by Operating System",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-2">
                  <FiMonitor className="w-16 h-16 mx-auto text-gray-400" />
                </div>
                <p className="text-gray-600">
                  No OS data available for this URL
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!analytics && !error && !isLoading && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">
            <FiSearch className="w-16 h-16 mx-auto text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Ready to Analyze
          </h3>
          <p className="text-gray-600">
            Enter a URL alias above and click "Fetch Analytics" to view detailed
            performance data.
          </p>
        </div>
      )}
    </div>
  );
};

export default UrlAnalytics;
