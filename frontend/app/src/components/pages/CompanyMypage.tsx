import React, { useState, useEffect, useContext } from "react"

import { Typography, CardContent, Container, Box} from "@mui/material";

import { CompanyAuthContext } from "../providers/CompanyAuthProvider";
import { Company } from "../../interface";
import { getSingleCompany } from "../../lib/api/company";
import { IntroductionCard } from "../layouts/IntroductionCard";
import { CardList } from "../layouts/CardList";
import { BasicTable } from "../layouts/OfferTable";

const CompanyMyPage = () => {
  const { currentCompany } = useContext(CompanyAuthContext);
  const [ company, setCompany ] = useState<Company>();


  const handleGetCompany = async(id:string) => {
    try {
      const res = await getSingleCompany(id)
      if (res.status === 200) {
        console.log('商品詳細を取得しました');
        console.log(res.data);
        setCompany(res.data);
      } else {
        console.log("No products");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    currentCompany && handleGetCompany(String(currentCompany.id))
  },[]);

  return(
    <>
    {company ? (
      <IntroductionCard avatarImage={company.image? company.image.url : 'image'}>
        <Container
          sx={{
            width: 400,
            py: 10,
            mx: 'auto'
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" sx={{textAlign:'center', pb:5}}>
              {company.name}
            </Typography>
            <Typography variant="body2" sx={{textAlign:'center', pb:3}}>
              {company.introduction}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              住所: {company.address || 'Unregistered'}<br />
              連絡先: {company.email || 'Unregistered'}<br />
              創業: {company.dateOfEstablishment ? company.dateOfEstablishment : 'Unregistered'}<br />
              従業員数: {company.numberOfEmployees || 'Unregistered'}<br />
              資本金: {company.capital || 'Unregistered'}<br />
            </Typography>
            <Typography component='a' href={company.corporateSite} variant="body2" sx={{textAlign:'center', pb:3}}>
              詳しくは企業HPへ
            </Typography>
          </CardContent>
        </Container>

          <Container sx={{ py: 10 }}>
            <BasicTable type='offersToMe'></BasicTable>
          </Container>

        <Container sx={{ pb:8 }} maxWidth={false}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" color="inherit" paragraph>
              {`${company.name}の商品`}
            </Typography>
          </Box>
          {company.products ? (
            <CardList items={company.products} type='products' provider={true}></CardList>
          ) : '商品が登録されていません'}
        </Container>
      </IntroductionCard>
      ) : 'no company infomation'}
    </>
  )
}

export default CompanyMyPage;
