import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Button, Box, MenuItem, Grid, Typography,TextField, Container, Paper } from "@mui/material";

import ImageForm from '../layouts/ImageForm';
import { CompanyAuthContext } from '../providers/CompanyAuthProvider';
import { createProduct } from '../../lib/api/product';
import { FormProduct } from '../../interface';

export default function CreateProduct() {
  // const { currentCompany } = useContext(CompanyAuthContext);
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const today = new Date();
  const navigation = useNavigate();;
  const formatted = today
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .join("-");

  const [ product, setProduct ] = useState<FormProduct>({
    name: '',
    introduction: '',
    availableFrom: formatted,
    availableTo: undefined,
    canBeProvided: true,
    companyId: 1,
    categoryId: 1,
  });

  const categories = [
    {value: 1, label:'食べ物'},
    {value: 2, label:'場所'}
  ];

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value });
  };

  const handleFormData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    console.log(croppedFile)

    const formData = new FormData();
      formData.append("product[name]", product.name || '');
      formData.append("product[image]", croppedFile || '');
      formData.append("product[introduction]", product.introduction || "");
      formData.append("product[availableFrom]", String(product.availableFrom) || "");
      formData.append("product[availableTo]", String(product.availableTo) || "");
      formData.append("product[companyId]", String(product.companyId) || "");
      formData.append("product[categoryId]", String(product.categoryId) || "");

    try {
      console.log(formData)
      const res = await createProduct(formData);
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
  };

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            商品登録
          </Typography>
          <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>
            商品画像
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ImageForm setCroppedFile={setCroppedFile}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name = "name"
                label="名前"
                fullWidth
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
                  defaultValue={1}
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
                defaultValue={formatted}
                fullWidth
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
                  登録する
                </Button>
              </Box>
            </Grid>
          </Grid>
          </Paper>
      </Container>
    </>
  );
}
