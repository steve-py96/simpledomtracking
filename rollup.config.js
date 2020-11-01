import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import { orderDists } from './scripts/rollup-orderDists'

const files = [
  { src: 'index', dist: 'dist', description: null },
  { src: 'mock', dist: 'mockElement', description: 'minimalist mocking lib' },
  { src: 'setAttributes', dist: 'setAttributes', description: 'looped setAttribute function' },
]

export default [
  {
    input: files.map(({ src }) => `./src/${src}.ts`),
    output: [
      {
        format: 'cjs',
        dir: './dist/',
      },
      {
        format: 'es',
        dir: './dist-es/',
      },
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
        rollupCommonJSResolveHack: false,
        clean: true,
      }),
      terser({ compress: { pure_getters: true, keep_infinity: true, passes: 10, side_effects: false } }),
      filesize(),
    ],
  },
  {
    input: `./${files[0].dist}/${files[0].src}.js`,
    output: {
      format: 'cjs',
      dir: `./${files[0].dist}/`,
    },
    plugins: [orderDists({ output: './dist/', es_output: './dist-es/', dists: files })],
  },
]
