// CSS
import styles from "./RegisterForm.module.css";

// React
import { useState, ChangeEvent } from "react";

// Images
import userIcon from "../../assets/userIcon.svg";
import passwordIcon from "../../assets/lock-key.svg";
import atIcon from "../../assets/at.svg";
import eyeIcon from "../../assets/eye.svg";
import slashEyeIcon from "../../assets/eye-slash.svg";

interface RegisterFormProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

// Components
import { SystemMessages } from "../SystemMessages/SystemMessages";
import { useCreateUser } from "../../hooks/useCreateUser";

export function RegisterForm({ setToggle }: RegisterFormProps) {

  const { changeNewUser, setChangeNewUser, message, handleCreateUser } = useCreateUser()

  const [showPassword, setShowPassword] = useState({
    type: "password",
    show: false,
  });

  const handleChangeNewUser = (e: ChangeEvent<HTMLInputElement>) => {
    setChangeNewUser((prev) => ({
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
            onChange={handleChangeNewUser}
            value={changeNewUser.username || ''}
          />
          <img
            className={styles.formIcon}
            src={userIcon}
            alt="Ícone do campo de usuário"
          />
        </div>

        <div className={styles.formControl}>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Type your email"
            onChange={handleChangeNewUser}
            value={changeNewUser.email || ''}
          />
          <img
            className={styles.formIcon}
            src={atIcon}
            alt="Ícone do campo de email"
          />
        </div>

        <div className={styles.formControl}>
          <input
            id="password"
            name="password"
            type={showPassword.type}
            placeholder="Type your password"
            onChange={handleChangeNewUser}
            value={changeNewUser.password || ''}
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
        <div className={styles.formControl}>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword.type}
            placeholder="Confirm your password"
            onChange={handleChangeNewUser}
            value={changeNewUser.confirmPassword || ''}
          />
          <img
            className={styles.formIcon}
            src={passwordIcon}
            alt="Ícone do campo de confirmação de senha"
          />

          {showPassword.show ? (
            <img
              className={styles.formIconPassword}
              src={slashEyeIcon}
              alt="Ícone de ocultar visualização da confirmação de senha"
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
            onClick={handleCreateUser}
            className={styles.LoginAndRegisterButton}
          >
            Register
          </button>
        </div>
      </div>

      <footer>
        <button onClick={() => setToggle(false)}>
          I already have an account
        </button>
      </footer>
    </>
  );
}
