import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist";
import { cache } from "./cache";

const persistenceMapper = async (data: string) => {
  const parsed = JSON.parse(data);
  const filtered: Record<string, unknown> = { ROOT_QUERY: {} };

  if (parsed.ROOT_QUERY?.myCartItems) {
    filtered.ROOT_QUERY = { myCartItems: parsed.ROOT_QUERY.myCartItems };
  }

  Object.keys(parsed).forEach((key) => {
    if (key.startsWith("CartItem:")) {
      filtered[key] = parsed[key];
    }
  });

  return JSON.stringify(filtered);
};

export const persistor = new CachePersistor({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
  persistenceMapper,
});
