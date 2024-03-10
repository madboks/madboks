import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import { useMediaDevices } from 'react-media-devices'
import * as z from 'zod'

import { BarcodeScanner } from '@/components/ui/barcode'
import { useBarcode } from '@/hooks/useBarcode'

import { RegisterForm, type RegisterFormProps } from './components/RegisterForm'

import { type LoaderType as registrationLoaderType } from '@/pages/registration/loader'
import { useDebounce } from '@/hooks/useDebounce'

const FormSchema = z.object({
  barcode: z
    .string()
    .min(4, {
      message: 'Bar Code must be at least 4 numbers.'
    }),
  amount: z
    .number()
    .positive()
    .gte(1, {
      message: 'The minimum number of items must be 1'
    })
    .lte(30, {
      message: 'Are you sure that you want to add more than 30 items?'
    })
})

export function Component () {
  const { vegetables, countries } = useRouteLoaderData('registration') as registrationLoaderType

  const [barcode, setBarcode] = React.useState<string | undefined>()
  const [product, setProduct] = React.useState<RegisterFormProps['product'] | undefined>()

  const barcodeDebounced = useDebounce(barcode as string, 700)
  const { devices } = useMediaDevices({
    constraints: { video: true, audio: true }
  })
  const { get: getBarcodeInfo } = useBarcode()

  const videoDevice = devices?.find(
    ({ kind, label }) => kind === 'videoinput' && label.includes('back')
    // ({ kind, label }) => kind === 'videoinput'
    // ({ kind, label }) => kind === 'nocamera'
  )

  React.useEffect(() => {
    if (!barcodeDebounced) {
      return
    }

    getBarcodeInfo(barcodeDebounced)
      .then(response => {
        const {
          country: { code: countryCode },
          vegetable: { id: vegetableId },
          ...rest
        } = response.data

        setProduct({
          countryCode,
          vegetableId,
          ...rest
        })
      })
  }, [barcodeDebounced])

  const handleBarcodeError = (error: string) => console.log(error)

  const handleBarcodeChange = (code: string) => {
    if (isNaN(Number(code))) { return console.log(code) }

    if (code.length < 4) {
      setProduct(undefined)
      return
    }

    setBarcode(code)
  }

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log('values', data)
  }

  return (
    <>
      <div className='grow flex flex-col'>
        <div>
          <span className='font-semibold text-sm'>Camera</span>
          <span className='text-xs'> {videoDevice?.label}</span>
        </div>
        <div className='grow flex flex-col rounded-lg overflow-hidden w-full h-[15rem]'>
          {(videoDevice != null)
            ? <BarcodeScanner
                device={videoDevice.deviceId}
                onChange={handleBarcodeChange}
                onError={handleBarcodeError}
              />
            : 'No se ha detectado ninguna camara'}
        </div>
      </div>

      <RegisterForm
        key={product?.id ?? barcode}
        countries={countries}
        barcode={barcode}
        product={product}
        vegetables={vegetables}
        onBarcodeChange={handleBarcodeChange}
        onReset={() => setBarcode(undefined)}
        onSubmit={handleSubmit}
      />
    </>
  )
};

Component.displayName = 'NewProduct'
