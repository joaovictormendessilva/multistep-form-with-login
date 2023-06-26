// CSS
import styles from "./ThankYouStep.module.css";

// Images
import thankYouIcon from "../../assets/icon-thank-you.svg";

import { useContext, FormEvent } from "react";

// Context
import { AppContext } from "../../contexts/AppContext";

export function ThankYouStep() {
  const appContext = useContext(AppContext);
  if (!appContext) return;
  const { setShowLightBox } = appContext;

  return (
    <div className={styles.thankYouStep}>
      <div className={styles.content}>
        <img src={thankYouIcon} alt="Ícone de confirmado" />
        <h2>Thank you!</h2>
        <p>
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          as support@loremgaming.com.
        </p>
        <button
          className={styles.showOrderButton}
          onClick={(e: FormEvent) => {
            e.preventDefault();
            setShowLightBox(true);
          }}
        >
          Show Order
        </button>
      </div>
    </div>
  );
}
