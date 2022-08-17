import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { Button, Box, MenuItem, Grid, Typography,TextField, Container, Paper } from "@mui/material";

import { getSingleProduct } from '../../lib/api/product';
import ImageForm from '../layouts/ImageForm';
import { updateProduct } from '../../lib/api/product';
import { FormProduct } from '../../interface';

export default function EditProduct() {
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const navigation = useNavigate();;
  const {id} = useParams<{id: string}>();
  const [ preImage, setPreImage] = useState<string>();
  const [ changeImage, setChangeImage ] = useState<boolean>(false);
  const [ product, setProduct ] = useState<FormProduct>();

  const categories = [
    {value: 1, label:'食べ物'},
    {value: 2, label:'場所'}
  ];

  const handleGetProduct = async(id:string) => {
    try {
      const res = await getSingleProduct(id);
      console.log(res);
      if (res.status === 200) {
        console.log('商品詳細を取得しました');
        setProduct(res.data.product)
        setPreImage(res.data.product.image.url)
      } else {
        console.log("No products")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value });
  };

  const handleFormData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    console.log(croppedFile)

    const formData = new FormData();
    if(product){
      formData.append("product[name]", product.name || '');
      changeImage && (formData.append("product[image]", croppedFile || ''));
      formData.append("product[introduction]", product.introduction || "");
      formData.append("product[availableFrom]", String(product.availableFrom) || "");
      formData.append("product[availableTo]", String(product.availableTo) || "");
      formData.append("product[companyId]", String(product.companyId) || "");
      formData.append("product[categoryId]", String(product.categoryId) || "");
    }

    if(id){
      try {
        console.log(formData)
        const res = await updateProduct(id,formData);
        console.log(res);

        if (res.status === 200) {
          console.log(res.data.message);
          navigation("/products");
        } else {
          console.log("商品の保存に失敗しました");
        };
      } catch (err) {
        console.log(err);
      };
    }
  };

  useEffect(()=>{
    id && handleGetProduct(id)
  },[]);

  return (
    <>
    {product && (
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
                defaultValue={product.name}
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
                defaultValue={product.introduction}
                variant="standard"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                  select
                  name='categoryId'
                  label="商品カテゴリー"
                  fullWidth
                  defaultValue={product.categoryId}
                  onChange={handleOnChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.label} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type='date'
                name='availableFrom'
                label="利用可能開始日"
                fullWidth
                defaultValue={product.availableFrom}
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='date'
                name='availableTo'
                label="掲載完了日"
                fullWidth
                defaultValue={product.availableTo}
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
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
}
