import React from "react";

interface BlockButtonProps {
  className?: string;
  handleClick?: () => void;
  message: string;
}

const BlockButton: React.FC<BlockButtonProps> = ({
  className,
  handleClick,
  message,
}) => {
  return (
    <button
      className={`px-8 py-4 bg-green2 border border-green4  border-dashed font-semibold hover:bg-green1 rounded-md shadow shadow-green-400/15 font-display active:bg-green0 text-nowrap ${className}`}
      onClick={handleClick}
    >
      {message}
    </button>
  );
};

export default BlockButton;
