import cn from "classnames";

interface LogoProps {
  size: number;
  className?: string;
}

const Logo = ({ size, className }: LogoProps) => {
  return (
    <div
      className={cn(
        "rounded-full bg-[url(/favicon/icon.svg)] bg-cover border border-neutral-100",
        `w-${size} h-${size}`,
        className
      )}
    />
  );
};

export default Logo;
