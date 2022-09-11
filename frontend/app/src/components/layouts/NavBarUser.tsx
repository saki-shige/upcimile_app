import React, { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

import Cookies from 'js-cookie'

import { auth } from '../../lib/api/firebase'
import { signOut as firebaseSignOut } from 'firebase/auth'

import { signOut } from '../../lib/api/auth'
import { CompanyAuthContext } from '../providers/CompanyAuthProvider'
import { CreatorAuthContext } from '../providers/CreatorAuthProvider'

interface Props {
  name: string
  image?: string
  type: 'creators' | 'companies'
}

export const NavBarUser: FC<Props> = ({ name, image, type }) => {
  const { setIsCompanySignedIn, currentCompany } = useContext(CompanyAuthContext)
  const { setIsCreatorSignedIn } = useContext(CreatorAuthContext)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenUserMenu: (e: React.MouseEvent<HTMLElement>) => void = (e) => {
    setAnchorElUser(e.currentTarget)
  }

  const handleCloseUserMenu: () => void = () => {
    setAnchorElUser(null)
  }

  const navigation = useNavigate()

  const clickCompanySignOut: () => Promise<void> = async () => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        Cookies.remove('_access_token')
        Cookies.remove('_client')
        Cookies.remove('_uid')

        setIsCompanySignedIn(false)
        navigation('/')
        console.log('signed out successfully')
      } else {
        console.log('Failed to sign out')
      }
    } catch (err) {
      console.log(err)
    }
    setAnchorElUser(null)
  }

  const clickCreatorSignOut: () => Promise<void> = async () => {
    try {
      await firebaseSignOut(auth)
      console.log('ログアウトしました')
      setIsCreatorSignedIn(false)
      navigation('/')
    } catch (error) {
      console.log(error)
    }
    setAnchorElUser(null)
  }

  return (
    <Box sx={{ flexGrow: 0, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Typography
        variant="h6"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'block' },
          color: 'inherit'
        }}>
        {name}
      </Typography>
      <Box>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={image} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
            <MenuItem onClick={() => { setAnchorElUser(null); navigation(`${type}/mypage`) }}>
              マイページ
            </MenuItem>
              {type === 'companies'
                ? (
                <>
                  <MenuItem onClick={() => { setAnchorElUser(null); navigation('/products/new') }}>
                    商品を登録する
                  </MenuItem>
                  {(currentCompany != null) && (
                    <MenuItem onClick={() => { setAnchorElUser(null); navigation(`/companies/edit/${currentCompany.id}`) }}>
                      プロフィール情報を編集する
                    </MenuItem>
                  )}
                 <MenuItem onClick={() => { void clickCompanySignOut() }}>
                   ログアウト
                 </MenuItem>
                </>
                  )
                : (
            <MenuItem onClick={() => { void clickCreatorSignOut() }}>
              ログアウト
            </MenuItem>
                  )}
        </Menu>
      </Box>
    </Box>
  )
}
