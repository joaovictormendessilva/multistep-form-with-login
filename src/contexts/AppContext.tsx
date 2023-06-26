import { createContext, useState } from "react";

import { serviceData } from "../data/serviceData";

import { Order } from "../interfaces/Order";
import { StepOneFields } from "../interfaces/StepOneFields";
import { StepThreeFields } from "../interfaces/StepThreeFields";
import { StepTwoFields } from "../interfaces/StepTwoFields";

interface IAppContext {
  stepOneFields: StepOneFields;
  setStepOneFields: React.Dispatch<React.SetStateAction<StepOneFields>>;
  stepTwoFields: StepTwoFields;
  setStepTwoFields: React.Dispatch<React.SetStateAction<StepTwoFields>>;
  selectedPlan: string;
  setSelectedPlan: React.Dispatch<React.SetStateAction<string>>;
  monthlyOrYearly: string;
  setMonthlyOrYearly: React.Dispatch<React.SetStateAction<string>>;
  stepThreeFields: StepThreeFields[];
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  showLightBox: boolean;
  setShowLightBox: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IAppContextProvider {
  children: React.ReactNode;
}

export const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({ children }: IAppContextProvider) => {
  const [stepOneFields, setStepOneFields] = useState<StepOneFields>(
    {} as StepOneFields
  );

  const [stepTwoFields, setStepTwoFields] = useState<StepTwoFields>(
    {} as StepTwoFields
  );

  const [selectedPlan, setSelectedPlan] = useState<string>("Arcade");
  const [monthlyOrYearly, setMonthlyOrYearly] = useState<string>("Monthly");

  const stepThreeFields: StepThreeFields[] = serviceData;

  const [order, setOrder] = useState<Order>({} as Order);

  const [showLightBox, setShowLightBox] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        stepOneFields,
        setStepOneFields,
        stepTwoFields,
        setStepTwoFields,
        selectedPlan,
        setSelectedPlan,
        monthlyOrYearly,
        setMonthlyOrYearly,
        stepThreeFields,
        order,
        setOrder,
        showLightBox,
        setShowLightBox,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
