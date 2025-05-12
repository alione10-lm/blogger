import clsx from "clsx";
import React from "react";

const UserAvatar = ({ firstname, lastname, size }) => {
  return (
    <span
      className={clsx(
        " uppercase inline-flex items-center  justify-center  text-xs text-white rounded-sm bg-indigo-500",
        size
      )}
    >
      {`${firstname?.[0]} ${lastname?.[0]}`}
    </span>
  );
};

export default UserAvatar;
