import React, { useEffect, useState } from "react";

import { handleGetCompanies } from "../functionals/companies";
import { Company } from "../../interface";
import { CardList } from "../layouts/CardList";

import { Card, Box, Typography } from "@mui/material";

const Companies: React.FC = () => {
  const [ companies, setCompanies ] = useState<Company[]>([])

   useEffect(()=>{
    const f = async() => {
      const companies = await handleGetCompanies();
      setCompanies(companies);
    }
    f();
  },[]);

  return (
    <>
    <Box sx={{my: 5, px:10, mx: 'auto'}}>
      <Typography sx={{textAlign:'center'}}>
        企業一覧
      </Typography>
    </Box>
    <Card
      sx={{
        backgroundColor: 'white',
        width: '80%',
        maxWidth: 1100,
        py: 10,
        mx: 'auto',
        mb: 10,
        zIndex: 'modal',
        borderRadius: 2,
      }}
    >
      <CardList items={companies} type='companies'/>
    </Card>
    </>
  );

}

export default Companies;
