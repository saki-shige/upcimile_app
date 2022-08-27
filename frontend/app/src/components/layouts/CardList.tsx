import React, { FC, useContext } from 'react'
import { Link } from 'react-router-dom'

import { Card, Typography, CardContent, Grid, CardActionArea, CardMedia, Button } from '@mui/material'

import { Product, Company } from '../../interface'
import { MessageContext } from '../providers/MessageProvider'
import { CompanyAuthContext } from '../providers/CompanyAuthProvider'
import { deleteProduct } from '../../lib/api/product'

interface Props {
  items: Product[] | Company[]
  type: 'products' | 'companies'
  provider?: boolean
  update?: boolean
  setUpdate?: React.Dispatch<React.SetStateAction<boolean>>
}
export const CardList: FC<Props> = ({ items, type, provider, update, setUpdate }) => {
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)
  const { currentCompany } = useContext(CompanyAuthContext)

  const handleClickDeleteProduct: (item: Product) => Promise<void> = async (item) => {
    if (currentCompany != null && currentCompany.id !== item.companyId) {
      setOpen(true)
      setMessage('ログインしてください')
      setSeverity('error')
      return
    }

    try {
      const res = await deleteProduct(String(item.id))

      if (res.status === 200) {
        console.log(res.data)
        setOpen(true)
        setMessage('商品を削除しました。')
        setSeverity('success')
        update != null && setUpdate != null && setUpdate(!update)
      } else {
        throw new Error()
      };
    } catch (err) {
      console.log(err)
      setOpen(true)
      setMessage('商品の削除に失敗しました。')
      setSeverity('error')
    };
  }

  return (
    <Grid container spacing={1} sx={{ px: 8 }}>
      {items.map((item, index) => (
        <Grid item data-testid={`${type}`} key={`${type}_${index}`} xs={12} sm={6} md={3}>
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 0, borderRadius: 0 }}
          >
            <CardActionArea component={Link} to={`/${type}/${item.id}`} data-testid={`${type}_${index}`}>
              <CardMedia
                component='img'
                image={(item.image != null) ? item.image.url : ''}
                alt={item.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant='h5' component='h2'>
                  {item.name}
                </Typography>
                <Typography>
                  {item.introduction}
                </Typography>
              </CardContent>
            </CardActionArea>
                {(provider === true) && (type === 'products') && (
                  <>
                    <Typography>
                      <Link to={`/products/edit/${item.id}`}>商品を編集する</Link>
                    </Typography>
                    <Button onClick={ () => { void handleClickDeleteProduct(item as Product) } }>
                      商品を削除する
                    </Button>
                  </>
                )}
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
