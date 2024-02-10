import util from 'node:util'
import child from 'node:child_process'

const exec = util.promisify(child.exec);

console.log('🗃️ Updating the new database schema (postgres) ...')
await exec('yarn run prisma db pull')
await exec('yarn run prisma generate')

console.log('🗃️ Updating the old database schema (mysql) ...')
await exec('run prisma db pull --schema=./prisma-old/schema.prisma')
await exec('run prisma generate --schema=./prisma-old/schema.prisma')

console.log('✅ Schemas have been updated ...')
