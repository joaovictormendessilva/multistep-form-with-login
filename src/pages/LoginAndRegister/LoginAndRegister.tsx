import styles from "./LoginAndRegister.module.css";

import { useState } from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";

export function LoginAndRegister() {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className={styles.loginAndRegister}>
      <div className={styles.loginAndRegisterContainer}>
        {!toggle && (
          <>
            <h1>Login</h1>
            <LoginForm setToggle={setToggle} />
          </>
        )}

        {toggle && (
          <>
            <h1>Register</h1>
            <RegisterForm setToggle={setToggle} />
          </>
        )}
      </div>
    </div>
  );
}
