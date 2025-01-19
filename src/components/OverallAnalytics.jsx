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

// Register chart components
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

const OverallAnalytics = ({ data }) => {
  if (!data) return <div>Loading...</div>;

  const clicksByDateData = {
    labels: data.clicksByDate.map((item) => item.date),
    datasets: [
      {
        label: "Clicks",
        data: data.clicksByDate.map((item) => item.clicks),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
    ],
  };

  const osData = {
    labels: data.osType.map((os) => os.name),
    datasets: [
      {
        data: data.osType.map((os) => os.uniqueClicks),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        Overall Analytics
      </h2>

      <div className="grid gap-6 lg:grid-cols-2 sm:grid-cols-1">
        {/* Clicks by Date */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center lg:text-left">
            Clicks by Date
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="w-full aspect-w-16 aspect-h-9">
              <Line data={clicksByDateData} />
            </div>
          </div>
        </div>

        {/* OS Analytics */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center lg:text-left">
            OS Analytics
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="w-full aspect-w-16 aspect-h-9">
              <Pie data={osData} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total URLs */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h4 className="font-semibold text-gray-700">Total URLs</h4>
          <p className="text-lg font-medium text-gray-800">{data.totalUrls}</p>
        </div>

        {/* Total Clicks */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h4 className="font-semibold text-gray-700">Total Clicks</h4>
          <p className="text-lg font-medium text-gray-800">
            {data.totalClicks}
          </p>
        </div>

        {/* Unique Users */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h4 className="font-semibold text-gray-700">Unique Users</h4>
          <p className="text-lg font-medium text-gray-800">
            {data.uniqueUsers}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverallAnalytics;
