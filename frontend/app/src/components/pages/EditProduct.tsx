import React, { FC, useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Box, MenuItem, Grid, Typography, TextField, Container, Paper } from '@mui/material'

import { getSingleProduct, updateProduct } from '../../lib/api/product'
import ImageForm from '../layouts/ImageForm'
import { FormProduct } from '../../interface'
import { MessageContext } from '../providers/MessageProvider'

const EditProduct: FC = () => {
  const [croppedFile, setCroppedFile] = useState<File | null>(null)
  const navigation = useNavigate()
  const { id } = useParams<{id: string}>()
  const [preImage, setPreImage] = useState<string>()
  const [changeImage, setChangeImage] = useState<boolean>(false)
  const [product, setProduct] = useState<FormProduct>()
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)

  const categories = [
    { value: 1, label: '食べ物' },
    { value: 2, label: '場所' }
  ]

  const handleGetProduct: (id: string) => Promise<void> = async (id) => {
    try {
      const res = await getSingleProduct(id)
      console.log(res)
      if (res.status === 200) {
        console.log('商品詳細を取得しました')
        setProduct(res.data.product)
        setPreImage(res.data.product.image.url)
      } else {
        console.log('No products')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }
  console.log(changeImage)
  console.log(croppedFile)

  const handleFormData: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    if (product != null) {
      formData.append('product[name]', (product.name != null) ? product.name : '')
      changeImage && (formData.append('product[image]', (croppedFile != null) ? croppedFile : ''))
      formData.append('product[introduction]', (product.introduction != null) ? product.introduction : '')
      formData.append('product[availableFrom]', (product.availableFrom != null) ? String(product.availableFrom) : '')
      formData.append('product[availableTo]', (product.availableTo != null) ? String(product.availableTo) : '')
      formData.append('product[companyId]', (product.companyId != null) ? String(product.companyId) : '')
      formData.append('product[categoryId]', (product.categoryId != null) ? String(product.categoryId) : '')
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
    (id != null) && handleGetProduct(id)
  }, [])

  return (
    <>
    {(product != null) && (
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
                  backgroundImage: `url(${(preImage !== undefined) ? preImage : ''})`
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
                defaultValue={product.name}
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
                defaultValue={product.introduction}
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
                  defaultValue={product.categoryId}
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
                defaultValue={product.availableFrom}
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
                defaultValue={product.availableTo}
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
