import styles from "./styles.module.css";
import { IButtonProps } from "./type";

export function Button({
  children,
  variant,
  type,
  disabled,
  onClick,
}: IButtonProps) {
  return (
    <button
      className={styles[variant]}
      type={type}
      disabled={disabled && true}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
