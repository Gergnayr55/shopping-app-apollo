import React, { useState, useRef, useEffect } from "react";
import "./StickyWrapper.css";
const StickyWrapper = ({ children }) => {
  //   const leadershipRef = useRef(null);
  //   const providerRef = useRef(null);
  //   const operationsRef = useRef(null);
  //   const sectionRefs = [
  //     { section: "Leadership", ref: leadershipRef },
  //     { section: "Providers", ref: providerRef },
  //     { section: "Operations", ref: operationsRef },
  //   ];
  //   const [visibleSection, setVisibleSection] = useState();
  //   const headerRef = useRef(null);
  //   const getDimensions = (ele) => {
  //     const { height } = ele.getBoundingClientRect();
  //     const offsetTop = ele.offsetTop;
  //     const offsetBottom = offsetTop + height;
  //     return {
  //       height,
  //       offsetTop,
  //       offsetBottom,
  //     };
  //   };
  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const { height: headerHeight } = getDimensions(headerRef.current);
  //       const scrollPosition = window.scrollY + headerHeight;
  //       const selected = sectionRefs.find(({ section, ref }) => {
  //         const ele = ref.current;
  //         if (ele) {
  //           const { offsetBottom, offsetTop } = getDimensions(ele);
  //           return scrollPosition > offsetTop && scrollPosition < offsetBottom;
  //         }
  //       });
  //       if (selected && selected.section !== visibleSection) {
  //         setVisibleSection(selected.section);
  //       }
  //     };
  //     window.addEventListener("scroll", handleScroll);
  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, [visibleSection]);
  //   const scrollTo = (ele) => {
  //     ele.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   };
  //   const [isSticky, setSticky] = useState(false);
  //   const ref = useRef(null);
  //   console.log(isSticky);
  //   const handleScroll = () => {
  //     if (ref.current) {
  //       console.log(ref.current.getBoundingClientRect().top);
  //       setSticky(ref.current.getBoundingClientRect().top <= -125);
  //     }
  //   };
  //   useEffect(() => {
  //     window.addEventListener("scroll", handleScroll);
  //     return () => {
  //       window.removeEventListener("scroll", () => handleScroll);
  //     };
  //   }, []);
  //   return (
  //     <div className={`sticky__wrapper ${isSticky ? "sticky" : ""}`} ref={ref}>
  //       <div className="sticky--inner">{children}</div>
  //     </div>
  //   );
};

export default StickyWrapper;
