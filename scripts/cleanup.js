import { rmdirSync, existsSync } from 'fs'
import { join } from 'path'
import { files } from './../package.json'

files.map(file => {
  const path = join(__dirname, '..', file)

  if (existsSync(path)) {
    console.log(`removing ${file}`)
    rmdirSync(path, { recursive: true })
  }
})

console.log('cleanup done')
