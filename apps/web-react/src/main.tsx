import React from "react";
import ReactDOM from "react-dom/client";
import "./global.scss";
import { RouterProvider } from "react-router-dom";
import { Providers } from "./components/provider/providers.tsx";
import { router } from "./routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
   // @ts-ignore
   <React.StrictMode>
      <Providers>
         <RouterProvider router={router} />
      </Providers>
   </React.StrictMode>
);
