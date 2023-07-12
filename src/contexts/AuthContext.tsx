import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface IAuthContextProps {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setLocalStorageWithExpiration: (key: string, value: Object, expirationInMinutes: number) => void
}

interface IAuthContextProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }: IAuthContextProviderProps) {

  const [isLogged, setIsLogged] = useState<boolean>(false);

  // Função para armazenar dados no localStorage com uma data de expiração
  const setLocalStorageWithExpiration = useCallback((key: string, value: Object, expirationInMinutes: number) => {
    const expirationMs = expirationInMinutes * 60 * 1000; // Converter minutos para milissegundos
    const expirationTime = new Date().getTime() + expirationMs;
    const data = {
      value: value,
      expirationTime: expirationTime,
    };
    localStorage.setItem(key, JSON.stringify(data));
  }, [])

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
    getLocalStorageWithExpiration("session");
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, setLocalStorageWithExpiration }}>
      {children}
    </AuthContext.Provider>
  )
}