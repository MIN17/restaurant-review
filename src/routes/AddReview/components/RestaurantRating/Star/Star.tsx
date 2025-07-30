interface StarProps {
  isFilled: boolean;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export function Star(props: StarProps) {
  const { isFilled, handleClick } = props;

  const star = isFilled ? <span>&#9733;</span> : <span>&#9734;</span>;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <span
      className="cursor-pointer text-2xl text-amber-300"
      onClick={handleClick}
    >
      {star}
    </span>
  );
}
