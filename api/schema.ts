export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Tokens {
    accessToken: String
    refreshToken: String
  }

  type Mutation {
    login(email: String, password: String): User
    logout: Boolean
    registration(
      email: String
      password: String
      firstName: String
      lastName: String
    ): User
    handleOrder(cartItems: [CartItem], userId: ID, total: Float): OrderRes
  }

  type User {
    _id: ID!
    email: String
    firstName: String
    lastName: String
  }

  type Skin {
    _id: ID
    name: String
    price: Float
    description: String
    category: String
    image: String
    rate: Float
    count: Int
  }

  input CartItem {
    _id: ID
    name: String
    price: Float
    description: String
    category: String
    image: String
    rate: Float
    count: Int
    quantity: Int
  }

  type OrderItem {
    _id: ID
    name: String
    price: Float
    description: String
    category: String
    image: String
    rate: Float
    count: Int
    quantity: Int
  }

  type OrderRes {
    id: ID
  }

  type Orders {
    _id: ID
    items: [OrderItem]
    userId: String
    createdAt: String
    status: String
    total: Float
  }

  type Query {
    getSkin(_id: ID!): Skin
    getOrder(_id: ID!): Orders
    getSkins: [Skin]
    getOrders: [Orders]
  }
`;
