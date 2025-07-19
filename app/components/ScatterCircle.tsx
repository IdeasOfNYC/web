import type { FC } from "react";

interface ScatterCircleProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  className: string;
}

export const ScatterCircle: FC<ScatterCircleProps> = ({
  onMouseEnter,
  onMouseLeave,
  onClick,
  className,
}) => {
  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`w-2.5 h-2.5 rounded-full hover:scale-200 cursor-pointer hover:border hover:border-white ${className}`}
    ></button>
  );
};
