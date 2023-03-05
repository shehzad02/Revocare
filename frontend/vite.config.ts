import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/exceed_threshold": {
        target: "https://bennycortese--zoom-fastapi-app.modal.run",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
