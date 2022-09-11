import React, { useCallback, useEffect, useRef, useState, FC } from 'react'

import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, { centerCrop, Crop, makeAspectCrop, PercentCrop, PixelCrop } from 'react-image-crop'

import { Box, Button, Modal } from '@mui/material'
import { canvasPreview } from './canvasPreview'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  aspect: { height: number, width: number }
  src: string
  previewCanvasRef: React.RefObject<HTMLCanvasElement>
  setCroppedFile: (value: File) => void
}

const ImageCropper: FC<Props> = ({ open, setOpen, aspect, src, previewCanvasRef, setCroppedFile }) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const today = new Date().getTime()
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()

  const handleChange = useCallback((_: PixelCrop, percentCrop: PercentCrop) => {
    setCrop(percentCrop)
  }, [])

  const handleComplete = useCallback((c: PixelCrop) => {
    setCompletedCrop(c)
  }, [])

  const handleImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect.width / aspect.height))
    },
    [aspect]
  )

  const handleConfirm = useCallback(() => {
    previewCanvasRef.current?.toBlob((blob) => {
      if (blob != null) {
        setCroppedFile(
          new File([blob], `croppedImage${today}.png`, {
            type: 'image/png'
          })
        )
      }
    })
    setOpen(false)
  }, [previewCanvasRef, setCroppedFile, setOpen])

  useEffect(() => {
    ((imgRef.current != null) && previewCanvasRef && previewCanvasRef.current && completedCrop) && (
      canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        1,
        0
      )
    )
  }, [completedCrop])

  return (
    <>
      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', padding: 2 }}>
          <Box>
            <ReactCrop
              crop={crop}
              onChange={handleChange}
              onComplete={handleComplete}
              aspect={aspect.width / aspect.height}
            >
              <img
                ref={imgRef}
                alt='cropped-img'
                src={src}
                onLoad={handleImageLoad}
                style={{ maxHeight: '300px' }}
                crossOrigin='anonymous'
              />
            </ReactCrop>
          </Box>
          <Button
            variant='contained'
            type='submit'
            fullWidth
            onClick={handleConfirm}
            >
            確定
          </Button>
        </Box>
      </Modal>
    </>
  )
}

function centerAspectCrop (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): PixelCrop | PercentCrop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

export default ImageCropper
