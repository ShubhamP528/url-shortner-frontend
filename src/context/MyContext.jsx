// MyContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const MyContext = createContext();

// Create a provider component
export const MyContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");
  useEffect(() => {
    // Fetch user information from backend and store it in local storage
    const user = localStorage.getItem("auth_access_token");
    console.log(user);
    if (user) {
      setUserToken(user);
    }
  }, []);

  return (
    <MyContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </MyContext.Provider>
  );
};

// Create a custom hook to use the context
export const useMyContext = () => useContext(MyContext);
