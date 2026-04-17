import { useEffect, RefObject } from "react";
const useContainsNode = (ref: RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref && ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
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
