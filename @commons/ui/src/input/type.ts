import { FieldValues, Path, UseFormRegister } from "react-hook-form";

/* input types */
export type InputProps = {
  label?: string;
  required?: boolean;
  //   type: HTMLInputTypeAttribute;
  //   placeholder: string;
  isEdit?: boolean;
  isAuth?: boolean | undefined;
  error?: string | undefined;
  onClick?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

/* textarea types */
export type TextareaProps = {
  label?: string;
  required?: boolean;
  placeholder: string;
  isCommentField?: boolean;
  isAuth?: boolean | undefined;
  maxLength?: number;
  error?: string | undefined;
  onClick?: () => void;
};

/* boardAddress types */
export type BoardAddressProps<T extends FieldValues> = {
  required?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  placeholder: string;
  placeholder_2?: string;
  register?: UseFormRegister<T>;
  basePath?: Path<T>;
  isEdit?: boolean;
};
