import { Link } from "react-router-dom";
import { useMyContext } from "../context/MyContext";
import { FaArrowRight, FaLink } from "react-icons/fa";

const Home = () => {
  const { userToken, setUserToken } = useMyContext();

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black opacity-40"></div>{" "}
      {/* Overlay for background */}
      <div className="relative text-center text-white z-10 px-4 sm:px-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Welcome to URL Shortener
        </h1>
        <p className="text-lg sm:text-xl mb-6 text-gray-200 animate__animated animate__fadeIn animate__delay-2s">
          Simplify your URLs and unlock detailed analytics for better insights.
        </p>

        <p className="italic text-lg sm:text-xl mb-8 text-gray-200 animate__animated animate__fadeIn animate__delay-3s">
          "Shorten your URL, amplify your reach!"
        </p>

        <div className="space-x-4">
          {!userToken ? (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition duration-300 transform hover:scale-105 inline-flex items-center justify-center animate__animated animate__bounceIn animate__delay-4s"
            >
              <FaArrowRight className="mr-2" />
              Start Now
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition duration-300 transform hover:scale-105 inline-flex items-center justify-center animate__animated animate__bounceIn animate__delay-4s"
            >
              <FaLink className="mr-2" />
              Go to Dashboard
            </Link>
          )}
        </div>

        {/* Decorative icon for added visual appeal */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate__animated animate__zoomIn animate__delay-5s">
          <FaLink className="text-white text-6xl" />
        </div>
      </div>
    </div>
  );
};

export default Home;
