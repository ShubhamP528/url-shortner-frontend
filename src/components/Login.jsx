// Login.js
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { NODE_END_POINT } from "../utils/utils";
import { useMyContext } from "../context/MyContext";

const Login = () => {
  const navigate = useNavigate();
  const { userToken, setUserToken } = useMyContext();

  const handleLoginSuccess = async (response) => {
    const { credential } = response;
    console.log(credential);
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
      console.error(
        "Failed to fetch user:",
        errorData.message || "Failed to authenticate user."
      );
      return;
    }
    const user = await fetchUser.json();
    console.log("User fetched successfully:", user);
    localStorage.setItem("auth_access_token", user.accessToken);
    setUserToken(user.accessToken);

    navigate("/dashboard");
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed: ", error);
  };
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);

  if (userToken) {
    navigate("/dashboard");
  }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex justify-center items-center h-screen bg-white">
        {/* Adjusted the div for responsiveness */}
        <div className="bg-blue-200 p-6 sm:p-8 rounded-lg shadow-xl w-full sm:w-96 max-w-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-4 sm:mb-6">
            Sign in with Google
          </h1>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
              useOneTap
              theme="outline"
              shape="circle"
              size="large"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
