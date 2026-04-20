import { useMutation } from "@apollo/client";
import { TOGGLE_CART } from "../../apollo-client/mutations";
import { GET_CART_ITEMS } from "../../apollo-client/queries";
import { cartItemsVar } from "../../apollo-client/cache";
import { handleType } from "../../utils";
import { CartItem } from "../../components/MyDrawer/MyDrawer";

export function useCartMutation() {
  const [mutate, { loading, error }] = useMutation(TOGGLE_CART);

  const handleCart = async (cartItem: CartItem, type: string): Promise<void> => {
    try {
      await mutate({
        variables: { cartItem, type },
        update(cache) {
          const qryResult: { myCartItems: CartItem[] } | null = cache.readQuery({ query: GET_CART_ITEMS });
          const cartItems = qryResult?.myCartItems ?? [];
          const existingCartItemId = cache.identify({ __typename: "CartItem", _id: cartItem._id });
          const existingCartItem = cartItems.find((item) => item._id === cartItem._id);
          const newQty = handleType(type, existingCartItem?.quantity ?? 0);

          if (!existingCartItem) {
            const newCartItem = { ...cartItem, __typename: "CartItem", quantity: 1 };
            cache.writeQuery({ query: GET_CART_ITEMS, data: { myCartItems: [...cartItems, newCartItem] } });
            cartItemsVar([...cartItems, newCartItem]);
          } else {
            if (newQty === 0) {
              cache.evict({ id: existingCartItemId });
            } else {
              cache.modify({
                id: existingCartItemId,
                fields: {
                  quantity(existingQuantity) {
                    return handleType(type, existingQuantity);
                  },
                },
              });
            }
            const newQry: { myCartItems: CartItem[] } = cache.readQuery({ query: GET_CART_ITEMS }) ?? { myCartItems: [] };
            cartItemsVar(newQry.myCartItems);
          }
          cache.gc();
        },
      });
    } catch (e) {
      console.error(`Failed to ${type} cart item`, e);
    }
  };

  return { handleCart, loading, error };
}
