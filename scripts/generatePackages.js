import { existsSync, mkdirSync, rmdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { name, version, license, sdtBundles } from '../package.json'

const { FORCE_RECREATE } = process.env

/**
{
  "source": "src/index.ts",
  "main": "dist/index.js",
  "module": "dist/index.module.js",
  "esmodule": "dist/index.modern.js",
  "unpkg": "dist/index.umd.js"
}
 */

const _ = '../..'
const dir = join(__dirname, '..')
const buildPath = path => join(dir, 'build', path)
const src = path => join(_, 'src', path)
const createDist = path => sub => join(_, 'dist', path, `index${sub ? `.${sub}` : ''}.js`)
const script = path => `microbundle --cwd ${path}`
const generateJSON = obj => JSON.stringify({ name, version, license, ...obj }, null, 2)
const buildRootDirectory = buildPath('')

if (!existsSync(buildRootDirectory)) mkdirSync(buildRootDirectory)

const scripts = {}

for (const [key, { src: fileSrc, dist: fileDist }] of Object.entries(sdtBundles)) {
  const path = buildPath(key)

  if (existsSync(path)) {
    if (!FORCE_RECREATE) continue

    rmdirSync(path, { recursive: true })
  }

  const dist = createDist(fileDist)

  mkdirSync(path)
  writeFileSync(
    join(path, 'package.json'),
    generateJSON({
      source: src(fileSrc),
      main: dist(),
      module: dist('module'),
      esmodule: dist('modern'),
      unpkg: dist('umd'),
    }),
    { encoding: 'utf-8' }
  )

  scripts[`build-${key}`] = script(path.slice(dir.length + 1))
}

scripts['build-all'] = `${Object.keys(scripts)
  .reduce((acc, cur) => `${acc} && yarn ${cur}`, '')
  .slice(' && '.length)} && yarn postbuild`

// writing into the main package.json would feel wrong, not gonna lie
console.log(scripts)
