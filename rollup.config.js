import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";

const pkg = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      // {
      //   file: pkg.main,
      //   format: "cjs",
      //   sourcemap: true,
      // },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      typescript({ tsconfig: "./tsconfig.json" }),
      commonjs(),
      resolve(),
    ],
  },
  {
    input: "build/esm/src/index.d.ts",
    output: [{ file: "build/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
