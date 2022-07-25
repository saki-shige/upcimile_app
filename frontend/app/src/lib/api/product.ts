import client from "./client"

export const getProducts = () => {
  return client.get("products")
}
