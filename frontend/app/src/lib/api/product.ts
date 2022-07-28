import client from "./client"

export const getProducts = () => {
  return client.get("products")
}

export const getSingleProduct = (id: string) => {
  return client.get(`products/${id}`);
}

export const createProduct = (data: any) => {
  return client.post("products", data, {headers: {
    'content-type': 'multipart/form-data',
  },
  });
}
