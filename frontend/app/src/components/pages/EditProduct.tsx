import React, { FC, useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Box, MenuItem, Grid, Typography, TextField, Container, Paper } from '@mui/material'

import { updateProduct } from '../../lib/api/product'
import ImageForm from '../layouts/ImageForm'
import { Product } from '../../interface'
import { MessageContext } from '../providers/MessageProvider'
import { useHandleGetSingleProduct } from '../hooks/products'

const EditProduct: FC = () => {
  const [croppedFile, setCroppedFile] = useState<File | null>(null)
  const navigation = useNavigate()
  const { id } = useParams<{id: string}>()
  const { product } = useHandleGetSingleProduct(id)
  const [newProduct, setNewProduct] = useState<Product>()
  const [changeImage, setChangeImage] = useState<boolean>(false)
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)

  const categories = [
    { value: 1, label: '食べ物' },
    { value: 2, label: '場所' }
  ]

  const handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const { name, value } = e.target
    if (newProduct !== undefined) {
      setNewProduct({ ...newProduct, [name]: value })
    }
  }
  console.log(changeImage)
  console.log(croppedFile)

  const handleFormData: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    if (newProduct != null) {
      formData.append('product[name]', (newProduct.name != null) ? newProduct.name : '')
      changeImage && (formData.append('product[image]', (croppedFile != null) ? croppedFile : ''))
      formData.append('product[introduction]', (newProduct.introduction != null) ? newProduct.introduction : '')
      formData.append('product[availableFrom]', (newProduct.availableFrom != null) ? String(newProduct.availableFrom) : '')
      formData.append('product[availableTo]', (newProduct.availableTo != null) ? String(newProduct.availableTo) : '')
      formData.append('product[companyId]', (newProduct.companyId != null) ? String(newProduct.companyId) : '')
      formData.append('product[categoryId]', (newProduct.categoryId != null) ? String(newProduct.categoryId) : '')
    }

    if (id != null) {
      try {
        console.log(formData)
        const res = await updateProduct(id, formData)
        console.log(res)

        if (res.status === 200) {
          console.log(res.data.message)
          navigation('/products')
        } else {
          throw new Error()
        };
      } catch (err) {
        console.log(err)
        setOpen(true)
        setMessage('商品の編集に失敗しました。')
        setSeverity('error')
      };
    }
  }

  useEffect(() => {
    setNewProduct(product)
  }, [product])

  return (
    <>
    {(newProduct != null) && (
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component='h1' variant='h4' align='center'>
            商品情報編集
          </Typography>
          <Typography variant='h6' gutterBottom sx={{ textAlign: 'center' }}>
            商品画像
          </Typography>
          <Grid container spacing={3}>
            {changeImage
              ? (
              <>
              <Grid item xs={12}>
                <ImageForm setCroppedFile={setCroppedFile}/>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button onClick={() => setChangeImage(false)}>元の画像に戻す</Button>
              </Grid>
              </>
                )
              : (
              <>
            <Grid item xs={12}>
              <Paper
                sx={{
                  width: 400,
                  height: 300,
                  mx: 'auto',
                  borderRadius: 0,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${(product !== undefined && product.image.url !== undefined) ? product.image.url : ''})`
                }}
              >
            </Paper>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button onClick={() => setChangeImage(true)}>画像を変更する</Button>
            </Grid>
            </>
                )}
            <Grid item xs={12}>
              <TextField
                required
                name = 'name'
                label='名前'
                fullWidth
                defaultValue={newProduct.name}
                autoComplete='given-name'
                variant='standard'
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name='introduction'
                label='説明'
                multiline
                minRows={3}
                maxRows={4}
                fullWidth
                defaultValue={newProduct.introduction}
                variant='standard'
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                  select
                  name='categoryId'
                  label='商品カテゴリー'
                  fullWidth
                  defaultValue={newProduct.categoryId}
                  onChange={handleOnChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.label} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type='date'
                name='availableFrom'
                label='利用可能開始日'
                fullWidth
                defaultValue={newProduct.availableFrom}
                variant='standard'
                InputLabelProps={{
                  shrink: true
                }}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='date'
                name='availableTo'
                label='掲載完了日'
                fullWidth
                defaultValue={newProduct.availableTo}
                variant='standard'
                InputLabelProps={{
                  shrink: true
                }}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant='contained'
                  type='submit'
                  onClick={(e) => { void handleFormData(e) }}
                  sx={{ mt: 3, ml: 1 }}
                >
                  更新する
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    )};
    </>
  )
}

export default EditProduct
