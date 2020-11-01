import { renameSync, mkdirSync, writeFileSync, copyFileSync, rmdirSync } from 'fs'
import { join } from 'path'
import { author, version, description, main, module, types as npmTypes } from '../package.json'

const createPackageJSON = dist =>
  writeFileSync(
    join(dist.dist, 'package.json'),
    JSON.stringify(
      {
        author,
        version,
        description: dist.description || description,
        main: main.replace('dist', '.'),
        module: module.replace('dist', '.'),
        types: npmTypes.replace('dist', '.'),
      },
      null,
      2
    ),
    { encoding: 'utf-8' }
  )

export const orderDists = ({ output, es_output, dists }) => ({
  buildEnd: () => {
    dists.forEach(dist => {
      if (dist.dist === 'dist') {
        renameSync(join(es_output, `${dist.src}.js`), join(output, `index.module.js`))
        return createPackageJSON(dist)
      }

      const [file, types] = [join(output, `${dist.src}.js`), join(output, `${dist.src}.d.ts`)]
      const nfile = join(dist.dist, 'index.js')

      mkdirSync(dist.dist)
      renameSync(file, nfile)
      renameSync(types, join(dist.dist, 'index.d.ts'))
      renameSync(join(es_output, `${dist.src}.js`), join(dist.dist, `index.module.js`))
      copyFileSync(join(output, 'types.d.ts'), join(dist.dist, 'types.d.ts'))
      createPackageJSON(dist)

      console.log(`${file} => ${nfile}`)
    })

    rmdirSync(es_output, { recursive: true })
  },
})
