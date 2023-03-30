import { gql } from "@apollo/client";

export const typeDefs = gql`
  extend type Query {
    myCartItems: [CartItem]
  }

  extend type Mutation {
    addOrRemoveFromCart(cartItem: CartItem, type: String): [ID]
  }
`;
