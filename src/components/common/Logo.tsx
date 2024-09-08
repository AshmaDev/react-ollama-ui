import cn from "classnames";

interface LogoProps {
  size: "xs" | "lg";
  className?: string;
}

const Logo = ({ size, className }: LogoProps) => {
  return (
    <div
      className={cn(
        "rounded-full bg-[url(/favicon/icon.svg)] bg-cover border border-neutral-200",
        className,
        {
          "w-5 h-5": size === "xs",
          "w-24 h-24": size === "lg",
        }
      )}
    />
  );
};

export default Logo;
