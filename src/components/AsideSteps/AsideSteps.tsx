// CSS
import styles from "./AsideSteps.module.css";

// React
import { useContext } from "react";

// Context
import { AppContext } from "../../contexts/AppContext";

// Interface
import { StepInterface } from "../../interfaces/Step";

interface AsideStepsProps {
  step: StepInterface;
}

export function AsideSteps({ step }: AsideStepsProps) {
  const appContext = useContext(AppContext);
  if (!appContext) return;
  const {} = appContext;

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
      </ul>
    </aside>
  );
}
