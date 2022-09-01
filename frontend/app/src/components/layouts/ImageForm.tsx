import React, { useRef, FC, useState, useCallback } from 'react'
import ImageCropper from './imageCropper'

interface Props {
  setCroppedFile: React.Dispatch<React.SetStateAction<File | null>>
}
const ImageForm: FC<Props> = ({ setCroppedFile }) => {
  const previewCanvasRef = useRef(null)
  const [src, setSrc] = useState('')
  const [open, setOpen] = useState(false)

  const handleChangeFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file =
      (e.target.files !== null) ? e.target.files[0] : null
      if (file != null) {
        const reader = new FileReader()
        reader.addEventListener('load', () =>
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-base-to-string
          (reader.result != null) && (setSrc(reader.result.toString() || ''))
        )
        reader.readAsDataURL(file)
        setOpen(true)
      }
    },
    [setSrc]
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <canvas
        ref={previewCanvasRef}
        style={{
          objectFit: 'contain',
          width: '400px',
          height: '300px',
          border: '1px solid'
        }}
      />
      <input
        type='file'
        accept='.png,.jpg,.jpeg'
        onChange={handleChangeFile}
        style={{ margin: '8px' }}
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
