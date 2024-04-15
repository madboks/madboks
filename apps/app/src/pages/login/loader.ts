import { redirect } from 'react-router-dom'

import meService from '@/services/meService'

export type LoginLoaderReturn = Response | true

export async function loader (): Promise<LoginLoaderReturn> {
  try {
    await meService.me()

    return redirect('/')
  } catch (error) {
    return true
  }
}
