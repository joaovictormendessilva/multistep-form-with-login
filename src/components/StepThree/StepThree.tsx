// React
import { useContext, ChangeEvent } from "react";

// Components
import { Buttons } from "../Buttons/Buttons";
import { Header } from "../Header/Header";
import { Service } from "../Service/Service";

// Context API
import { AppContext } from "../../contexts/AppContext";

// Interface
import { StepInterface } from "../../interfaces/Step";

interface StepThreeProps {
  setStep: React.Dispatch<React.SetStateAction<StepInterface>>;
}

export function StepThree({ setStep }: StepThreeProps) {
  const appContext = useContext(AppContext);
  if (!appContext) return;
  const { monthlyOrYearly, stepThreeFields } = appContext;

  const handleChangeServices = (e: ChangeEvent<HTMLInputElement>) => {
    stepThreeFields.map((service) => {
      if (e.target.name === service.inputName) {
        service.checked = !service.checked;
      }
    });
  };

  const handleBackPage = () => {
    setStep((prev) => ({
      ...prev,
      stepTwo: true,
      stepThree: false,
    }));
  };

  const onHandleNextPage = () => {
    setStep((prev) => ({
      ...prev,
      stepThree: false,
      stepFour: true,
    }));
  };

  return (
    <div>
      <Header
        title="Pick add-ons"
        paragraph="Add-ons gelp enhance your gaming experience."
      />

      {stepThreeFields.map((service) => {
        return (
          <Service
            key={service.id}
            inputId={service.inputId}
            inputName={service.inputName}
            label={service.label}
            paragraph={service.paragraph}
            monthlyPrice={service.monthlyPrice}
            yearlyPrice={service.yearlyPrice}
            monthlyOrYearly={monthlyOrYearly}
            onHandleChangeServices={handleChangeServices}
            checked={service.checked === true}
          />
        );
      })}

      <Buttons
        show={true}
        value="Next Step"
        onHandleBackPage={handleBackPage}
        onClick={onHandleNextPage}
      />
    </div>
  );
}
