// CSS
import styles from "./App.module.css";

// Components
import { Container } from "./components/Container/Container";

// Pages
import { LoginAndRegister } from "./pages/LoginAndRegister/LoginAndRegister";

// Context API
import { AppContextProvider } from "./contexts/AppContext";

import { useState, createContext, useEffect } from "react";

interface IAuthContext {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  // Função para obter dados do localStorage, verificando a data de expiração
  function getLocalStorageWithExpiration(key: string) {
    const data = localStorage.getItem(key);
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData.expirationTime > new Date().getTime()) {
        return setIsLogged(true);
      } else {
        localStorage.removeItem(key);
        setIsLogged(false);
      }
    }
    return null;
  }

  useEffect(() => {
    getLocalStorageWithExpiration("logado");
  });

  return (
    <div className={styles.app}>
      <AuthContext.Provider value={{ isLogged, setIsLogged }}>
        {!isLogged && <LoginAndRegister />}
        <AppContextProvider>{isLogged && <Container />}</AppContextProvider>
      </AuthContext.Provider>
    </div>
  );
}
