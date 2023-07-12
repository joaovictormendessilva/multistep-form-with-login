import styles from "./Container.module.css";

import { StepOne } from "../StepOne/StepOne";
import { AsideSteps } from "../AsideSteps/AsideSteps";

import { useContext, useState } from "react";
import { StepTwo } from "../StepTwo/StepTwo";
import { StepThree } from "../StepThree/StepThree";
import { StepFour } from "../StepFour/StepFour";
import { ThankYouStep } from "../ThankYouStep/ThankYouStep";
import { StepInterface } from "../../interfaces/Step";
import { LightBox } from "../LightBox/LightBox";
import { AppContext } from "../../contexts/AppContext";
import { useAuthContext } from "../../contexts/AuthContext";

export function Container() {
  const appContext = useContext(AppContext);
  if (!appContext) return;
  const { showLightBox } = appContext;

  const [step, setStep] = useState<StepInterface>({
    stepOne: true,
    stepTwo: false,
    stepThree: false,
    stepFour: false,
    thankYouStep: false,
  });

  const { isLogged } = useAuthContext()

  return (
    isLogged && <div className={styles.container}>
      <AsideSteps step={step} />

      <main>
        <form>
          {step.stepOne && <StepOne setStep={setStep} />}

          {step.stepTwo && <StepTwo setStep={setStep} />}

          {step.stepThree && <StepThree setStep={setStep} />}

          {step.stepFour && <StepFour setStep={setStep} />}

          {step.thankYouStep && <ThankYouStep />}
        </form>
      </main>
      {showLightBox && <LightBox />}
    </div>
  );
}
