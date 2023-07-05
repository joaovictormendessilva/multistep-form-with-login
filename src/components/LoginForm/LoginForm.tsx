// CSS
import styles from "./LoginForm.module.css";

// React
import { useState, ChangeEvent, useContext, useEffect } from "react";

// Images
import userIcon from "../../assets/userIcon.svg";
import passwordIcon from "../../assets/lock-key.svg";
import eyeIcon from "../../assets/eye.svg";
import slashEyeIcon from "../../assets/eye-slash.svg";

// Interface
import { User } from "../../interfaces/User";
import { MessageProps } from "../../interfaces/Message";

interface LoginFormProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

// Data
// import { users } from "../../data/usersData";

// Context API
import { AuthContext } from "../../App";

// Axios
import axios from "axios";
import { SystemMessages } from "../SystemMessages/SystemMessages";

// API
const api = import.meta.env.VITE_API

export function LoginForm({ setToggle }: LoginFormProps) {
  const [userData, setUserData] = useState({
    username: "",
    password: ""
  })
  const [user, setUser] = useState<User>({} as User);
  const [showPassword, setShowPassword] = useState({
    type: "password",
    show: false,
  });
  const [message, setMessage] = useState<MessageProps>({} as MessageProps)

  const authContext = useContext(AuthContext);
  if (!authContext) return;
  const { setIsLogged } = authContext;

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

  const handleCheckLogin = async () => {
    if (userData.username && userData.password) {

      await axios.post(`${api}/entrar/`, {
        Username: userData.username,
        Password: userData.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {

          if (response.status === 200) {
            setMessage((prevValue) => ({
              ...prevValue,
              message: response.data.Message,
              type: response.data.StatusCode
            }))

            setUser((prevValue) => ({
              ...prevValue,
              username: userData.username,
              securityToken: response.data.SecurityToken,
              expiration: response.data.Expiration
            }))

            setInterval(() => {
              setIsLogged(true)
            }, 1000)

          }

        })
        .catch((error) => {
          if (error.response.data.StatusCode === 401) {
            setMessage((prevValue) => ({
              ...prevValue,
              message: error.response.data.Message,
              type: error.response.data.StatusCode
            }))
          }
          // console.log(error)
        })
    }
    else {
      setMessage((prevValue) => ({
        ...prevValue,
        message: "Os campos são obrigatórios!",
        type: 422
      }))
    }
  }

  useEffect(() => {
    if (user.username) {
      setLocalStorageWithExpiration("session", user, 1);
    }
  }, [user])

  // ////////////////////////////////////////////////////////////////////////////////////////
  // Função para armazenar dados no localStorage com uma data de expiração
  function setLocalStorageWithExpiration(
    key: string,
    value: typeof user,
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
