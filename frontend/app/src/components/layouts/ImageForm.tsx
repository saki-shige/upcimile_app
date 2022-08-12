import React, { useRef } from "react";
import { FC } from "react";
import ImageCropper from "./imageCropper";
import { useState, useCallback } from "react";

import { Paper } from "@mui/material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

type Props = {
  setCroppedFile: React.Dispatch<React.SetStateAction<File | null>>
}
const ImageForm: FC<Props>= ({setCroppedFile}) => {
  const previewCanvasRef = useRef(null);
  const [src, setSrc] = useState("");
  // const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const handleChangeFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file =
        e.target.files !== null && e.target.files[0] ? e.target.files[0] : null;
      if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", () =>
          reader.result && (setSrc(reader.result.toString() || ''))
        );
        reader.readAsDataURL(file);
        setOpen(true);
      }
    },
    [setSrc]
  );

  return(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <canvas
        ref={previewCanvasRef}
        style={{
          objectFit: "contain",
          width: "400px",
          height: "300px",
          border: '1px solid'
        }}
      />
      <input
        type="file"
        accept=".png,.jpg,.jpeg"
        onChange={handleChangeFile}
        style={{margin: '8px'}}
      />
        <ImageCropper
          open={open}
          setOpen={setOpen}
          aspect={{ width: 400, height: 300 }}
          src={src}
          previewCanvasRef={previewCanvasRef}
          setCroppedFile={setCroppedFile}
        />
    </div>
  )
}

export default ImageForm
