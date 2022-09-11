import React, { FC, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { respondToOffer, getMyOffers, getOffersToMe } from '../../lib/api/offer'
import { MyOffers, OffersToMe } from '../../interface'
import { auth } from '../../lib/api/firebase'

interface Props {
  type: 'myOffers' | 'offersToMe'
}

export const BasicTable: FC<Props> = ({ type }) => {
  const [offers, setOffers] = useState<MyOffers[] | OffersToMe[]>()
  const navigation = useNavigate()
  const commentForStatus: (status: boolean | undefined) => string | undefined = (status) => {
    let comment

    switch (status) {
      case null:
        comment = '未確認です'
        break
      case true:
        comment = '承認されました'
        break
      case false:
        comment = '否認されました'
        break
    }

    return comment
  }

  const handleRespondToOffer: (id: number, type: 'accept' | 'decline') => Promise<void> = async (id, type) => {
    console.log(type)
    const res = await respondToOffer(id, type)
    console.log(res.data)
    await handleGetOffers()
  }

  const handleGetMyOffers: () => Promise<void> = async () => {
    console.log('offer')
    const currentUser = auth.currentUser
    console.log(currentUser)
    if (currentUser != null) {
      const idToken = await currentUser.getIdToken(true)
      console.log(idToken)
      const data = { idToken }
      const res = await getMyOffers(data)
      setOffers(res.data)
      console.log(res.data)
    } else {
      console.log('ログインしてください')
    }
  }

  const handleGetOffersToMe: () => Promise<void> = async () => {
    const res = await getOffersToMe()
    setOffers(res.data)
    console.log(res.data)
  }

  const handleGetOffers: () => Promise<void> = async () => {
    type === 'offersToMe' ? await handleGetOffersToMe() : await handleGetMyOffers()
  }

  useEffect(() => {
    void handleGetOffers()
  }, [])

  return (
    <>
      {(offers != null)
        ? (
    <TableContainer component={Paper}>
        <Table sx={{ mx: 'auto', maxWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">商品</TableCell>
              <TableCell align="right">{type === 'myOffers' ? '提供企業' : 'クリエイター'}</TableCell>
              <TableCell align="right">承認状況</TableCell>
              { type === 'offersToMe' &&
                <TableCell align="center">response</TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer) => (
              <TableRow
                key={offer.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link to={`products/${offer.product.id}`}>{offer.product.name}</Link>
                </TableCell>
                {(type === 'myOffers')
                  ? (
                    <>
                      <TableCell align="right">{offer.product.company?.name}</TableCell>
                      <TableCell align="right">{commentForStatus(offer.isAccepted)}</TableCell>
                    </>
                    )
                  : (
                    <>
                      <TableCell align="right">{'creator' in offer && offer.creator.name}</TableCell>
                      <TableCell align="right">{commentForStatus(offer.isAccepted)}</TableCell>
                      <TableCell align="center">
                          <Button disabled={offer.isAccepted === false} onClick={() => { void handleRespondToOffer(offer.id, 'decline') }}>否認する</Button>
                          <Button disabled={offer.isAccepted} onClick={() => { void handleRespondToOffer(offer.id, 'accept') }}>承認する</Button>
                      </TableCell>
                    </>
                    )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
          )
        : (
          <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {(type === 'offersToMe')
              ? (
                <>
              <Typography variant='subtitle1'>
                あなたへのオファーはありません。商品を登録してお待ちください。
              </Typography>
              <Button onClick={() => { navigation('/products/new') }}>商品を登録する</Button>
              </>
                )
              : (
              <>
              <Typography variant='subtitle1'>
                あなたのオファーはありません。気になる商品を見つけてオファーを送りましょう。
              </Typography>
              <Button onClick={() => { navigation('/products') }}>商品を探す</Button>
              </>
                )}
          </Container>
          )}
    </>
  )
}
