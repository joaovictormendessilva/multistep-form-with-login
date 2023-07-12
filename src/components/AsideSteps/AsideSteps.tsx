// CSS
import styles from "./AsideSteps.module.css";

// Images
import signOutIcon from "../../assets/sign-out.svg";

// Interface
import { StepInterface } from "../../interfaces/Step";

// Context
import { useAuthContext } from "../../contexts/AuthContext";

interface AsideStepsProps {
  step: StepInterface;
}

export function AsideSteps({ step }: AsideStepsProps) {

  const { setIsLogged } = useAuthContext()

  const handleLogout = () => {
    localStorage.removeItem("session");
    setIsLogged(false);
  };

  return (
    <aside className={styles.asideSteps}>
      <ul>
        <li>
          <div>
            <button className={`${step.stepOne === true && styles.activeStep}`}>
              1
            </button>
          </div>
          <div className={styles.stepLabels}>
            <p>STEP 1</p>
            <b>YOUR INFO</b>
          </div>
        </li>

        <li>
          <div>
            <button className={`${step.stepTwo === true && styles.activeStep}`}>
              2
            </button>
          </div>
          <div className={styles.stepLabels}>
            <p>STEP 2</p>
            <b>SELECT PLAN</b>
          </div>
        </li>

        <li>
          <div>
            <button
              className={`${step.stepThree === true && styles.activeStep}`}
            >
              3
            </button>
          </div>
          <div className={styles.stepLabels}>
            <p>STEP 3</p>
            <b>ADD-ONS</b>
          </div>
        </li>

        <li>
          <div>
            <button
              className={`${step.stepFour === true && styles.activeStep}`}
            >
              4
            </button>
          </div>
          <div className={styles.stepLabels}>
            <p>STEP 4</p>
            <b>SUMMARY</b>
          </div>
        </li>

        <li className={styles.logoutButton}>
          <div>
            <a href="/" onClick={handleLogout}>
              <img src={signOutIcon} alt="Ícone de sair" />
              Logout
            </a>
          </div>
        </li>
      </ul>
    </aside>
  );
}
