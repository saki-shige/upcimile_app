import React, { FC, useState, useContext, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Box, MenuItem, Grid, Typography, TextField, Container, Paper } from '@mui/material'
import DiamondIcon from '@mui/icons-material/Diamond'

import { CategoriesList } from '../../lib/api/categories'
import { updateProduct } from '../../lib/api/product'
import ImageForm from '../layouts/ImageForm'
import { Product } from '../../interface'
import { MessageContext } from '../providers/MessageProvider'
import { useHandleGetSingleProduct } from '../hooks/products'

const EditProduct: FC = () => {
  const today = new Date()
  const formatted = today
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .split('/')
    .join('-')
  const [croppedFile, setCroppedFile] = useState<File | null>(null)
  const navigation = useNavigate()
  const { id } = useParams<{id: string}>()
  const { product } = useHandleGetSingleProduct(id)
  const [newProduct, setNewProduct] = useState<Product>()
  const [changeImage, setChangeImage] = useState<boolean>(false)
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)
  const availableToRef = useRef<HTMLInputElement>(null)
  const [availableToError, setAvailableToError] = useState(false)
  const availableFromRef = useRef<HTMLInputElement>(null)
  const [availableFromError, setAvailableFromError] = useState(false)

  const formValidation: () => boolean = () => {
    let valid = true

    const availableToValue = (availableToRef != null) && availableToRef.current
    if (availableToValue != null && availableToValue !== false) {
      if ((newProduct != null) && (newProduct.availableTo != null) && (newProduct.availableFrom != null) && (newProduct.availableTo < newProduct.availableFrom)) {
        availableToValue.setCustomValidity('開始日よりも後の日付にしてください')
      } else {
        availableToValue.setCustomValidity('')
      }
      const ok = availableToValue.validity.valid
      setAvailableToError(!ok)
      valid = ok
    }

    const availableFromValue = availableFromRef?.current
    if ((availableFromValue != null) && (newProduct != null)) {
      if (newProduct.availableFrom < formatted) {
        availableFromValue?.setCustomValidity('本日以降の日付にしてください')
      } else {
        availableFromValue?.setCustomValidity('')
      }
      const ok = availableFromValue?.validity.valid
      setAvailableFromError(!ok)
      valid = ok
    }

    return valid
  }

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
          <Typography variant='subtitle2' align='center' mb={3}>
            <DiamondIcon />
            {' 商品情報編集 '}
            <DiamondIcon />
          </Typography>
          <Typography variant='body2' sx={{ textAlign: 'center', mb: 2 }}>
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
                  {CategoriesList.map((category) => (
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
                label='掲載開始日'
                fullWidth
                defaultValue={newProduct.availableFrom}
                variant='standard'
                InputLabelProps={{
                  shrink: true
                }}
                inputRef={availableFromRef}
                error={availableFromError}
                helperText={availableFromError && availableFromRef?.current?.validationMessage}
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
                inputRef={availableToRef}
                error={availableToError}
                helperText={availableToError && availableToRef.current != null && availableToRef.current.validationMessage}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant='contained'
                  type='submit'
                  disabled={ !((newProduct.name.length > 0) && (newProduct.introduction.length > 0) && (newProduct.categoryId > 0) && (newProduct.availableFrom.length > 0)) }
                  onClick={(e) => { if (formValidation()) { void handleFormData(e) } }}
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
