import { useState } from "react";
import { NODE_END_POINT } from "../utils/utils";
import { useMyContext } from "../context/MyContext";

const CreateUrl = () => {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [topic, setTopic] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    if (!longUrl) {
      setError("Please enter a long URL.");
      return;
    }

    try {
      const response = await fetch(`${NODE_END_POINT}/urls/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          longUrl,
          customAlias: customAlias || undefined,
          topic: topic || undefined,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortUrl(data.shortUrl);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create short URL.");
      }
    } catch (err) {
      console.error("Error creating short URL:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        Create a Short URL
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="longUrl"
            className="block text-gray-700 font-semibold mb-2"
          >
            Long URL:
          </label>
          <input
            id="longUrl"
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter the long URL"
          />
        </div>

        <div>
          <label
            htmlFor="customAlias"
            className="block text-gray-700 font-semibold mb-2"
          >
            Custom Alias (Optional):
          </label>
          <input
            id="customAlias"
            type="text"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter a custom alias (optional)"
          />
        </div>

        <div>
          <label
            htmlFor="topic"
            className="block text-gray-700 font-semibold mb-2"
          >
            Topic (Optional):
          </label>
          <select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="">Select a Topic (Optional)</option>
            {topics.map((topicOption) => (
              <option key={topicOption} value={topicOption}>
                {topicOption}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            Create Short URL
          </button>
        </div>
      </form>

      {error && (
        <p className="text-red-600 mt-4 text-center text-sm sm:text-base">
          {error}
        </p>
      )}

      {shortUrl && (
        <div className="mt-6 text-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Short URL:
          </h2>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default CreateUrl;
