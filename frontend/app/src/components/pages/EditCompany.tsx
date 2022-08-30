import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Grid, TextField, Container, Paper, Typography, Box } from '@mui/material'

import ImageForm from '../layouts/ImageForm'
import { getSingleCompany, updateCompany } from '../../lib/api/company'
import { MessageContext } from '../providers/MessageProvider'
import { CompanyAuthContext } from '../providers/CompanyAuthProvider'

interface FormData {
  name?: string
  introduction?: string
  address?: string
  numberOfEmployees?: number
  capital?: number
  dateOfEstablishment?: Date
  corporateSite?: string
}

const EditCompany: React.FC = () => {
  const { id } = useParams<{id: string}>()
  const [company, setCompany] = useState<FormData>()
  const [croppedFile, setCroppedFile] = useState<File | null>(null)
  const [preImage, setPreImage] = useState<string>()
  const navigation = useNavigate()
  const [changeImage, setChangeImage] = useState<boolean>(false)
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)
  const { setCurrentCompany } = useContext(CompanyAuthContext)
  const corporateSiteRef = useRef<HTMLInputElement>(null)
  const [corporateSiteError, setCorporateSiteError] = useState(false)
  const CorporateSiteValidPattern = '^(https?|ftp)(://[-_.!~*\'()a-zA-Z0-9;/?:@&=+$,%#]+)$'

  const handleGetCompany: (id: string) => Promise<void> = async (id) => {
    try {
      const res = await getSingleCompany(id)
      console.log(res)

      if (res.status === 200) {
        console.log('商品詳細を取得しました')
        setCompany(res.data)
        setPreImage(res.data.image.url)
      } else {
        console.log('No products')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const formValidation: () => boolean = () => {
    let valid = true

    const addressValue = (corporateSiteRef != null) && corporateSiteRef.current
    if (addressValue != null && addressValue !== false) {
      const ok = addressValue.validity.valid
      setCorporateSiteError(!ok)
      valid = ok
      console.log('hoo')
    }
    console.log(valid)
    return valid
  }

  useEffect(() => {
    console.log('会社情報取得開始')
    ;(id != null) && handleGetCompany(id)
  }, [])

  const handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const { name, value } = e.target
    if (e.target.name === 'image' && (e.target.files != null)) {
      setCompany({ ...company, [name]: e.target.files[0] })
    } else {
      setCompany({ ...company, [name]: value })
    }
  }

  const handleFormData: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    if (company != null) {
      formData.append('company[name]', (company.name != null) ? company.name : '')
      changeImage && (formData.append('company[image]', (croppedFile != null) ? croppedFile : ''))
      formData.append('company[introduction]', (company.introduction != null) ? company.introduction : '')
      formData.append('company[address]', (company.address != null) ? company.address : '')
      formData.append('company[numberOfEmployees]', String(company.numberOfEmployees))
      formData.append('company[capital]', String(company.capital))
      formData.append('company[dateOfEstablishment]', (company.dateOfEstablishment != null) ? String(company.dateOfEstablishment) : '')
      formData.append('company[corporateSite]', (company.corporateSite != null) ? String(company.corporateSite) : '')
    }

    if (id != null) {
      try {
        console.log(formData)

        const res = await updateCompany(id, formData)
        console.log(res)

        if (res.status === 200) {
          console.log(res.data.message)
          setCurrentCompany(res.data.company)
          navigation('/companies')
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

  return (
    <>
    {(company != null) && (
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
                defaultValue={company.name}
                autoComplete='given-name'
                variant='standard'
                inputProps={ { required: true, maxLength: 30 } }
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='introduction'
                label='説明'
                multiline
                minRows={3}
                maxRows={4}
                fullWidth
                defaultValue={company.introduction}
                variant='standard'
                inputProps={ { maxLength: 300 } }
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='address'
                label='住所'
                multiline
                minRows={3}
                maxRows={4}
                fullWidth
                defaultValue={company.address}
                variant='standard'
                inputProps={ { maxLength: 300 } }
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='number'
                name='numberOfEmployees'
                label='従業員数'
                fullWidth
                defaultValue={company.numberOfEmployees}
                variant='standard'
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='number'
                name='capital'
                label='資本金'
                fullWidth
                defaultValue={company.capital}
                variant='standard'
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='date'
                name='dateOfEstablishment'
                label='設立年月日'
                fullWidth
                defaultValue={company.dateOfEstablishment}
                variant='standard'
                InputLabelProps={{
                  shrink: true
                }}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='corporateSite'
                label='会社HP'
                fullWidth
                value={company.corporateSite}
                variant='standard'
                inputRef={corporateSiteRef}
                error={corporateSiteError}
                helperText={corporateSiteError && corporateSiteRef.current != null && corporateSiteRef.current.validationMessage}
                inputProps={ { required: true, pattern: CorporateSiteValidPattern } }
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant='contained'
                  type='submit'
                  disabled={!(company.name != null && company.name.length > 0)}
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

export default EditCompany
