import React, { FC } from 'react'
import { CardContent, Typography } from '@mui/material'
import { Company } from '../../interface'

interface Props {
  company: Company
}

export const CompanyIntroduction: FC<Props> = ({ company }) => {
  return (
    <CardContent>
      <Typography variant="h5" component="div" sx={{ textAlign: 'center', pb: 5 }}>
        {company.name}
      </Typography>
      <Typography variant="body2" sx={{ textAlign: 'center', pb: 3 }}>
        {company.introduction}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        住所: {(company.address != null) ? company.address : 'Unregistered'}<br />
        連絡先: {(company.email.length > 0) ? company.email : 'Unregistered'}<br />
        創業: {(company.dateOfEstablishment != null) ? company.dateOfEstablishment : 'Unregistered'}<br />
        従業員数: {(company.numberOfEmployees != null) ? company.numberOfEmployees : 'Unregistered'}<br />
        資本金: {(company.capital != null) ? company.capital : 'Unregistered'}<br />
      </Typography>
      {(company.corporateSite != null &&
        <Typography
          target="_blank"
          component='a'
          href={company.corporateSite}
          variant="body2"
          sx={{ textAlign: 'center', pb: 3 }}
        >
          詳しくは企業HPへ
        </Typography>
      )}
    </CardContent>
  )
}
