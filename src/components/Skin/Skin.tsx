import React, { ReactElement, SyntheticEvent } from "react";
import "./Skin.css";
import { ObjectId } from "bson";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Rating,
} from "@mui/material";
import { moneyFormatter } from "../../utils";
import Image from "../Image";

export interface SkinProps {
  id: ObjectId;
  name: string;
  description?: string;
  category: string;
  image: string;
  price: number;
  count: number | null;
  rate: number | null;
  onSelect?: () => void;
  addToCart?: () => SyntheticEvent<HTMLInputElement>;
  uri?: string;
}

function Skin({
  id,
  name,
  description,
  image,
  category,
  count,
  rate,
  price,
  onSelect,
  addToCart,
  uri,
}: SkinProps): ReactElement {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: "0 auto",
        maxHeight: { xs: "360px", md: "360px" },
        minHeight: { xs: "360px", md: "360px" },
      }}
      onClick={onSelect}
      key={`${name}-${id}`}
    >
      <Card
        sx={{
          width: "100%",
          // minWidth: "fit-content",
          maxHeight: { xs: "360px", md: "360px" },
          minHeight: { xs: "360px", md: "360px" },
          minWidth: { xs: "360px", md: "fit-content" },
          backgroundColor: "white",
          justifySelf: "center",
          borderRadius: 4,
          border: "1.5px solid #f1f1f2",
          boxShadow: "none",
          // boxShadow:
          //   "0 3px 6px -4px rgba(0, 0, 0, 16%), 0 3px 6px rgba(0, 0, 0, 23%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 14,
          color: "black",
          margin: "5px 40px",
        }}
      >
        <CardActionArea
          sx={{
            display: "flex",
            height: "100%",
            maxHeight: { xs: "360px", md: "360px" },
            minHeight: { xs: "360px", md: "360px" },
            width: { xs: "150px", md: "350px" },
            minWidth: { xs: "150px", md: "350px" },
            backgroundColor: "#f5f5f5",
            "&:hover": {
              borderRadius: "0px",
              backgroundColor: "#f6f6f6",
            },
          }}
          component={uri ? Link : Button}
          onClick={(e: Event | SyntheticEvent) => {
            if (!uri) return e.preventDefault();
            else return undefined;
          }}
          to={uri}
        >
          <Image
            src={image}
            customStyle={{
              objectFit: "contain",
              marginTop: 15,
              maxHeight: "275px",
              width: "100%",
              // backgroundColor: "#f5f5f5",
              mixBlendMode: "darken",
              imageRendering: "-webkit-optimize-contrast",
            }}
          />
        </CardActionArea>
        <CardContent
          sx={{
            alignItems: "flex-start",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-around",
            minWidth: { xs: "150px", md: "350px" },
            flexDirection: "column",
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            sx={{
              color: "#000",
              paddingTop: { xs: "20px" },
              fontSize: { xs: "16px", md: "inherit" },
              a: {
                color: "#000",
                textDecoration: "none",
                fontSize: { xs: "16px", md: "20px" },
                padding: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              },
            }}
          >
            <Link
              to={uri ? uri : "/"}
              onClick={(e: Event | SyntheticEvent) => {
                if (!uri) return e.preventDefault();
                else return undefined;
              }}
            >
              {name}
            </Link>
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            sx={{
              color: "#808080",
              display: "-webkit-box",
              maxWidth: { xs: "250px", md: "100%" },
              WebkitLineClamp: "8",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              fontSize: { xs: "12px", md: "inherit" },
            }}
          >
            {description}
          </Typography>

          <Stack
            alignItems="center"
            justifyContent="space-evenly"
            sx={{ marginBottom: { xs: "25px", md: "50px" } }}
          >
            <Typography
              variant="h5"
              color="primary"
              gutterBottom
              sx={{ width: "100%", fontSize: { xs: "16px", md: "24px" } }}
            >
              <strong>{moneyFormatter.format(price)}</strong>
            </Typography>
            <Rating
              name="read-only"
              value={rate}
              precision={0.25}
              size="small"
              sx={{ width: "100%" }}
              readOnly
            />
            <Typography
              variant="body2"
              align="left"
              style={{ margin: "5px 0 0 3px" }}
              sx={{
                width: "100%",
                fontSize: { xs: "12px", md: "inherit" },
              }}
            >
              {count !== null ? `${count} total reviews` : "No reviews"}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          {/* <Button size="small" color="primary" onClick={addToCart}>
            Add to Cart
          </Button> */}
        </CardActions>
      </Card>
    </Box>
  );
}
export default Skin;
