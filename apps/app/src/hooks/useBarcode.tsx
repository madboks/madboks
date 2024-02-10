import { get } from '@/utils/fetch'
import React from 'react'

export function useBarcode () {
  return {
    get: React.useCallback(async (barcode: string) => {
      return await get({ url: `products/${barcode}` })
    }, [])
  }
};
