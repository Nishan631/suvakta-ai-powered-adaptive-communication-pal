import { CSSProperties, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hoverable?: boolean;
  padding?: string | number;
  /** Use frosted-glass style (backdrop-filter) */
  glass?: boolean;
}

export default function Card({
  children,
  className = "",
  style = {},
  hoverable = false,
  padding = "20px",
  glass = true,
}: CardProps) {
  const base: CSSProperties = glass
    ? {
        background: "var(--surface)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        border: "1px solid var(--border-glass)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-glass)",
        padding,
      }
    : {
        background: "var(--surface-solid)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
        padding,
      };

  return (
    <div
      className={`${hoverable ? "card-hover" : ""} ${className}`}
      style={{ ...base, ...style }}
    >
      {children}
    </div>
  );
}
