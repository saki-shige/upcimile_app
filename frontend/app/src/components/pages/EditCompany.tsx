import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@mui/material";

import { Company } from "../../interface";
import { UpdateCompanyData } from "../../interface";
import { getSingleCompany, updateCompany } from "../../lib/api/company";


type FormData = {
  name: string
  image?: File
  introduction?: string
  address?: string
  numberOfEmployees?: number
  capital?: number
  dateOfEstablishment?: Date
  corporateSite?: string
}

const EditCompany: React.FC = () => {
  const [ company, setCompany ] = useState<FormData>({
    name: '',
  });
  const navigation = useNavigate();;
  const {id} = useParams<{id: string}>();

  const handleGetCompany = async(id:string) => {
    try {
      const res = await getSingleCompany(id)
      console.log(res)

      if (res.status === 200) {
        console.log('商品詳細を取得しました')
        setCompany(res.data)
      } else {
        console.log("No products")
      }
    } catch (err) {
      console.log(err)
    ;}
  };

  useEffect(()=>{
    console.log('会社情報取得開始')
    id && handleGetCompany(id)
  },[]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (e.target.name === 'image' && e.target.files){
      setCompany({...company, [name]: e.target.files[0]});
    }else{
      setCompany({ ...company, [name]: value });
    }
  };

  const handleFormData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const formData = new FormData();
      formData.append("company[name]", company.name);
      formData.append("company[image]", company.image || "");
      formData.append("company[introduction]", company.introduction || "");
      formData.append("company[address]", company.address || "");
      formData.append("company[numberOfEmployees]", String(company.numberOfEmployees));
      formData.append("company[capital]", String(company.capital));
      formData.append("company[dateOfEstablishment]", String(company.dateOfEstablishment) || "");
      formData.append("company[corporateSite]", String(company.corporateSite) || "");

    if(id){
      try {
        console.log(formData);

        const res = await updateCompany(id, formData);
        console.log(res);

        if (res.status === 200) {
          console.log(res.data.message);
          navigation("/companies");
        } else {
          console.log("会社情報の更新に失敗しました");
        };
      } catch (err) {
        console.log(err);
      };
    }
  };


  return(
    <>
    { company ? (
    <form>
      <input type="file" accept="image/*,.png,.jpg,.jpeg,.gif" name="image" id="image" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
      <div>
        <label htmlFor="name">会社名：</label>
        <input type="text" name="name" id="name" onChange={(e) => handleChange(e)} value={company.name}/>
      </div>
      <div>
        <label htmlFor="introduction">会社概要：</label>
        <input type="text" name="introduction" id="introduction" onChange={(e) => handleChange(e)} value={company.introduction}/>
      </div>
      <div>
        <label htmlFor="address">住所：</label>
        <input type="text" name="address" id="address" onChange={(e) => handleChange(e)} value={company.address}/>
      </div>
      <div>
        <label htmlFor="numberOfEmployees">従業員数：</label>
        <input type="number" name="numberOfEmployees" id="numberOfEmployees" onChange={(e) => handleChange(e)} value={company.numberOfEmployees}/>
      </div>
      <div>
        <label htmlFor="capital">資本金：</label>
        <input type="number" name="capital" id="capital" onChange={(e) => handleChange(e)} value={company.capital}/>
      </div>
      <div>
        <label htmlFor="dateOfEstablishment">設立：</label>
        <input type="date" name="dateOfEstablishment" id="dateOfEstablishment" onChange={(e) => handleChange(e)} value={String(company.dateOfEstablishment)}/>
      </div>
      <div>
        <label htmlFor="corporateSite">会社HP : </label>
        <input type="text" name="corporateSite" id="corporateSite" onChange={(e) => handleChange(e)} value={company.corporateSite}/>
      </div>
      <Button variant="outlined" type="submit" onClick={handleFormData}>会社情報を更新する</Button>
    </form>
    ):''}
  </>
  );
};

export default EditCompany;
