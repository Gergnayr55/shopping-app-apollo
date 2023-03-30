import { InMemoryCache, makeVar, StoreObject } from "@apollo/client";
import { ReadFieldFunction } from "@apollo/client/cache/core/types/common";
import { CartItem } from "../components/MyDrawer/MyDrawer";

export const cartItemsVar = makeVar<Array<CartItem>>([]);

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        myCartItems: {
          read(existing) {
            return existing;
          },
        },
        getOrders: {
          read(
            existing,
            {
              canRead,
              readField,
            }: { canRead: () => boolean; readField: ReadFieldFunction }
          ) {
            if (existing) {
              // if the data is already in the cache, return it
              return existing;
            } else if (canRead()) {
              // if the data is not in the cache, fetch it from the network
              return readField("getOrders");
            } else {
              return existing;
            }
          },
          merge(
            existing: StoreObject[] = [],
            incoming: StoreObject[],
            { readField }: { readField: ReadFieldFunction }
          ) {
            if (!incoming) {
              return existing;
            }
            const existingOrders = existing ?? [];
            const mergedOrders = existingOrders.slice(0);
            incoming.forEach((incomingOrder) => {
              const incomingOrderId = readField("_id", incomingOrder);
              const existingOrderIndex = existingOrders.findIndex(
                (existingOrder) =>
                  readField("_id", existingOrder) === incomingOrderId
              );
              if (existingOrderIndex >= 0) {
                mergedOrders[existingOrderIndex] = incomingOrder;
              } else {
                mergedOrders.push(incomingOrder);
              }
            });
            return mergedOrders;
          },
        },
        getSkin: {
          read(_, { args, toReference }) {
            if (args && args._id) {
              return toReference({
                __typename: "Skin",
                _id: args._id,
              });
            }
          },
        },
        getOrder: {
          read(_, { args, toReference }) {
            if (args && args._id) {
              return toReference({
                __typename: "Orders",
                _id: args._id,
              });
            }
          },
        },
      },
    },
  },
});
