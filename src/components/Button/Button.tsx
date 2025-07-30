import { useNavigate } from "react-router-dom";

interface Props {
  value: string;
  type?: "submit" | "button";
  link?: string;
  handleClick?: any;
  className?: string;
  noStyle?: boolean;
}

export const Button: React.FC<Props> = ({
  value,
  link,
  type = "button",
  handleClick,
  className,
  noStyle,
}) => {
  const navigate = useNavigate();

  const to = (e: { preventDefault: () => void }) => {
    if (link) {
      e.preventDefault();
      navigate(link);
    }
  };

  return (
    <button
      className={
        !noStyle
          ? `
          h-9
          mb-4
          px-4 py-2
          inline-flex gap-2 items-center
          border-none rounded-md
          bg-cyan-600 hover:bg-primary/90
          text-sm font-medium text-primary-foreground
          shadow
          justify-center
          whitespace-nowrap
          transition-colors
          disabled:pointer-events-none
          disabled:opacity-50
          cursor-pointer
          ${className}
        `
          : className
      }
      type={type}
      onClick={handleClick ? handleClick : to}
    >
      {value}
    </button>
  );
};
