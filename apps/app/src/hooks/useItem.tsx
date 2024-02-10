import { post } from '@/utils/fetch'
import React from 'react'

export function useBarcode () {
  return {
    create: React.useCallback(async (barcode: string) => {
      return await post({ url: `items` })
    }, [])
  }
};
