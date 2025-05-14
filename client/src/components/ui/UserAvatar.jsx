import clsx from "clsx";
import React from "react";

const UserAvatar = ({ firstname, lastname, size, rounded = "rounded-sm" }) => {
  return (
    <span
      className={clsx(
        " uppercase inline-flex items-center  justify-center  text-xs text-white  bg-indigo-500",
        size,
        rounded
      )}
    >
      {`${firstname?.[0]} ${lastname?.[0]}`}
    </span>
  );
};

export default UserAvatar;
