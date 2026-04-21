import { ReactElement } from "react";
import "./ProductDetails.css";
import AddToCartButton from "../AddToCartButton";
import ItemSummary from "../ItemSummary";
interface ProductDetailsProps {
  name: string;
  price: number;
  showRating: boolean;
  rate: number | null;
  count: number | null;
  buttonText: string;
  foundInCart: boolean;
  handleEmptyCart: () => Promise<void>;
  handleRemoveItem: () => Promise<void>;
  handleAddItem: () => Promise<void>;
}

export default function ProductDetails({
  name,
  price,
  showRating,
  rate,
  count,
  buttonText,
  foundInCart,
  handleEmptyCart,
  handleRemoveItem,
  handleAddItem,
}: ProductDetailsProps): ReactElement {
  return (
    <>
      <ItemSummary
        name={name}
        price={price}
        rate={rate}
        count={count}
        showRating={showRating}
      />
      <AddToCartButton
        buttonText={buttonText}
        foundInCart={foundInCart}
        handleEmptyCart={handleEmptyCart}
        handleRemoveItem={handleRemoveItem}
        handleAddItem={handleAddItem}
      />
      <div className="product-details-divider-wrap">
        <hr />
      </div>
    </>
  );
}
