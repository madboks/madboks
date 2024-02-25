import { BarcodeFormat, DecodeHintType } from '@zxing/library'
import { useZxing } from 'react-zxing'

const hints = new Map()
const formats = [
  // BarcodeFormat.AZTEC,
  BarcodeFormat.CODABAR,
  BarcodeFormat.CODE_39,
  BarcodeFormat.CODE_93,
  BarcodeFormat.CODE_128,
  // BarcodeFormat.DATA_MATRIX,
  BarcodeFormat.EAN_8,
  BarcodeFormat.EAN_13,
  BarcodeFormat.ITF,
  // BarcodeFormat.MAXICODE,
  // BarcodeFormat.PDF_417,
  // BarcodeFormat.QR_CODE,
  BarcodeFormat.RSS_14,
  BarcodeFormat.RSS_EXPANDED,
  BarcodeFormat.UPC_A,
  BarcodeFormat.UPC_E,
  BarcodeFormat.UPC_EAN_EXTENSION
]

hints.set(DecodeHintType.POSSIBLE_FORMATS, formats)

export const BarcodeScanner = (
  { device, onChange, onError }:
  {
    device: string,
    onChange: (barcode: string) => void,
    onError: (error: string) => void,
  }
) => {
  const { ref } = useZxing({
    paused: !device,
    deviceId: device,
    hints,
    onDecodeResult (result) {
      onChange(result.getText())
    },
    onDecodeError(error) {
      onError(error.message)
    },
    onError(error) {
      onError((error as TypeError).message)
    },
  })

  return (
    <video ref={ref} className='h-fit grow aspect-auto' />
  )
}
