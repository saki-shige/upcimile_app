import { getProducts } from "../../lib/api/product";

export const handleGetProducts = async () => {
  try {
    const res = await getProducts()
    console.log(res);
    if (res.status === 200) {
      return (res.data);
    } else {
      console.log("no products");
    }
  } catch (err) {
    console.log(err);
  };
};
