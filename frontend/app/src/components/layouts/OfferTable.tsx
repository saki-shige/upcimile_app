import React, { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
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

  const handleRespondToOffer: (id: string, type: 'accept' | 'decline') => Promise<void> = async (id, type) => {
    console.log(type)
    const res = await respondToOffer(id, type)
    console.log(res.data)
    handleGetOffers()
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

  const handleGetOffers: () => void = () => {
    type === 'offersToMe' && handleGetOffersToMe()
    type === 'myOffers' && handleGetMyOffers()
  }

  useEffect(() => {
    handleGetOffers()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ mx: 'auto', maxWidth: 1000 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>product</TableCell>
            <TableCell align="right">{type === 'myOffers' ? 'company' : 'creator'}</TableCell>
            <TableCell align="right">response</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(offers != null) && offers.map((offer) => (
            <TableRow
              key={offer.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={`products/${offer.product.id}`}>{offer.product.name}</Link>
              </TableCell>
              {(type === 'myOffers')
                ? (
                <TableCell align="right">{(offer.product.company != null) && offer.product.company.name}</TableCell>
                  )
                : (
                <TableCell align="right">{'creator' in offer && offer.creator.name}</TableCell>
                  )}
              {(type === 'myOffers')
                ? (
                <TableCell align="right">{offer.isAccepted ? 'accepted' : 'not accepted'}</TableCell>
                  )
                : (
                <TableCell align="right">
                  {offer.isAccepted
                    ? <Button onClick={() => { void handleRespondToOffer(offer.id, 'decline') }}>decline</Button>
                    : <Button onClick={() => { void handleRespondToOffer(offer.id, 'accept') }}>accept</Button>
                  }
                </TableCell>
                  )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
