import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the provider
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import CreateUrl from "./components/CreateUrl";
import Login from "./components/Login";
import { MyContextProvider } from "./context/MyContext";

function App() {
  return (
    <MyContextProvider>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <Router>
          <div className="w-full">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createUrl" element={<CreateUrl />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </Router>
      </GoogleOAuthProvider>
    </MyContextProvider>
  );
}

export default App;
