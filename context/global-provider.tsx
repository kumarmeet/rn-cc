import { getCurrentUser } from "@/lib/appwrite";
import React, { createContext, useContext, useEffect, useState } from "react";

interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: Object | null;
  setUser: React.Dispatch<React.SetStateAction<Object>>;
  isLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => { },
  user: null,
  setUser: () => { },
  isLoading: true,
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          console.log(res)
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getCurrentUser]);

  return (
    <GlobalContext.Provider value={{
      isLoading,
      isLoggedIn,
      setIsLoggedIn,
      setUser,
      user
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
