import { gql } from "@apollo/client";
export const GET_CART_ITEMS = gql`
  query MyCartItems {
    myCartItems @client {
      _id
      name
      price
      description
      category
      rate
      count
      image
      quantity
    }
  }
`;
export const SAVED_CART_ITEMS = gql`
  query GetUserCart {
    getUserCart {
      cart {
        _id
        name
        price
        description
        category
        image
        rate
        count
        quantity
      }
      userId
      updatedAt
    }
  }
`;
export const GET_ORDER_ITEM = gql`
  query GetOrder($_id: ID!) {
    getOrder(_id: $_id) {
      _id
      items {
        _id
        name
        price
        description
        category
        image
        rate
        count
        quantity
      }
      userId
      createdAt
      total
      status
    }
  }
`;
export const GET_ITEMS = gql`
  query GetSkins {
    getSkins {
      _id
      name
      price
      description
      category
      image
      count
      rate
    }
  }
`;
export const GET_ITEM = gql`
  query GetSkin($_id: ID!) {
    getSkin(_id: $_id) {
      _id
      name
      price
      description
      category
      image
      count
      rate
    }
  }
`;
export const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      _id
      items {
        _id
        name
        price
        description
        category
        image
        rate
        count
        quantity
      }
      userId
      createdAt
      total
      status
    }
  }
`;
