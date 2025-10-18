import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from  "axios";

export const StoreContext = createContext(null);


const StoreContextProvider = (props) => {
  const [url, setUrl] = useState("http://localhost:5000");
   const [token, setToken] = useState("");

   const contextValue = {
    url,
    token,
    setToken,
   };

    useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

     return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>    
  );
}

export default StoreContextProvider