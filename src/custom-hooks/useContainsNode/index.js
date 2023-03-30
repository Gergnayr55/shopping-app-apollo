import { useEffect } from "react";
const useContainsNode = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref && ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
};

export default useContainsNode;
