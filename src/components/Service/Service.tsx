import { ChangeEvent } from "react";
import styles from "./Service.module.css";

interface ServiceProps {
  inputName: string;
  inputId: string;
  label: string;
  paragraph: string;
  monthlyPrice: number;
  yearlyPrice: number;
  monthlyOrYearly: string;
  onHandleChangeServices: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export function Service({ ...ServiceProps }: ServiceProps) {
  return (
    <div
      className={styles.service}
      onChange={ServiceProps.onHandleChangeServices}
    >
      <input
        className={styles.checkBox}
        type="checkbox"
        name={ServiceProps.inputName}
        id={ServiceProps.inputId}
        defaultChecked={ServiceProps.checked}
      />
      <div className={styles.serviceInfo}>
        <div className={styles.checkAndTitle}>
          <div></div>
          <div>
            <label htmlFor={ServiceProps.inputId}>{ServiceProps.label}</label>
            <p>{ServiceProps.paragraph}</p>
          </div>
        </div>

        <div>
          {ServiceProps.monthlyOrYearly === "Monthly" && (
            <span>+${ServiceProps.monthlyPrice}/mo</span>
          )}
          {ServiceProps.monthlyOrYearly === "Yearly" && (
            <span>+${ServiceProps.yearlyPrice}/yr</span>
          )}
        </div>
      </div>
    </div>
  );
}
