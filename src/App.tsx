// CSS
import styles from "./App.module.css";

// Components
import { Container } from "./components/Container/Container";

// Pages
import { LoginAndRegister } from "./pages/LoginAndRegister/LoginAndRegister";

// Context API
import { AppContextProvider } from "./contexts/AppContext";

import { AuthContextProvider } from "./contexts/AuthContext";

export function App() {

  return (
    <div className={styles.app}>
      <AuthContextProvider>
        <AppContextProvider>

          <LoginAndRegister />
          <Container />

        </AppContextProvider>
      </AuthContextProvider>
    </div>
  );
}
