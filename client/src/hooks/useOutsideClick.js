import React, { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        const target = e.target;

        if (ref.current && !ref.current.contains(target)) {
          callback();
        }
      }

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    },
    [callback]
  );
  return {
    ref,
  };
};

export default useOutsideClick;
