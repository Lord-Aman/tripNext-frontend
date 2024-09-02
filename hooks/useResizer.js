import * as React from "react";

export default function useResizer(width) {
  let value = false;
  if (typeof window !== "undefined") {
    value = window.innerWidth < (width || 768);
  }
  const [isMobile, setIsMobile] = React.useState(value);

  function handleSizeChange() {
    let value = false;
    if (typeof window !== "undefined") {
      value = window.innerWidth < (width || 768);
    }
    return setIsMobile(value);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleSizeChange);

    return () => {
      window.removeEventListener("resize", handleSizeChange);
    };
  }, [isMobile]);

  return isMobile;
}
