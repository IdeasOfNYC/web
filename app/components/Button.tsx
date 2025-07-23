import React from "react";

interface BlockButtonProps {
  className?: string;
  handleClick?: () => void;
  message: string;
  disabled?: boolean; 
}

const BlockButton: React.FC<BlockButtonProps> = ({
  className,
  handleClick,
  message,
  disabled = false, 
}) => {
  return (
    <button
      disabled={disabled} 
      onClick={disabled ? undefined : handleClick} 
      className={`px-8 py-4 border border-dashed font-semibold rounded-md shadow font-display text-nowrap
        ${disabled
          ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
          : "bg-green2 border-green4 hover:bg-green1 active:bg-green0 shadow-green-400/15"
        }
        ${className}`}
    >
      {message}
    </button>
  );
};

export default BlockButton;