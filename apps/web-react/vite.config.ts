import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import commonjs from "vite-plugin-commonjs";

export default defineConfig({
   plugins: [
      react({
         jsxImportSource: "@emotion/react",
         babel: {
            plugins: ["@emotion/babel-plugin"],
         },
      }),
      tsconfigPaths(),
      svgr({
         // Set it to `true` to export React component as default.
         // Notice that it will override the default behavior of Vite.
         exportAsDefault: true,
         // svgr options: https://react-svgr.com/docs/options/
         svgrOptions: {},
      }),
      commonjs(),
   ],

   build: {
      commonjsOptions: {
         include: [],
      },
   },
});
