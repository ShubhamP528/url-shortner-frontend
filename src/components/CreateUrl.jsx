import { useState } from "react";
import { NODE_END_POINT } from "../utils/utils";
import { useMyContext } from "../context/MyContext";
import {
  FiLink,
  FiTag,
  FiRefreshCw,
  FiCopy,
  FiCheck,
  FiAlertCircle,
  FiCheckCircle,
  FiStar,
} from "react-icons/fi";

const CreateUrl = () => {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [topic, setTopic] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { userToken } = useMyContext();

  // Define the array of topics
  const topics = [
    "Acquisition",
    "Activation",
    "Retention",
    "Random",
    "Technology",
    "Science",
    "Health",
    "Business",
    "Entertainment",
    "Sports",
    "Education",
    "Art",
    "Travel",
  ];

  // URL validation function
  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!longUrl.trim()) {
      errors.longUrl = "Please enter a URL";
    } else if (!isValidUrl(longUrl.trim())) {
      errors.longUrl =
        "Please enter a valid URL (must include http:// or https://)";
    }

    if (customAlias && customAlias.trim().length > 0) {
      const trimmedAlias = customAlias.trim();
      if (trimmedAlias.length < 3) {
        errors.customAlias = "Custom alias must be at least 3 characters long";
      } else if (trimmedAlias.length > 50) {
        errors.customAlias = "Custom alias must be less than 50 characters";
      } else if (!/^[a-zA-Z0-9-_]+$/.test(trimmedAlias)) {
        errors.customAlias =
          "Custom alias can only contain letters, numbers, hyphens, and underscores";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Reset form
  const resetForm = () => {
    setLongUrl("");
    setCustomAlias("");
    setTopic("");
    setShortUrl("");
    setError("");
    setValidationErrors({});
    setCopied(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous states
    setError("");
    setShortUrl("");
    setCopied(false);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${NODE_END_POINT}/urls/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          longUrl: longUrl.trim(),
          customAlias: customAlias.trim() || undefined,
          topic: topic || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
      } else {
        // Extract error message from nested structure
        const errorMessage =
          data.error?.message || data.message || "An error occurred";

        setError(`❌ ${errorMessage}`);
      }
    } catch (err) {
      console.error("Error creating short URL:", err);

      // Handle different types of network errors
      if (err.name === "TypeError") {
        if (
          err.message.includes("fetch") ||
          err.message.includes("Failed to fetch")
        ) {
          setError(
            "Network error. Please check your internet connection and try again."
          );
        } else {
          setError(
            "Connection failed. The server might be temporarily unavailable."
          );
        }
      } else if (err.name === "AbortError") {
        setError("⏰ Request timed out. Please try again.");
      } else {
        setError("❌ An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 sm:py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-8 py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white text-center flex items-center justify-center">
              <FiLink className="mr-2" />
              Create Short URL
            </h1>
            <p className="text-blue-100 text-center mt-2 text-sm sm:text-base">
              Transform your long URLs into short, shareable links
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Long URL Input */}
              <div>
                <label
                  htmlFor="longUrl"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Long URL <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="longUrl"
                    type="text"
                    value={longUrl}
                    onChange={(e) => {
                      setLongUrl(e.target.value);
                      if (validationErrors.longUrl) {
                        setValidationErrors((prev) => ({
                          ...prev,
                          longUrl: "",
                        }));
                      }
                    }}
                    className={`w-full border rounded-lg p-3 sm:p-4 pr-10 sm:pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base ${
                      validationErrors.longUrl
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="https://example.com/very-long-url"
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
                {validationErrors.longUrl && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {validationErrors.longUrl}
                  </p>
                )}
              </div>

              {/* Custom Alias Input */}
              <div>
                <label
                  htmlFor="customAlias"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Custom Alias <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    id="customAlias"
                    type="text"
                    value={customAlias}
                    onChange={(e) => {
                      setCustomAlias(e.target.value);
                      // Clear validation errors when user types
                      if (validationErrors.customAlias) {
                        setValidationErrors((prev) => ({
                          ...prev,
                          customAlias: "",
                        }));
                      }
                      // Clear general error if it's related to custom alias
                      if (error && error.toLowerCase().includes("alias")) {
                        setError("");
                      }
                    }}
                    className={`w-full border rounded-lg p-4 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      validationErrors.customAlias
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="my-custom-link"
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
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                </div>
                {validationErrors.customAlias && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {validationErrors.customAlias}
                  </p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  Leave empty for auto-generated alias. Must be 3+ characters,
                  letters, numbers, hyphens, and underscores only.
                </p>
              </div>

              {/* Topic Selection */}
              <div>
                <label
                  htmlFor="topic"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Topic <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <select
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-4 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                    disabled={isLoading}
                  >
                    <option value="">Select a Topic (Optional)</option>
                    {topics.map((topicOption) => (
                      <option key={topicOption} value={topicOption}>
                        {topicOption}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
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
                      Creating...
                    </div>
                  ) : (
                    "✨ Create Short URL"
                  )}
                </button>

                {(shortUrl || longUrl || customAlias || topic) && (
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={isLoading}
                    className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    <FiRefreshCw className="mr-2" />
                    Reset
                  </button>
                )}
              </div>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
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

            {/* Success Result */}
            {shortUrl && (
              <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <div className="flex items-center mb-3">
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
                    <FiCheckCircle className="mr-2" />
                    Short URL Created Successfully!
                  </h3>
                </div>

                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <p className="text-sm text-gray-600 mb-1">
                        Your short URL:
                      </p>
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium break-all transition-colors duration-200"
                      >
                        {shortUrl}
                      </a>
                    </div>

                    <button
                      onClick={copyToClipboard}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        copied
                          ? "bg-green-100 text-green-700 border border-green-300"
                          : "bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200"
                      }`}
                    >
                      {copied ? (
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Copied!
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          Copy
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUrl;
