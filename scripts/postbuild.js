import { copyFileSync } from 'fs'
import { join } from 'path'

const dir = join(__dirname, '..')

copyFileSync(join(dir, 'src', 'types.ts'), join(dir, 'dist', 'types.ts'))
