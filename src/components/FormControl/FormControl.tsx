import styles from "./FormControl.module.css";

interface FormControlProps {
  htmlFor: string;
  label: string;
  id: string;
  type: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEmpty: boolean;
  invalidEmail?: boolean;
  value: string;
}

export function FormControl({ ...FormControl }: FormControlProps) {
  return (
    <div className={styles.formControl}>
      <div className={styles.labelAndSpanAlert}>
        <label htmlFor={FormControl.htmlFor}>{FormControl.label}</label>

        {FormControl.isEmpty && <span>This field is required</span>}

        {FormControl.invalidEmail && <span>Invalid Email</span>}
      </div>

      <input
        id={FormControl.id}
        type={FormControl.type}
        name={FormControl.name}
        placeholder={FormControl.placeholder}
        value={FormControl.value || ""}
        required
        onChange={FormControl.onChange}
        className={
          FormControl.isEmpty || FormControl.invalidEmail
            ? styles.invalid
            : styles.valid
        }
      />
    </div>
  );
}
