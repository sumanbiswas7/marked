import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import commonjs from "vite-plugin-commonjs";

// https://vitejs.dev/config/
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
   optimizeDeps: {
      include: ["@marked/utils", "@marked/*"],
   },
   build: {
      commonjsOptions: {
         include: [],
         exclude: ["@marked/*"],
      },
      rollupOptions: { external: ["react", "react/jsx-runtime", "react-router"] },
   },
});
