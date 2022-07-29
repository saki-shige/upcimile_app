import client from "./client"
import { UpdateProductFormData } from "../../interface"

export const getProducts = () => {
  return client.get("products")
}

export const getSingleProduct = (id: string) => {
  return client.get(`products/${id}`);
}

export const createProduct = (data: UpdateProductFormData) => {
  return client.post("products", data, {headers: {
    'content-type': 'multipart/form-data',
  },
  });
}
