import { gql } from "@apollo/client";
export const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($cartItem: CartItem, $type: String) {
    addOrRemoveFromCart(cartItem: $cartItem, type: $type) @client
  }
`;
export const UPDATE_CART = gql`
  mutation HandleCart($cartItems: [CartItem], $userId: ID) {
    handleCart(cartItems: $cartItems, userId: $userId) {
      id
    }
  }
`;
export const MY_ORDER = gql`
  mutation MyOrder($cartItems: [CartItem], $userId: ID, $total: Float) {
    handleOrder(cartItems: $cartItems, userId: $userId, total: $total) {
      id
    }
  }
`;
export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
export const USER_LOGIN = gql`
  mutation UserLogin($email: String, $password: String) {
    login(email: $email, password: $password) {
      _id
      email
      password
      firstName
      lastName
    }
  }
`;
export const LOGGED_IN = gql`
  query LoggedInUser {
    loggedInUser {
      _id
      email
    }
  }
`;
export const REGISTRATION = gql`
  mutation Registration(
    $email: String
    $password: String
    $firstName: String
    $lastName: String
  ) {
    registration(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      email
      password
      firstName
      lastName
    }
  }
`;
