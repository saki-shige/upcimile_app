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
export const updateProduct = (id: string, params: any) => {
  return client.patch(`products/${id}`, params, {headers: {
    'content-type': 'multipart/form-data',
  },
  });
}
