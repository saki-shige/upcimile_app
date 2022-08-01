import React, { useState, useEffect } from "react"

import { getSingleCompany } from '../../lib/api/company';
import { Company } from "../../interface";

const SingleCompany = () => {
  const [ company, setCompany ] = useState<Company>();

  const handleGetCompany = async() => {
    let id = window.location.pathname.split('/companies')[1];
    if (id !== '') {
      id = id.split('/')[1];
    }

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
    }

    // setLoading(false)

  }

  useEffect(()=>{
    console.log('会社情報取得開始')
    handleGetCompany()
  },[]);

  return(
    <>
      {company?(
          <div>
             <img src={company.image ? company.image.url : ''} />
             <p>{company.name}</p>
             <p>{company.introduction}</p>
             <a target="_blank" href={company.corporateSite}>企業HPへ</a>
          </div>
      ):''}
    </>
  )
}

export default SingleCompany;
