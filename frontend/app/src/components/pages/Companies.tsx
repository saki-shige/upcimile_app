import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCompanies } from "../../lib/api/company";
import { Company } from "../../interface";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const Companies: React.FC = () => {
  const [ Companies, setCompanies ] = useState<Company[]>([])
  const navigation = useNavigate();

  const handleGetCompanies = async () => {
    try {
      const res = await getCompanies()
      console.log(res)

      if (res.status === 200) {
        console.log('ユーザー一覧を取得しました')
        setCompanies(res.data)
      } else {
        console.log("No users")
      }
    } catch (err) {
      console.log(err)
    }

  }

  const handleShowCompany = (e : React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.dataset.id;
    navigation(`/companies/${id}`);
  }

  useEffect(()=>{
    console.log('商品情報取得開始')
    handleGetCompanies()
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
