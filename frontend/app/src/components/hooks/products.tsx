import { useContext, useEffect, useState } from 'react'
import { Product, Company } from '../../interface'
import { getProducts, getSingleProduct } from '../../lib/api/product'
import { MessageContext } from '../providers/MessageProvider'

export const useHandleGetProducts: () => Product[] | undefined = () => {
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)
  const [products, setProducts] = useState<Product[]>()

  useEffect(() => {
    getProducts()
      .then((res) => {
        if (res.status === 200) {
          console.log('商品一覧を取得しました')
          setProducts(res.data)
        } else {
          throw new Error()
        }
      }).catch((error) => {
        console.log(error)
        setOpen(true)
        setMessage('商品情報を取得できませんでした。')
        setSeverity('error')
      })
  }, [])

  return (products)
}

export const useHandleGetSingleProduct: (id: any) => {
  product: Product | undefined
  relatedProducts: Product[] | undefined
  company: Company | undefined} = (id) => {
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>()
  const [company, setCompany] = useState<Company>()
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    getSingleProduct(id)
      .then((res) => {
        if (res.status === 200) {
          setProduct(res.data.product)
          setRelatedProducts(res.data.relatedProducts)
          setCompany(res.data.company)
        } else {
          throw new Error()
        }
      }).catch((error) => {
        console.log(error)
        setOpen(true)
        setMessage('商品情報を取得できませんでした。')
        setSeverity('error')
      })
  }, [id])

  return { product, relatedProducts, company }
}
