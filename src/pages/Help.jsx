import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiSearch,
  FiHelpCircle,
  FiBook,
  FiMessageCircle,
} from "react-icons/fi";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("getting-started");

  const categories = [
    { id: "getting-started", label: "Getting Started", icon: FiBook },
    { id: "features", label: "Features", icon: FiHelpCircle },
    { id: "troubleshooting", label: "Troubleshooting", icon: FiMessageCircle },
  ];

  const faqs = {
    "getting-started": [
      {
        question: "How do I create my first short URL?",
        answer:
          "Navigate to the 'Create URL' page, paste your long URL, optionally add a custom alias, and click 'Create Short URL'.",
      },
      {
        question: "Do I need to create an account?",
        answer:
          "Yes, you need to sign in with Google to create and manage your short URLs and access analytics.",
      },
      {
        question: "Is the service free?",
        answer:
          "Yes! Our basic service is completely free with generous limits for personal and small business use.",
      },
    ],
    features: [
      {
        question: "What analytics are available?",
        answer:
          "You can track total clicks, unique users, click-by-date trends, operating system analytics, and more.",
      },
      {
        question: "Can I customize my short URLs?",
        answer:
          "Yes! You can create custom aliases to make your short URLs more memorable and branded.",
      },
      {
        question: "What topics can I categorize my URLs with?",
        answer:
          "You can choose from categories like Technology, Business, Entertainment, Sports, Education, and more.",
      },
    ],
    troubleshooting: [
      {
        question: "My short URL isn't working. What should I do?",
        answer:
          "Check that your original URL is valid and accessible. If the problem persists, contact our support team.",
      },
      {
        question: "I can't see my analytics. Why?",
        answer:
          "Make sure you're logged in and that the URL alias you're searching for exists and belongs to your account.",
      },
      {
        question: "How do I delete a short URL?",
        answer:
          "Currently, URLs cannot be deleted but they can be deactivated. Contact support if you need a URL removed.",
      },
    ],
  };

  const filteredFaqs = faqs[activeCategory].filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions and learn how to make the most of
            URL Shortener.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                      activeCategory === category.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <category.icon className="mr-3" />
                    {category.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {categories.find((cat) => cat.id === activeCategory)?.label}
              </h2>

              <div className="space-y-6">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FiSearch className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">
                      No results found for "{searchQuery}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Still Need Help */}
            <div className="mt-8 bg-blue-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Still need help?
              </h3>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Our support team is here to
                help.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <FiMessageCircle className="mr-2" />
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
