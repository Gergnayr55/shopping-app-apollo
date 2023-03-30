import { CartItem } from "../components/MyDrawer/MyDrawer";
const USER_KEY = "loggedInUser";
export function saveUser(tokens): void {
  localStorage.setItem(USER_KEY, JSON.stringify(tokens));
}

export function saveCart(userId, cart): void {
  localStorage.setItem(userId, JSON.stringify(cart));
}

export function clearCart(userId): void {
  localStorage.removeItem(userId);
}

export function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

export function deleteUser(): void {
  localStorage.removeItem(USER_KEY);
}
export function validToken() {
  getUser();
}
export const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});
export const cartTotalItems = (items: Array<CartItem>): number => {
  return items.reduce((acc, obj) => {
    return acc + Number(obj.quantity);
  }, 0);
};
export const calculatedCartTotal = (items: Array<CartItem>): number => {
  if (items.length > 0) {
    return items.reduce((acc, d) => {
      acc += Number((d.price * d.quantity).toFixed(2));
      acc = Number(acc.toFixed(2));
      return Number(acc);
    }, 0);
  } else {
    return 0;
  }
};

export const handleTotalItems = (arr: Array<CartItem>): number =>
  arr.reduce((a, b) => {
    return a + b.quantity;
  }, 0);

export const handleDateFormat = (date: number): string => {
  if (date) {
    return new Date(date).toISOString().substring(0, 10);
  }
};
export const handleType = (type: string, val: number): number => {
  if (type === "MINUS" && val > 0) return --val;
  else if (type === "ADD") return ++val;
  else if (type === "MINUS" && val <= 1) return 0;
  else return 0;
};
