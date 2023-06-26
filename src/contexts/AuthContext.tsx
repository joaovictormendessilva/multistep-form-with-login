import { createContext, useState } from "react";

interface IAuthContext {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IAuthContextProvider {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function AuthContextProvider({ children }: IAuthContextProvider) {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
}
