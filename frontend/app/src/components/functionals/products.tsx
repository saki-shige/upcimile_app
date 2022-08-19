import { getProducts, getSingleProduct } from "../../lib/api/product";

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

export const handleGetProduct = async(id:string) => {
  try {
    const res = await getSingleProduct(id);
    console.log(res);
    if (res.status === 200) {
      console.log('商品詳細を取得しました');
      return res.data;
    } else {
      console.log("No products")
    }
  } catch (err) {
    console.log(err)
  }
}
