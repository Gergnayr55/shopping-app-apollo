import React, { CSSProperties, FC } from "react";
import { Stack } from "@mui/system";
interface AsideProps {
  children: JSX.Element;
  height: string;
  minWidth?: string;
  customStyle?: CSSProperties;
}
const Aside: FC<AsideProps> = ({
  children,
  height,
  customStyle,
  minWidth = "275px",
}) => {
  return (
    <Stack alignItems="center" spacing={0} style={{ minHeight: `${height}` }}>
      <aside
        style={{
          padding: "1.05rem",
          maxHeight: `${height}`,
          minWidth: `${minWidth}`,
          margin: "10px 20px 10px auto",
          boxShadow: "0 1px 2px 1px rgba(0, 0, 0, 15%)",
          borderRadius: "0.5rem",
          height: "100%",
          ...customStyle,
        }}
      >
        {children}
      </aside>
    </Stack>
  );
};
export default Aside;
