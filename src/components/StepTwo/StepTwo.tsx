// React
import { ChangeEvent, useContext, FormEvent } from "react";

// CSS
import styles from "./StepTwo.module.css";

// Components
import { Header } from "../Header/Header";
import { Card } from "../Card/Card";
import { Buttons } from "../Buttons/Buttons";

// Context
import { AppContext } from "../../contexts/AppContext";
import { cardData } from "../../data/cardData";
import { StepTwoFields } from "../../interfaces/StepTwoFields";
import { StepInterface } from "../../interfaces/Step";

interface StepTwoProps {
  setStep: React.Dispatch<React.SetStateAction<StepInterface>>;
}

export function StepTwo({ setStep }: StepTwoProps) {
  const appContext = useContext(AppContext);
  if (!appContext) return;
  const {
    setStepTwoFields,
    selectedPlan,
    setSelectedPlan,
    monthlyOrYearly,
    setMonthlyOrYearly,
  } = appContext;

  const handleChangeMonthlyOrYearly = (e: ChangeEvent<HTMLInputElement>) => {
    const monthlyOrYearly = e.target.checked ? "Yearly" : "Monthly";

    setMonthlyOrYearly(monthlyOrYearly);
  };

  const handleChangePlan = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedPlan(e.target.value);
  };

  const handleCheckFields = (e: FormEvent) => {
    e.preventDefault();

    const pricePlan =
      monthlyOrYearly === "Monthly"
        ? cardData.find((card) => card.label === selectedPlan)!.monthlyPrice
        : cardData.find((card) => card.label === selectedPlan)!.yearlyPrice;

    const values: StepTwoFields = {
      plan: selectedPlan,
      monthlyOrYearly: monthlyOrYearly,
      planPrice: pricePlan,
    };

    setStepTwoFields(values);

    setStep((prev) => ({
      ...prev,
      stepTwo: false,
      stepThree: true,
    }));
  };

  const handleBackPage = () => {
    setStep((prev) => ({
      ...prev,
      stepOne: true,
      stepTwo: false,
    }));
  };

  return (
    <div className={styles.stepTwo}>
      <Header
        title="Select your plan"
        paragraph="You have the option of monthly or yearly billing."
      />

      <div className={styles.cardGroup} onChange={handleChangePlan}>
        {cardData.map((card) => (
          <Card
            key={card.id}
            idInput={card.idInput}
            image={card.image}
            imageAlt={card.imageAlt}
            label={card.label}
            checked={selectedPlan === card.label}
            labelHtmlFor={card.labelHtmlFor}
            monthlyOrYearly={monthlyOrYearly}
            removeControlledMessage={() => {}}
            value={card.value}
            monthlyPrice={card.monthlyPrice}
            yearlyPrice={card.yearlyPrice}
          />
        ))}
      </div>

      <div className={styles.plans}>
        <b>Monthly</b>
        <label className={styles.switch}>
          <input
            type="checkbox"
            id="monthlyOrYearly"
            name="monthlyOrYearly"
            onChange={handleChangeMonthlyOrYearly}
            defaultChecked={monthlyOrYearly === "Monthly" ? false : true}
          />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
        <b>Yearly</b>
      </div>
      <Buttons
        value="Next Step"
        onClick={handleCheckFields}
        onHandleBackPage={handleBackPage}
      />
    </div>
  );
}
