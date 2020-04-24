import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
const dotenv = require('dotenv');

dotenv.config();

const SRC_PATH = process.env.SCRIPTS_INPUT_PATH;
const OUTPUT_PATH = process.env.SCRIPTS_OUTPUT_PATH;
const SW_SRC_PATH = process.env.SW_SCRIPT_INPUT_PATH;
const SW_OUTPUT_PATH = process.env.SW_SCRIPT_OUTPUT_PATH;

export default [
  {
    input: SRC_PATH,
    output: {
      file: OUTPUT_PATH,
      format: 'iife'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      }),
      terser()
    ]
  },
  {
    input: SW_SRC_PATH,
    output: {
      file: SW_OUTPUT_PATH,
      format: 'iife'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      }),
      terser()
    ]
  }
]