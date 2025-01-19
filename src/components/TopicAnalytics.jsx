import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopicAnalytics = ({ onFetchTopicAnalytics }) => {
  const [topic, setTopic] = useState("");
  const [analytics, setAnalytics] = useState(null);

  const handleFetch = async () => {
    const data = await onFetchTopicAnalytics(topic);
    setAnalytics(data);
  };

  // Clicks by Date chart data for the Bar chart
  const clicksByDateData = analytics
    ? {
        labels: analytics.clicksByDate.map((item) => item.date),
        datasets: [
          {
            label: "Clicks",
            data: analytics.clicksByDate.map((item) => item.clicks),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      }
    : null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6 max-w-3xl mx-auto sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        Topic-Based Analytics
      </h2>

      {/* Input Field */}
      <div className="mb-4">
        <label htmlFor="topic" className="block text-gray-700 mb-2">
          Topic:
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full border rounded p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a topic"
        />
      </div>

      {/* Fetch Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleFetch}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
        >
          Fetch Analytics
        </button>
      </div>

      {/* Chart Section */}
      {analytics && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-center sm:text-left">
            Clicks by Date
          </h3>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="aspect-w-16 aspect-h-9">
              <Bar data={clicksByDateData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicAnalytics;
