import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UrlAnalytics from "../components/UrlAnalytics";
import TopicAnalytics from "../components/TopicAnalytics";
import OverallAnalytics from "../components/OverallAnalytics";
import { useMyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import { NODE_END_POINT } from "../utils/utils";
import {
  FiBarChart2,
  FiLink,
  FiTag,
  FiPlus,
  FiRefreshCw,
  FiUsers,
  FiActivity,
  FiTrendingUp,
  FiPieChart,
} from "react-icons/fi";

const Dashboard = () => {
  const [overallAnalytics, setOverallAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isVisible, setIsVisible] = useState(false);
  const { userToken } = useMyContext();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    if (!userToken) {
      navigate("/login");
    }
  }, [userToken, navigate]);

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
        let errorMessage;

        try {
          const errorData = await response.json();
          errorMessage = errorData.error?.message || errorData.message;
        } catch (parseError) {
          errorMessage = null;
        }

        // Throw server error message if available, otherwise use status-based fallback
        if (errorMessage) {
          throw new Error(errorMessage);
        } else {
          // Only use fallback messages when no server message is available
          switch (response.status) {
            case 401:
              throw new Error("Authentication failed. Please log in again.");
            case 403:
              throw new Error("You don't have permission to access analytics.");
            case 404:
              throw new Error("No analytics data found.");
            case 429:
              throw new Error(
                "Too many requests. Please wait before trying again."
              );
            case 500:
              throw new Error("Server error. Please try again later.");
            case 503:
              throw new Error(
                "Service temporarily unavailable. Please try again later."
              );
            default:
              throw new Error(`Request failed with status ${response.status}.`);
          }
        }
      }

      const data = await response.json();

      // Validate response data structure
      if (!data || typeof data !== "object") {
        throw new Error("Invalid analytics data received from server");
      }

      return data;
    } catch (error) {
      console.error("Analytics fetch error:", error);

      // Handle different types of errors
      if (error.name === "TypeError") {
        if (
          error.message.includes("fetch") ||
          error.message.includes("Failed to fetch")
        ) {
          throw new Error(
            "Network error. Please check your internet connection."
          );
        } else if (error.message.includes("JSON")) {
          throw new Error("Invalid response format from server.");
        } else {
          throw new Error("Connection failed. Server might be unavailable.");
        }
      } else if (error.name === "AbortError") {
        throw new Error("Request timed out.");
      } else if (error.name === "SyntaxError") {
        throw new Error("Invalid data format received from server.");
      } else {
        // Re-throw the error as-is (including server messages)
        throw error;
      }
    }
  };

  const onFetchTopicAnalytics = async (topic) => {
    // Input validation
    if (!topic || typeof topic !== "string") {
      throw new Error("Please provide a valid topic name");
    }

    const trimmedTopic = topic.trim();
    if (trimmedTopic.length === 0) {
      throw new Error("Topic name cannot be empty");
    }

    try {
      const response = await fetch(
        `${NODE_END_POINT}/urls/analytics/topic/${encodeURIComponent(
          trimmedTopic
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!response.ok) {
        let errorMessage;

        try {
          const errorData = await response.json();
          errorMessage = errorData.error?.message || errorData.message;
        } catch (parseError) {
          errorMessage = null;
        }

        // Throw server error message if available, otherwise use status-based fallback
        if (errorMessage) {
          throw new Error(errorMessage);
        } else {
          // Only use fallback messages when no server message is available
          switch (response.status) {
            case 401:
              throw new Error("Authentication failed. Please log in again.");
            case 403:
              throw new Error(
                "You don't have permission to access this topic's analytics."
              );
            case 404:
              throw new Error(
                `No analytics found for topic "${trimmedTopic}".`
              );
            case 429:
              throw new Error(
                "Too many requests. Please wait before trying again."
              );
            case 500:
              throw new Error("Server error. Please try again later.");
            case 503:
              throw new Error(
                "Service temporarily unavailable. Please try again later."
              );
            default:
              throw new Error(`Request failed with status ${response.status}.`);
          }
        }
      }

      const data = await response.json();

      // Validate response data structure
      if (!data || typeof data !== "object") {
        throw new Error("Invalid analytics data received from server");
      }

      return data;
    } catch (error) {
      console.error("Topic analytics error:", error);

      // Handle different types of errors
      if (error.name === "TypeError") {
        if (
          error.message.includes("fetch") ||
          error.message.includes("Failed to fetch")
        ) {
          throw new Error(
            "Network error. Please check your internet connection."
          );
        } else if (error.message.includes("JSON")) {
          throw new Error("Invalid response format from server.");
        } else {
          throw new Error("Connection failed. Server might be unavailable.");
        }
      } else if (error.name === "AbortError") {
        throw new Error("Request timed out.");
      } else if (error.name === "SyntaxError") {
        throw new Error("Invalid data format received from server.");
      } else {
        // Re-throw the error as-is (including server messages)
        throw error;
      }
    }
  };

  const onFetchAnalytics = async (alias) => {
    // Input validation
    if (!alias || typeof alias !== "string") {
      throw new Error("Please provide a valid URL alias");
    }

    const trimmedAlias = alias.trim();
    if (trimmedAlias.length === 0) {
      throw new Error("URL alias cannot be empty");
    }

    if (trimmedAlias.length < 3) {
      throw new Error("URL alias must be at least 3 characters long");
    }

    try {
      const response = await fetch(
        `${NODE_END_POINT}/urls/analytics/alias/${encodeURIComponent(
          trimmedAlias
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!response.ok) {
        let errorMessage;

        try {
          const errorData = await response.json();
          errorMessage = errorData.error?.message || errorData.message;
        } catch (parseError) {
          // If response is not JSON, use status-based error messages
          errorMessage = null;
        }

        // Throw server error message if available, otherwise use status-based fallback
        if (errorMessage) {
          throw new Error(errorMessage);
        } else {
          // Only use fallback messages when no server message is available
          switch (response.status) {
            case 401:
              throw new Error("Authentication failed. Please log in again.");
            case 403:
              throw new Error(
                "You don't have permission to access this URL's analytics."
              );
            case 404:
              throw new Error(
                `No analytics found for alias "${trimmedAlias}".`
              );
            case 429:
              throw new Error(
                "Too many requests. Please wait before trying again."
              );
            case 500:
              throw new Error("Server error. Please try again later.");
            case 503:
              throw new Error(
                "Service temporarily unavailable. Please try again later."
              );
            default:
              throw new Error(`Request failed with status ${response.status}.`);
          }
        }
      }

      const data = await response.json();

      // Validate response data structure
      if (!data || typeof data !== "object") {
        throw new Error("Invalid analytics data received from server");
      }

      return data;
    } catch (error) {
      console.error("URL analytics error:", error);

      // Handle different types of errors
      if (error.name === "TypeError") {
        if (
          error.message.includes("fetch") ||
          error.message.includes("Failed to fetch")
        ) {
          throw new Error(
            "Network error. Please check your internet connection."
          );
        } else if (error.message.includes("JSON")) {
          throw new Error("Invalid response format from server.");
        } else {
          throw new Error("Connection failed. Server might be unavailable.");
        }
      } else if (error.name === "AbortError") {
        throw new Error("Request timed out.");
      } else if (error.name === "SyntaxError") {
        throw new Error("Invalid data format received from server.");
      } else {
        // Re-throw the error as-is (including server messages)
        throw error;
      }
    }
  };

  const refreshAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOverallAnalytics();
      setOverallAnalytics(data);
    } catch (error) {
      if (
        error.message.includes("401") ||
        error.message.includes("Authentication")
      ) {
        setError("Session expired. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
      } else if (error.message.includes("fetch")) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError(`❌ ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) {
      refreshAnalytics();
    }
  }, [userToken]);

  const tabs = [
    { id: "overview", label: "Overview", icon: FiBarChart2 },
    { id: "url", label: "URL Analytics", icon: FiLink },
    { id: "topic", label: "Topic Analytics", icon: FiTag },
  ];

  const quickStats = overallAnalytics
    ? [
        {
          title: "Total URLs",
          value: overallAnalytics.totalUrls || 0,
          icon: FiLink,
          color: "from-blue-500 to-blue-600",
          change: "+12%",
          changeType: "positive",
        },
        {
          title: "Total Clicks",
          value: overallAnalytics.totalClicks || 0,
          icon: FiActivity,
          color: "from-green-500 to-green-600",
          change: "+8%",
          changeType: "positive",
        },
        {
          title: "Unique Users",
          value: overallAnalytics.uniqueUsers || 0,
          icon: FiUsers,
          color: "from-purple-500 to-purple-600",
          change: "+15%",
          changeType: "positive",
        },
        {
          title: "Click Rate",
          value:
            overallAnalytics.totalUrls > 0
              ? `${
                  Math.round(
                    (overallAnalytics.totalClicks /
                      overallAnalytics.totalUrls) *
                      100
                  ) / 100
                }`
              : "0",
          icon: FiTrendingUp,
          color: "from-orange-500 to-orange-600",
          change: "+5%",
          changeType: "positive",
        },
      ]
    : [];

  if (!userToken) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 flex items-center">
                <FiBarChart2 className="mr-2 sm:mr-3" />
                Dashboard
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600">
                Monitor your URL performance and analytics
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 lg:mt-0">
              <Link
                to="/createUrl"
                className="inline-flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <FiPlus className="mr-2" />
                <span className="hidden sm:inline">Create New URL</span>
                <span className="sm:hidden">Create URL</span>
              </Link>

              <button
                onClick={refreshAnalytics}
                disabled={loading}
                className="inline-flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <FiRefreshCw
                  className={`mr-2 ${loading ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">
                  {loading ? "Refreshing..." : "Refresh Data"}
                </span>
                <span className="sm:hidden">{loading ? "..." : "Refresh"}</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Cards */}
          {!loading && !error && overallAnalytics && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {quickStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className={`bg-gradient-to-r ${stat.color} p-4 sm:p-6`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/80 text-xs sm:text-sm font-medium">
                          {stat.title}
                        </p>
                        <p className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mt-1">
                          {typeof stat.value === "number"
                            ? stat.value.toLocaleString()
                            : stat.value}
                        </p>
                      </div>
                      <div className="text-2xl sm:text-3xl lg:text-4xl opacity-80">
                        <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center text-sm">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          stat.changeType === "positive"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {stat.changeType === "positive" ? "↗️" : "↘️"}{" "}
                        {stat.change}
                      </span>
                      <span className="ml-2 text-gray-500">vs last month</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <tab.icon className="mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div>
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                        <div
                          className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0"
                          style={{
                            clipPath:
                              "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)",
                          }}
                        ></div>
                      </div>
                      <p className="mt-4 text-blue-600 font-medium text-lg">
                        Loading analytics...
                      </p>
                      <p className="text-gray-500 text-sm">
                        This may take a few moments
                      </p>
                    </div>
                  ) : error ? (
                    <div className="text-center py-16">
                      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg max-w-md mx-auto">
                        <div className="flex items-center">
                          <svg
                            className="w-6 h-6 text-red-500 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div>
                            <p className="text-red-700 font-medium">{error}</p>
                            <button
                              onClick={refreshAnalytics}
                              className="mt-2 text-red-600 hover:text-red-800 font-medium text-sm underline"
                            >
                              Try Again
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : overallAnalytics ? (
                    <OverallAnalytics data={overallAnalytics} />
                  ) : (
                    <div className="text-center py-16">
                      <div className="text-6xl mb-4">
                        <FiPieChart className="w-16 h-16 mx-auto text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        No Data Available
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Start creating short URLs to see your analytics here.
                      </p>
                      <Link
                        to="/createUrl"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                      >
                        <FiPlus className="mr-2" />
                        Create Your First URL
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* URL Analytics Tab */}
              {activeTab === "url" && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                      <FiLink className="mr-2" />
                      Individual URL Analytics
                    </h3>
                    <p className="text-gray-600">
                      Analyze the performance of specific short URLs by entering
                      their alias.
                    </p>
                  </div>
                  <UrlAnalytics onFetchAnalytics={onFetchAnalytics} />
                </div>
              )}

              {/* Topic Analytics Tab */}
              {activeTab === "topic" && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                      <FiTag className="mr-2" />
                      Topic-Based Analytics
                    </h3>
                    <p className="text-gray-600">
                      View aggregated analytics for URLs grouped by topic
                      categories.
                    </p>
                  </div>
                  <TopicAnalytics
                    onFetchTopicAnalytics={onFetchTopicAnalytics}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
