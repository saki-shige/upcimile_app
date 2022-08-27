import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Box, MenuItem, Grid, Typography, TextField, Container, Paper } from '@mui/material'

import ImageForm from '../layouts/ImageForm'
import { createProduct } from '../../lib/api/product'

const CreateProduct: FC = () => {
  const today = new Date()
  const navigation = useNavigate()
  const formatted = today
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .split('/')
    .join('-')
  const [croppedFile, setCroppedFile] = useState<File | null>(null)
  const [name, setName] = useState<string>('')
  const [introduction, setIntroduction] = useState<string>('')
  const [availableFrom, setAvailableFrom] = useState<string>(formatted)
  const [availableTo, setAvailableTo] = useState<string>('')
  const [categoryId, setCategoryId] = useState<string>('1')

  const categories = [
    { value: '1', label: '食べ物' },
    { value: '2', label: '場所' }
  ]

  const handleFormData: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> = async (e) => {
    e.preventDefault()

    console.log(croppedFile)

    const formData = new FormData()
    formData.append('product[name]', (name != null) ? name : '')
    formData.append('product[image]', (croppedFile != null) ? croppedFile : '')
    formData.append('product[introduction]', (introduction != null) ? introduction : '')
    formData.append('product[availableFrom]', (availableFrom != null) ? String(availableFrom) : '')
    formData.append('product[availableTo]', (availableTo != null) ? String(availableTo) : '')
    formData.append('product[categoryId]', (categoryId != null) ? String(categoryId) : '')

    try {
      console.log(formData)
      const res = await createProduct(formData)
      console.log(res)

      if (res.status === 200) {
        console.log(res.data.message)
        navigation('/products')
      } else {
        console.log('商品の保存に失敗しました')
      };
    } catch (err) {
      console.log(err)
    };
  }

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            商品登録
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
            商品画像
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ImageForm setCroppedFile={setCroppedFile}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name = "name"
                id = 'name'
                label="名前"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="introduction"
                label="説明"
                multiline
                minRows={3}
                maxRows={4}
                fullWidth
                variant="standard"
                onChange={(e) => setIntroduction(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                  required
                  select
                  name='categoryId'
                  label="商品カテゴリー"
                  fullWidth
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={`category_${category.value}`} value={category.value}>
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
                label="利用可能開始日"
                defaultValue={formatted}
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(e) => setAvailableFrom(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='date'
                name='availableTo'
                label="掲載完了日"
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(e) => setAvailableTo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={ !(name.length > 0 && introduction.length > 0) }
                  onClick={(e) => { void handleFormData(e) }}
                  sx={{ mt: 3, ml: 1 }}
                  >
                  登録する
                </Button>
              </Box>
            </Grid>
          </Grid>
          </Paper>
      </Container>
    </>
  )
}

export default CreateProduct
