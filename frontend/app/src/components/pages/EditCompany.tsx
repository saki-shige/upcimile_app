import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Grid, TextField, Container, Paper, Typography, Box } from "@mui/material";

import ImageForm from "../layouts/ImageForm";
import { getSingleCompany, updateCompany } from "../../lib/api/company";


type FormData = {
  name?: string
  introduction?: string
  address?: string
  numberOfEmployees?: number
  capital?: number
  dateOfEstablishment?: Date
  corporateSite?: string
}

const EditCompany: React.FC = () => {
  const [ company, setCompany ] = useState<FormData>();
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [ preImage, setPreImage] = useState<string>();
  const navigation = useNavigate();;
  const {id} = useParams<{id: string}>();
  const [ changeImage, setChangeImage ] = useState<boolean>(false);

  const handleGetCompany = async(id:string) => {
    try {
      const res = await getSingleCompany(id)
      console.log(res)

      if (res.status === 200) {
        console.log('商品詳細を取得しました')
        setCompany(res.data)
        setPreImage(res.data.image.url)
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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if(company){
      formData.append("company[name]", company.name || "");
      changeImage && (formData.append("company[image]", croppedFile || ""));
      formData.append("company[introduction]", company.introduction || "");
      formData.append("company[address]", company.address || "");
      formData.append("company[numberOfEmployees]", String(company.numberOfEmployees));
      formData.append("company[capital]", String(company.capital));
      formData.append("company[dateOfEstablishment]", String(company.dateOfEstablishment) || "");
      formData.append("company[corporateSite]", String(company.corporateSite) || "");
    }

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
    {company && (
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            商品情報編集
          </Typography>
          <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>
            商品画像
          </Typography>
          <Grid container spacing={3}>
            {changeImage ? (
              <>
              <Grid item xs={12}>
                <ImageForm setCroppedFile={setCroppedFile}/>
              </Grid>
              <Grid item xs={12} sx={{textAlign:'center'}}>
                <Button onClick={()=>setChangeImage(false)}>元の画像に戻す</Button>
              </Grid>
              </>
            ) :(
              <>
            <Grid item xs={12}>
              <Paper
                sx={{
                  width: 400,
                  height: 300,
                  mx: 'auto',
                  borderRadius: 0,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${preImage})`,
                }}
              >
            </Paper>
            </Grid>
            <Grid item xs={12} sx={{textAlign:'center'}}>
              <Button onClick={()=>setChangeImage(true)}>画像を変更する</Button>
            </Grid>
            </>
            )}
            <Grid item xs={12}>
              <TextField
                required
                name = "name"
                label="名前"
                fullWidth
                defaultValue={company.name}
                autoComplete="given-name"
                variant="standard"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="introduction"
                label="説明"
                multiline
                minRows={3}
                maxRows={4}
                fullWidth
                defaultValue={company.introduction}
                variant="standard"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="address"
                label="住所"
                multiline
                minRows={3}
                maxRows={4}
                fullWidth
                defaultValue={company.address}
                variant="standard"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type='number'
                name="numberOfEmployees"
                label="従業員数"
                fullWidth
                defaultValue={company.numberOfEmployees}
                variant="standard"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type='number'
                name="capital"
                label="資本金"
                fullWidth
                defaultValue={company.capital}
                variant="standard"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type='date'
                name='dateOfEstablishment'
                label="設立年月日"
                fullWidth
                defaultValue={company.dateOfEstablishment}
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="corporateSite"
                label="会社HP"
                multiline
                minRows={3}
                maxRows={4}
                fullWidth
                defaultValue={company.corporateSite}
                variant="standard"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleFormData}
                  sx={{ mt: 3, ml: 1 }}
                >
                  更新する
                </Button>
              </Box>
            </Grid>
          </Grid>
          </Paper>
      </Container>
      )};
    </>
  );
};

export default EditCompany;
