import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const IconButton = ({
  children,
  className = "",
  ...props
}: IconButtonProps) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};