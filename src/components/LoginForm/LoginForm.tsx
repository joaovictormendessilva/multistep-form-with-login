// CSS
import styles from "./LoginForm.module.css";

// React
import { useState, ChangeEvent, useEffect } from "react";

// Images
import userIcon from "../../assets/userIcon.svg";
import passwordIcon from "../../assets/lock-key.svg";
import eyeIcon from "../../assets/eye.svg";
import slashEyeIcon from "../../assets/eye-slash.svg";


interface LoginFormProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

import { SystemMessages } from "../SystemMessages/SystemMessages";
import { useCheckLogin } from "../../hooks/useCheckLogin";
import { useAuthContext } from "../../contexts/AuthContext";


export function LoginForm({ setToggle }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState({
    type: "password",
    show: false,
  });

  const { setUserData, user, message, handleCheckLogin } = useCheckLogin();
  const { setLocalStorageWithExpiration } = useAuthContext();

  const handleChangeUserData = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
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
    }
    else {
      setShowPassword((prev) => ({
        ...prev,
        type: "password",
        show: false,
      }));
    }
  };

  useEffect(() => {
    if (user.username) {
      setLocalStorageWithExpiration("session", user, 1);
    }
  }, [user])

  return (
    <>

      <SystemMessages message={message} />

      <div className={styles.inputBox}>
        <div className={styles.formControl}>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Type your username"
            onChange={handleChangeUserData}
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
            onChange={handleChangeUserData}
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
