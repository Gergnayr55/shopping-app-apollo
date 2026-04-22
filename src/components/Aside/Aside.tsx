import { FC, ReactElement } from "react";
import "./Aside.css";
import Stack from "@mui/material/Stack";
interface AsideProps {
  children: ReactElement;
  height: string;
  minWidth?: string;
  className?: string;
}
const Aside: FC<AsideProps> = ({
  children,
  height,
  minWidth = "275px",
  className,
}) => {
  return (
    <Stack alignItems="center" spacing={0} sx={{ minHeight: height }}>
      <aside
        className={`aside${className ? ` ${className}` : ""}`}
        style={{ maxHeight: `${height}`, minWidth: `${minWidth}` }}
      >
        {children}
      </aside>
    </Stack>
  );
};
export default Aside;
