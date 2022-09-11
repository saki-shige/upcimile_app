import React, { FC, useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Box, MenuItem, Grid, Typography, TextField, Container, Paper } from '@mui/material'
import DiamondIcon from '@mui/icons-material/Diamond'

import { CategoriesList } from '../../lib/api/categories'
import ImageForm from '../layouts/ImageForm'
import { createProduct } from '../../lib/api/product'
import { MessageContext } from '../providers/MessageProvider'

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
  const availableToRef = useRef<HTMLInputElement>(null)
  const [availableToError, setAvailableToError] = useState(false)
  const availableFromRef = useRef<HTMLInputElement>(null)
  const [availableFromError, setAvailableFromError] = useState(false)
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)

  const formValidation: () => boolean = () => {
    let valid = true

    const availableToValue = (availableToRef != null) && availableToRef.current
    if (availableToValue != null && availableToValue !== false) {
      if ((availableTo !== '') && (availableTo < availableFrom)) {
        availableToValue.setCustomValidity('開始日よりも後の日付にしてください')
      } else {
        availableToValue.setCustomValidity('')
      }
      const ok = availableToValue.validity.valid
      setAvailableToError(!ok)
      valid = ok
    }

    const availableFromValue = availableFromRef?.current
    if (availableFromValue != null) {
      if (availableFrom < formatted) {
        availableFromValue?.setCustomValidity('本日以降の日付にしてください')
      } else {
        availableFromValue?.setCustomValidity('')
      }
      const ok = availableFromValue?.validity.valid
      setAvailableFromError(!ok)
      valid = ok
    }

    console.log(valid)
    return valid
  }

  const handleFormData: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> = async (e) => {
    e.preventDefault()

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
        setOpen(true)
        setMessage('商品を登録しました')
        setSeverity('success')
        navigation('/companies/mypage')
      } else {
        throw new Error()
      }
    } catch (err) {
      console.log(err)
      setOpen(true)
      setMessage('商品の登録に失敗しました')
      setSeverity('error')
    }
  }

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant="subtitle2" align="center" mb={3}>
            <DiamondIcon />
            {' 商品登録 '}
            <DiamondIcon />
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ textAlign: 'center' }}>
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
                  {CategoriesList.map((category) => (
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
                label="掲載開始日"
                defaultValue={formatted}
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true
                }}
                inputRef={availableFromRef}
                error={availableFromError}
                helperText={availableFromError && availableFromRef?.current?.validationMessage}
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
                inputRef={availableToRef}
                error={availableToError}
                helperText={availableToError && availableToRef.current != null && availableToRef.current.validationMessage}
                onChange={(e) => setAvailableTo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={ !(name.length > 0 && introduction.length > 0 && categoryId.length > 0 && (availableFrom.length > 0)) }
                  onClick={(e) => { if (formValidation()) { void handleFormData(e) } }}
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
