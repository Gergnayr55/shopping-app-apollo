import { ReactElement } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { moneyFormatter } from "../../utils";
interface ItemSummaryProps {
  name: string;
  price: number;
  rate: number | null;
  count: number | null;
  showRating: boolean;
}

export default function ItemSummary({
  name,
  price,
  rate,
  count,
  showRating,
}: ItemSummaryProps): ReactElement {
  return (
    <>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontSize: { xs: "16px", md: "20px" } }}
      >
        {name}
      </Typography>
      <Typography
        variant="h5"
        color="primary"
        gutterBottom
        sx={{ fontSize: { xs: "18px", md: "24px" } }}
      >
        <strong>{moneyFormatter.format(price)}</strong>
      </Typography>
      {showRating && (
        <Box sx={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
          <Rating
            name="read-only"
            value={rate}
            precision={0.25}
            size="small"
            readOnly
          />
          <Typography
            variant="body2"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "inherit" } }}
          >
            {count !== null ? ` (${count})` : ""}
          </Typography>
        </Box>
      )}
    </>
  );
}
