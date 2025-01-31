/* eslint-disable no-undef */
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    react({
      include: "**/*.jsx",
    }),
  ],
  server:{
    host: '0.0.0.0'
  }
});
