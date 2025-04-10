type MainButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function MainButton({
  children,
  onClick,
  className,
  type = "button",
}: MainButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-[610.787px] h-[114.625px] rounded-[28px] bg-main-color text-[44px] text-text-brown font-extrabold shadow-lg leading-normal text-center font-nanum ${className}`}
      style={{
        boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(108, 52, 1, 0.25)`,
      }}
    >
      {children}
    </button>
  );
}
