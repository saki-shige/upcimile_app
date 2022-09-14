import React, { FC } from 'react'

import { Box, Typography } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face'

import { useHandleGetCompanies } from '../hooks/companies'
import { CardList } from '../layouts/CardList'
import { StyledIndexBackground, StyledTitleBox } from '../styled/Styled'

const Companies: FC = () => {
  const companies = useHandleGetCompanies()

  return (
    <StyledIndexBackground>
      <Box sx={{ mb: 5 }}>
        <StyledTitleBox>
          <Typography
            variant='subtitle2'
          >
            <FaceIcon />{' COMPANIES '}<FaceIcon />
          </Typography>
        </StyledTitleBox>
      </Box>
      {companies !== null && companies &&
        <CardList items={companies} type='companies'/>
      }
    </StyledIndexBackground>
  )
}

export default Companies
