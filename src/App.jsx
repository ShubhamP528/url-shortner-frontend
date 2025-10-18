import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the provider
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Privacy from "./pages/Privacy";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateUrl from "./components/CreateUrl";
import Login from "./components/Login";
import { MyContextProvider } from "./context/MyContext";

function App() {
  return (
    <MyContextProvider>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <Router>
          <div className="w-full min-h-screen bg-gray-50">
            <Header />
            <main className="w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/createUrl" element={<CreateUrl />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/help" element={<Help />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </GoogleOAuthProvider>
    </MyContextProvider>
  );
}

export default App;
