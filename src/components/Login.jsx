import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import { NODE_END_POINT } from "../utils/utils";
import { useMyContext } from "../context/MyContext";
import { useState, useEffect } from "react";
import {
  FiLink,
  FiCheck,
  FiShield,
  FiArrowLeft,
  FiCircle,
} from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const { userToken, setUserToken } = useMyContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Redirect if already logged in
    if (userToken) {
      navigate("/dashboard");
    }
  }, [userToken, navigate]);

  const handleLoginSuccess = async (response) => {
    const { credential } = response;
    setIsLoading(true);
    setError("");

    try {
      const fetchUser = await fetch(`${NODE_END_POINT}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credential,
        }),
      });

      if (!fetchUser.ok) {
        const errorData = await fetchUser.json();
        const errorMessage =
          errorData.error?.message ||
          errorData.message ||
          "Authentication failed";
        setError(`❌ ${errorMessage}`);
        return;
      }

      const user = await fetchUser.json();
      localStorage.setItem("auth_access_token", user.accessToken);
      setUserToken(user.accessToken);

      // Success feedback before navigation
      setError(""); // Clear any previous errors
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      console.error("Login error:", err);
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("❌ An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
    setError("❌ Google authentication failed. Please try again.");
    setIsLoading(false);
  };

  // Don't render if already logged in
  if (userToken) {
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-2000"></div>

        <div
          className={`relative w-full max-w-md transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Main Login Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-8 py-8 sm:py-10 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FiLink className="text-2xl sm:text-3xl text-blue-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Welcome Back!
              </h1>
              <p className="text-blue-100 text-base sm:text-lg">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Content Section */}
            <div className="px-6 sm:px-8 py-8 sm:py-10">
              {/* Benefits List */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 text-center">
                  What you'll get access to:
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center text-gray-600">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                      <FiCheck className="text-green-600 text-xs sm:text-sm" />
                    </div>
                    <span className="text-sm sm:text-base">
                      Create unlimited short URLs
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span>Detailed analytics and insights</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span>Custom aliases and branding</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span>Advanced link management</span>
                  </div>
                </div>
              </div>

              {/* Google Login Section */}
              <div className="text-center">
                <div className="mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500 font-medium">
                        Sign in with
                      </span>
                    </div>
                  </div>
                </div>

                {/* Google Login Button Container */}
                <div className="flex justify-center mb-6">
                  <div
                    className={`transition-all duration-300 ${
                      isLoading ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    <GoogleLogin
                      onSuccess={handleLoginSuccess}
                      onError={handleLoginFailure}
                      useOneTap={false}
                      theme="outline"
                      shape="rectangular"
                      size="large"
                      width="280"
                      text="signin_with"
                    />
                  </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="flex items-center justify-center mb-4">
                    <svg
                      className="animate-spin h-5 w-5 text-blue-600 mr-2"
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
                    <span className="text-blue-600 font-medium">
                      Signing you in...
                    </span>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
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
                      <p className="text-red-700 font-medium text-sm">
                        {error}
                      </p>
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-gray-400 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Secure Login:</span> We
                        use Google's secure authentication. Your credentials are
                        never stored on our servers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back to Home Link */}
                <Link
                  to="/"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Info Card */}
          <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-2">
              New to URL Shortener?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Join thousands of users who trust our platform to manage their
              links and boost their online presence.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Free to use
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                No setup required
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Instant access
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
