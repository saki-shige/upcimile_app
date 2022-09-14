import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Grid, TextField, Container, Paper, Typography, Box } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face'

import ImageForm from '../layouts/ImageForm'
import { updateCompany } from '../../lib/api/company'
import { MessageContext } from '../providers/MessageProvider'
import { CompanyAuthContext } from '../providers/CompanyAuthProvider'
import { useHandleGetSingleCompany } from '../hooks/companies'
import { Company } from '../../interface'

const EditCompany: React.FC = () => {
  const { id } = useParams<{id: string}>()
  const [newCompany, setNewCompany] = useState<Company>()
  const [croppedFile, setCroppedFile] = useState<File | null>(null)
  const navigation = useNavigate()
  const [changeImage, setChangeImage] = useState<boolean>(false)
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)
  const { setCurrentCompany } = useContext(CompanyAuthContext)
  const corporateSiteRef = useRef<HTMLInputElement>(null)
  const [corporateSiteError, setCorporateSiteError] = useState(false)
  const CorporateSiteValidPattern = '^(https?|ftp)(://[-_.!~*\'()a-zA-Z0-9;/?:@&=+$,%#]+)$'
  const company = useHandleGetSingleCompany(id != null ? id : '')

  const formValidation: () => boolean = () => {
    let valid = true

    const addressValue = (corporateSiteRef != null) ? corporateSiteRef.current : null
    if (addressValue != null) {
      const ok = addressValue.validity.valid
      setCorporateSiteError(!ok)
      valid = ok
    }

    return valid
  }

  useEffect(() => {
    setNewCompany(company)
  }, [company])

  const handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const { name, value } = e.target
    if (newCompany !== undefined) {
      if (e.target.name === 'image' && (e.target.files != null)) {
        setNewCompany({ ...newCompany, [name]: e.target.files[0] })
      } else {
        setNewCompany({ ...newCompany, [name]: value })
      }
    }
  }

  const handleFormData: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    if (newCompany != null) {
      formData.append('company[name]', (newCompany.name != null) ? newCompany.name : '')
      changeImage && (formData.append('company[image]', (croppedFile != null) ? croppedFile : ''))
      formData.append('company[introduction]', (newCompany.introduction != null) ? newCompany.introduction : '')
      formData.append('company[address]', (newCompany.address != null) ? newCompany.address : '')
      formData.append('company[numberOfEmployees]', (newCompany.numberOfEmployees != null) ? String(newCompany.numberOfEmployees) : '')
      formData.append('company[capital]', (newCompany.capital != null) ? String(newCompany.capital) : '')
      formData.append('company[dateOfEstablishment]', (newCompany.dateOfEstablishment != null) ? newCompany.dateOfEstablishment : '')
      formData.append('company[corporateSite]', (newCompany.corporateSite != null) ? newCompany.corporateSite : '')
    }

    if (id != null) {
      try {
        const res = await updateCompany(id, formData)

        if (res.status === 200) {
          setCurrentCompany(res.data.company)
          navigation('/companies/mypage')
        } else {
          throw new Error()
        }
      } catch (err) {
        setOpen(true)
        setMessage('商品の編集に失敗しました。')
        setSeverity('error')
      }
    }
  }

  return (
    <>
    {(newCompany != null) && (
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant='subtitle2' align='center' mb={5}>
            <FaceIcon />
              {' 企業情報編集 '}
            <FaceIcon />
          </Typography>
          <Typography variant='body2' sx={{ textAlign: 'center', mb: 2 }}>
            アイコン画像
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
                  backgroundImage: `url(${(company?.image !== undefined) ? company.image.url : ''})`
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
                defaultValue={newCompany.name}
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
                defaultValue={newCompany.introduction}
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
                defaultValue={newCompany.address}
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
                defaultValue={newCompany.numberOfEmployees}
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
                defaultValue={newCompany.capital}
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
                defaultValue={newCompany.dateOfEstablishment}
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
                value={newCompany.corporateSite}
                variant='standard'
                inputRef={corporateSiteRef}
                error={corporateSiteError}
                helperText={corporateSiteError && corporateSiteRef.current != null && corporateSiteRef.current.validationMessage}
                inputProps={ { pattern: CorporateSiteValidPattern } }
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant='contained'
                  type='submit'
                  disabled={!(newCompany.name != null && newCompany.name.length > 0)}
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
