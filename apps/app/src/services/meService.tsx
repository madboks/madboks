import { api } from '@/utils/api'

async function me() {
  return await api({
    url: '/users/me',
  })
}

export default {
  me,
}
