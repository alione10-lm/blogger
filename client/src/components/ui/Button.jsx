import clsx from "clsx";
import React from "react";

export default function Button({
  variant = "primary",
  size = "large",
  type = "button",
  children,
  onClick,
}) {
  const varinats = {
    primary:
      " flex items-center justify-center gap-2 font-medium tracking-wide text-white transition duration-300 cursor-pointer rounded-md whitespace-nowrap bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-indigo-300 disabled:bg-indigo-300 disabled:shadow-none  ",
    ghost:
      " flex items-center justify-center  font-medium tracking-wide transition duration-300 rounded-md focus-visible:outline-none justify-self-center whitespace-nowrap bg-indigo-100 text-indigo-500 hover:bg-indigo-200 hover:text-indigo-600 focus:bg-indigo-200 focus:text-indigo-700 disabled:cursor-not-allowed disabled:border-indigo-300 cursor-pointer disabled:bg-indigo-100 disabled:text-indigo-400 disabled:shadow-none w-full ",
    secondary:
      " flex items-center cursor-pointer w-full justify-center gap-2 font-medium tracking-wide text-white transition duration-300 rounded-md whitespace-nowrap bg-red-500 hover:bg-red-600 focus:bg-red-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300 disabled:shadow-none ",
  };

  const sizes = {
    large: "h-10  px-5 text-sm w-full",
    small: " h-8  px-4 text-xs ",

    xsmall: " size-7  text-xs ",
  };

  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={clsx(varinats[variant], sizes[size])}
      >
        {children}
        {/* <span>{children}</span> */}
      </button>
    </>
  );
}
