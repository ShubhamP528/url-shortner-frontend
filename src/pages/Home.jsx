import { Link } from "react-router-dom";
import { useMyContext } from "../context/MyContext";
import { useState, useEffect } from "react";
import {
  FiZap,
  FiBarChart2,
  FiShield,
  FiTarget,
  FiPlay,
  FiPlus,
} from "react-icons/fi";

const Home = () => {
  const { userToken } = useMyContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: FiZap,
      title: "Lightning Fast",
      description: "Create short URLs in seconds with our optimized platform",
    },
    {
      icon: FiBarChart2,
      title: "Detailed Analytics",
      description:
        "Track clicks, locations, and user behavior with comprehensive insights",
    },
    {
      icon: FiShield,
      title: "Secure & Reliable",
      description: "Your links are protected with enterprise-grade security",
    },
    {
      icon: FiTarget,
      title: "Custom Aliases",
      description:
        "Create memorable, branded short links that reflect your identity",
    },
  ];

  const stats = [
    { number: "10M+", label: "URLs Shortened" },
    { number: "500K+", label: "Happy Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "150+", label: "Countries" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Floating Elements - Hidden on mobile for better performance */}
        <div className="hidden sm:block absolute top-20 left-10 w-16 h-16 lg:w-20 lg:h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="hidden md:block absolute top-40 right-20 w-12 h-12 lg:w-16 lg:h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="hidden lg:block absolute bottom-20 left-1/4 w-10 h-10 lg:w-12 lg:h-12 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Main Heading */}
            <div className="mb-6 sm:mb-8 lg:mb-12">
              <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                The Ultimate URL Shortener
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2 sm:px-0">
                Shorten URLs,
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Amplify
                </span>
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                Your Reach
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                Transform long, complex URLs into short, powerful links. Track
                performance, analyze engagement, and boost your digital presence
                with our advanced platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4 sm:px-0">
              {!userToken ? (
                <>
                  <Link
                    to="/login"
                    className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
                  >
                    <FiZap className="mr-2" />
                    Get Started Free
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                  <button className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-base sm:text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center w-full sm:w-auto">
                    <FiPlay className="mr-2" />
                    Watch Demo
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
                  >
                    <FiBarChart2 className="mr-2" />
                    Go to Dashboard
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                  <Link
                    to="/createUrl"
                    className="px-8 py-4 border-2 border-blue-300 text-blue-700 rounded-xl font-semibold text-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center"
                  >
                    <FiPlus className="mr-2" />
                    Create Short URL
                  </Link>
                </>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-6">Trusted by teams at</p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <div className="bg-gray-200 px-6 py-2 rounded-lg font-semibold text-gray-600">
                  TechCorp
                </div>
                <div className="bg-gray-200 px-6 py-2 rounded-lg font-semibold text-gray-600">
                  StartupXYZ
                </div>
                <div className="bg-gray-200 px-6 py-2 rounded-lg font-semibold text-gray-600">
                  DigitalAgency
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-0">
              Discover the powerful features that make us the preferred choice
              for businesses and individuals worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              How It Works
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Paste Your URL
              </h3>
              <p className="text-gray-600">
                Simply paste your long URL into our shortener tool
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Customize & Create
              </h3>
              <p className="text-gray-600">
                Add a custom alias and choose your preferred settings
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Share & Track
              </h3>
              <p className="text-gray-600">
                Share your short URL and monitor its performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our platform to manage their links
            and boost their online presence.
          </p>

          {!userToken ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
              >
                <FiZap className="mr-2" />
                Start Free Today
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                Learn More
              </button>
            </div>
          ) : (
            <Link
              to="/createUrl"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300"
            >
              <FiPlus className="mr-2" />
              Create Your First Short URL
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
