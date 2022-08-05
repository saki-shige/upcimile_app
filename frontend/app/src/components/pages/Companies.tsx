import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { handleGetCompanies } from "../functionals/companies";
import { Company } from "../../interface";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const Companies: React.FC = () => {
  const [ Companies, setCompanies ] = useState<Company[]>([])
  const navigation = useNavigate();

  const handleShowCompany = (e : React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.dataset.id;
    navigation(`/companies/${id}`);
  }

   useEffect(()=>{
    const f = async() => {
      const companies = await handleGetCompanies();
      setCompanies(companies);
    }
    f();
  },[]);

  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      {Companies.map((item) => (
        <div className={'itembox'} onClick={handleShowCompany} data-id={item.id}>
          <ImageListItem key={item.id}>
            <img src={item.image? item.image.url:''} alt={item.name} loading="lazy"/>
            <ImageListItemBar
              title={item.name}
              subtitle={<span>{item.introduction}</span>}
              position="below"
            />
          </ImageListItem>
        </div>
      ))}
    </ImageList>
  );

}

export default Companies;
