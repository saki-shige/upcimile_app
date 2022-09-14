import React from 'react'

import { Box, Typography } from '@mui/material'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'

import { useHandleGetCreators } from '../hooks/creators'
import { StyledIndexBackground, StyledTitleBox } from '../styled/Styled'
import { BarCardList } from '../layouts/BarCardList'

const Creators: React.FC = () => {
  const creators = useHandleGetCreators()

  return (
    <>
      <StyledIndexBackground>
      <Box sx={{ mb: 5 }}>
          <StyledTitleBox>
            <Typography
              variant='subtitle2'
            >
              <AccessibilityNewIcon />{' CREATORS '}<AccessibilityNewIcon />
            </Typography>
          </StyledTitleBox>
        </Box>
        {(creators != null) &&
          <BarCardList items={creators} />
        }
    </StyledIndexBackground>
    </>
  )
}

export default Creators
