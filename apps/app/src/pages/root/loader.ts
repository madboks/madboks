import { redirect } from 'react-router-dom'

import meService from '@/services/meService'

export type RootLoaderReturn = Response | true

export async function loader(): Promise<RootLoaderReturn> {
  try {
    const me = await meService.me()

    return me
  }
  catch (error) {
    return redirect('/login')
  }
}
