import styles from "./Header.module.css";

import { HeaderProps } from "../../interfaces/Header";

export function Header({ title, paragraph }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <p>{paragraph}</p>
    </header>
  );
}
