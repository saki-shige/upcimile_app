import React, { FC, useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Link, useNavigate } from 'react-router-dom'

import { CompanyAuthContext } from '../providers/CompanyAuthProvider'
import { CreatorAuthContext } from '../providers/CreatorAuthProvider'
import { NavBarUser } from './NavBarUser'

const pages = [['Products', '/products'], ['Creators', '/creators'], ['Companies', '/companies']]

const ResponsiveAppBar: FC = () => {
  const { isCompanySignedIn, currentCompany } = useContext(CompanyAuthContext)
  const { isCreatorSignedIn, currentCreator } = useContext(CreatorAuthContext)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const handleOpenNavMenu: (e: React.MouseEvent<HTMLElement>) => void = (e) => {
    setAnchorElNav(e.currentTarget)
  }
  const handleOpenUserMenu: (e: React.MouseEvent<HTMLElement>) => void = (e) => {
    setAnchorElUser(e.currentTarget)
  }

  const handleCloseNavMenu: () => void = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu: () => void = () => {
    setAnchorElUser(null)
  }

  const navigation = useNavigate()

  return (
    <AppBar position="static" sx={{ bgcolor: 'inherit', color: 'primary.dark' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 80 }}>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            UPCIMILE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page[0]} onClick={() => { navigation(page[1]); handleCloseNavMenu() }}>
                  {page[0]}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            UPCIMILEs
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page[0]}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'inderit', display: 'block' }}
              >
                <Typography component={Link} to={page[1]} mx={1} sx={{ color: 'inherit', textDecoration: 'none' }}>{page[0]}</Typography>
              </Button>
            ))}
          </Box>

          {(isCompanySignedIn && (currentCompany != null))
            ? (
            <NavBarUser name={currentCompany.name} image={(currentCompany.image != null) ? currentCompany.image.url : ''} type='companies'/>
              )
            : ((isCreatorSignedIn && (currentCreator != null))
                ? (
            <NavBarUser name={currentCreator.name} image={(currentCreator.image != null) ? currentCreator.image : ''} type='creators'/>
                  )
                : (
            <Box sx={{ flexGrow: 0, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Box>
                <Tooltip title="Open settings">
                  <Button onClick={handleOpenUserMenu} sx={{ color: 'inherit', p: 0 }}>
                    Login
                  </Button>
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
                    <MenuItem onClick={() => { handleCloseUserMenu(); navigation('/companies/signin') }}>
                      企業ログイン
                    </MenuItem>
                    <MenuItem onClick={() => { handleCloseUserMenu(); navigation('/creators/signin') }}>
                      クリエイターログイン
                    </MenuItem>
                </Menu>
              </Box>
            </Box>
                  ))}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
