
import React, { FC, useContext, useState, useEffect,useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../providers/AuthProvider';
import { createProduct } from '../../lib/api/product';

import { FormControl, InputLabel, Input, MenuItem, Box, Button, TextField} from '@mui/material';

const CreateProduct: FC = () => {
  const { currentCompany } = useContext(AuthContext);
  const [name, setName] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>();
  const [availableFrom, setAvailableFrom] = useState<string>('');
  const [availableTo, setAvailableTo] = useState<string>();
  const [canBeProvided, setCanBeProvided] = useState<boolean>(true);
  // companyIdとcategoryIdのデフォルトを便宜上設定。最終的には削除
  const [companyId, setCompanyId] = useState<number>(1);
  const [categoryId, setCategoryId] = useState<number>(1);
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>("");

  const navigation = useNavigate();;

  const categories = [
    {value: 1, label:'食べ物'},
    {value: 2, label:'場所'}
  ];

  useEffect(()=>{
    console.log('商品情報取得開始');
    // companyIdとcategoryIdのデフォルトを便宜上設定。最終的にはログイン中のカンパニーのIDを設定
    // setCompanyId(currentCompany.id);
  },[]);

  const handleFormData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

      const formData = new FormData();
      formData.append("product[name]", name);
      formData.append("product[introduction]", introduction || "");
      // [pending]利用開始日はデフォルトで登録日を設定したい
      formData.append("product[availableFrom]", availableFrom || "");
      formData.append("product[availableTo]", availableTo || "");
      formData.append("product[canBeProvided]", String(canBeProvided));
      formData.append("product[companyId]", String(companyId));
      formData.append("product[categoryId]", String(categoryId));
      formData.append("product[image]", image || "");

    try {
      console.log(image)
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

  const uploadImage = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0]
    setImage(file)
  }, [])

  const previewImage = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
  }, [])


  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
          <input type="file" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={(e: React.ChangeEvent<HTMLInputElement>) => uploadImage(e)} />

        <FormControl>
          <InputLabel htmlFor="form-product-name">商品名</InputLabel>
          <Input id="form-product-name" type="text" onChange={(e) => setName(e.target.value)}/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="form-product-introduction">商品説明</InputLabel>
          <Input id="form-product-introfduction" type="text" onChange={(e) => setIntroduction(e.target.value)}/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="form-product-availablefrom">利用開始</InputLabel>
          <Input id="form-product-availablefrom" type="date" onChange={(e) => setAvailableFrom(e.target.value)}/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="form-product-available-to">掲載終了予定日</InputLabel>
          <Input id="form-product-available-to" type="date" onChange={(e) => setAvailableTo(e.target.value)}/>
        </FormControl>
        <FormControl >
          <TextField
            id="form-product-category-id"
            select
            label="カテゴリー"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            helperText="Please select category"
          >
            {categories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <Button variant="outlined" type="submit" onClick={handleFormData}>商品を登録する</Button>
      </Box>
    </>
  );
};

export default CreateProduct;
