type ButtonType = "submit" | "reset" | "button";

export interface IButtonProps {
  /** 버튼 안에 들어갈 텍스트, 내용 */
  children: React.ReactNode;
  /** 버튼 CSS 스타일 */
  variant: string;
  /** 버튼 타입 */
  type: ButtonType;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 클릭 시 실행 함수 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
