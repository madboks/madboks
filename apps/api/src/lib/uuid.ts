import { randomUUID } from 'crypto'

export function UUID (): string {
  return randomUUID()
}
