// CSS
import styles from "./StepOne.module.css";

// Components
import { FormControl } from "../FormControl/FormControl";
import { Buttons } from "../Buttons/Buttons";
import { Header } from "../Header/Header";

// React
import { ChangeEvent, useContext, FormEvent, useState, useEffect } from "react";

// Context
import { AppContext } from "../../contexts/AppContext";

// Interface
import { StepInterface } from "../../interfaces/Step";

interface StepOneProps {
  setStep: React.Dispatch<React.SetStateAction<StepInterface>>;
}

export function StepOne({ setStep }: StepOneProps) {
  const [emptyName, setEmptyName] = useState<boolean>(false);
  const [emptyEmail, setEmptyEmail] = useState<boolean>(false);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [emptyPhone, setEmptyPhone] = useState<boolean>(false);

  const appContext = useContext(AppContext);
  if (!appContext) return;
  const { setStepOneFields, stepOneFields } = appContext;

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setStepOneFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const checkFieldsStepOne = (e: FormEvent) => {
    e.preventDefault();

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = regex.test(stepOneFields.email);

    const isNameEmpty =
      stepOneFields.name === undefined || stepOneFields.name === "";

    const isEmailEmpty =
      stepOneFields.email === undefined || stepOneFields.email === "";

    const isEmailInvalid = !isEmailEmpty && !isValidEmail; // Verifica se o email é inválido apenas quando não está vazio

    const isPhoneEmpty =
      stepOneFields.phone === undefined || stepOneFields.phone === "";

    setEmptyName(isNameEmpty);
    setEmptyEmail(isEmailEmpty);
    setInvalidEmail(isEmailInvalid);
    setEmptyPhone(isPhoneEmpty);

    if (!isNameEmpty && !isEmailEmpty && !isEmailInvalid && !isPhoneEmpty) {
      setStep((prev) => ({
        ...prev,
        stepOne: false,
        stepTwo: true,
      }));
    }
  };

  useEffect(() => {
    setEmptyName(false);
  }, [stepOneFields.name]);

  useEffect(() => {
    setEmptyEmail(false);
    setInvalidEmail(false);
  }, [stepOneFields.email]);

  useEffect(() => {
    setEmptyPhone(false);
  }, [stepOneFields.phone]);

  return (
    <div className={styles.stepOne}>
      <Header
        title="Personal info"
        paragraph="Please provide your name, email address, and phone number."
      />

      <FormControl
        htmlFor="name"
        label="Name"
        id="name"
        name="name"
        placeholder="e.g. Stephen King"
        type="text"
        onChange={handleInputs}
        isEmpty={emptyName}
        value={stepOneFields.name}
      />

      <FormControl
        htmlFor="email"
        id="email"
        label="Email Address"
        name="email"
        placeholder="e.g. stephenking@lorem.com"
        type="email"
        onChange={handleInputs}
        isEmpty={emptyEmail}
        invalidEmail={invalidEmail}
        value={stepOneFields.email}
      />

      <FormControl
        htmlFor="phone"
        id="phone"
        label="Phone Number"
        name="phone"
        placeholder="e.g. +1 234 567 890"
        type="text"
        onChange={handleInputs}
        isEmpty={emptyPhone}
        value={stepOneFields.phone}
      />

      <Buttons show={false} value="Next Step" onClick={checkFieldsStepOne} />
    </div>
  );
}
