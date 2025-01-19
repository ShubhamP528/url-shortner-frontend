import { useEffect, useState } from "react";
import UrlAnalytics from "../components/UrlAnalytics";
import TopicAnalytics from "../components/TopicAnalytics";
import OverallAnalytics from "../components/OverallAnalytics";
import { useMyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import { NODE_END_POINT } from "../utils/utils";

const Dashboard = () => {
  const [overallAnalytics, setOverallAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userToken } = useMyContext();
  const navigate = useNavigate();

  const fetchOverallAnalytics = async () => {
    try {
      const response = await fetch(`${NODE_END_POINT}/urls/analytics/overall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch overall analytics.");
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onFetchTopicAnalytics = async (topic) => {
    try {
      const response = await fetch(
        `${NODE_END_POINT}/urls/analytics/topic/${topic}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch topic analytics.");
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onFetchAnalytics = async (alias) => {
    try {
      const response = await fetch(
        `${NODE_END_POINT}/urls/analytics/alias/${alias}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch URL analytics.");
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOverallAnalytics();
        setOverallAnalytics(data);
        setError(null);
      } catch (error) {
        setError(error.message || "Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };

    if (userToken) {
      fetchData();
    }
  }, [userToken]);

  return (
    <div className="p-4 sm:p-6 w-screen mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-600">
        Dashboard
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* URL Analytics Section */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-500 text-center sm:text-left">
            URL Analytics
          </h2>
          <UrlAnalytics onFetchAnalytics={onFetchAnalytics} />
        </div>

        {/* Topic Analytics Section */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-500 text-center sm:text-left">
            Topic Analytics
          </h2>
          <TopicAnalytics onFetchTopicAnalytics={onFetchTopicAnalytics} />
        </div>

        {/* Overall Analytics Section */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 col-span-full">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-500 text-center sm:text-left">
            Overall Analytics
          </h2>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loader border-t-2 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
              <p className="ml-3 text-blue-600">Loading overall analytics...</p>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : overallAnalytics ? (
            <OverallAnalytics data={overallAnalytics} />
          ) : (
            <p className="text-gray-500">
              No data available for overall analytics.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
