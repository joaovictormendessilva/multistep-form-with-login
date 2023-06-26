import styles from "./Buttons.module.css";

import { FormEvent } from "react";

interface ButtonsProps {
  value: "Next Step" | "Confirm";
  onClick?: (e: FormEvent) => void;
  onHandleBackPage?: () => void;
  show?: boolean;
}

export function Buttons({
  value,
  onClick,
  show = true,
  onHandleBackPage,
}: ButtonsProps) {
  return (
    <div className={styles.buttons}>
      {show ? (
        <button onClick={onHandleBackPage} className={styles.prevButton}>
          Go Back
        </button>
      ) : (
        <div></div>
      )}

      <button
        className={
          value === "Next Step" ? styles.nextButton : styles.confirmButton
        }
        onClick={onClick}
      >
        {value}
      </button>
    </div>
  );
}
