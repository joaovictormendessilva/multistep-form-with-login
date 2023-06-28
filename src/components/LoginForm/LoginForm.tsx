// CSS
import styles from "./LoginForm.module.css";

// React
import { useState, ChangeEvent, useContext } from "react";

// Images
import userIcon from "../../assets/userIcon.svg";
import passwordIcon from "../../assets/lock-key.svg";
import eyeIcon from "../../assets/eye.svg";
import slashEyeIcon from "../../assets/eye-slash.svg";

// Interface
import { User } from "../../interfaces/User";

interface LoginFormProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

// Data
import { users } from "../../data/usersData";

// Context API
import { AuthContext } from "../../App";

export function LoginForm({ setToggle }: LoginFormProps) {
  const [user, setUser] = useState<User>({} as User);
  const [showPassword, setShowPassword] = useState({
    type: "password",
    show: false,
  });

  const authContext = useContext(AuthContext);
  if (!authContext) return;
  const { setIsLogged } = authContext;

  const handleChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleToggleShowPassword = () => {
    if (showPassword.type === "password") {
      setShowPassword((prev) => ({
        ...prev,
        type: "text",
        show: true,
      }));
    } else {
      setShowPassword((prev) => ({
        ...prev,
        type: "password",
        show: false,
      }));
    }
  };

  const data = users;

  const handleCheckLogin = () => {
    if (user.username && user.password) {
      const approveduser = data.filter((userData) => {
        return (
          userData.username === user.username &&
          userData.password === user.password
        );
      });

      setLocalStorageWithExpiration("session", approveduser, 1);

      if (approveduser.length > 0) {
        setIsLogged(true);
      } else {
        alert("Usuário ou senha incorretos!");
      }
    }
  };

  // ////////////////////////////////////////////////////////////////////////////////////////
  // Função para armazenar dados no localStorage com uma data de expiração
  function setLocalStorageWithExpiration(
    key: string,
    value: typeof data,
    expirationInMinutes: number
  ) {
    const expirationMs = expirationInMinutes * 60 * 1000; // Converter minutos para milissegundos
    const expirationTime = new Date().getTime() + expirationMs;
    const data = {
      value: value,
      expirationTime: expirationTime,
    };
    localStorage.setItem(key, JSON.stringify(data));
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className={styles.inputBox}>
        <div className={styles.formControl}>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Type your username"
            onChange={handleChangeUser}
          />
          <img
            className={styles.formIcon}
            src={userIcon}
            alt="Ícone do campo de usuário"
          />
        </div>

        <div className={styles.formControl}>
          <input
            id="password"
            name="password"
            type={showPassword.type}
            placeholder="Type your password"
            onChange={handleChangeUser}
          />
          <img
            className={styles.formIcon}
            src={passwordIcon}
            alt="Ícone do campo de senha"
          />

          {showPassword.show ? (
            <img
              className={styles.formIconPassword}
              src={slashEyeIcon}
              alt="Ícone de ocultar senha"
              onClick={handleToggleShowPassword}
            />
          ) : (
            <img
              className={styles.formIconPassword}
              src={eyeIcon}
              alt="Ícone de visualizar senha"
              onClick={handleToggleShowPassword}
            />
          )}
        </div>

        <div className={styles.buttonContainer}>
          <button
            onClick={handleCheckLogin}
            className={styles.LoginAndRegisterButton}
          >
            Login
          </button>
        </div>
      </div>

      <footer>
        <button onClick={() => setToggle(true)}>Create an account</button>
      </footer>
    </>
  );
}
