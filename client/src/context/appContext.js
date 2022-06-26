import { createContext, useState } from "react";

export const appContext = createContext();

function ContextProvider({ children }) {
  const [token , setToken] = useState(null); 
  

  const value = {
    token,
    setToken
  }

  return (
    <appContext.Provider value={value}>
      {children}
    </appContext.Provider>
  );
}

export default ContextProvider;