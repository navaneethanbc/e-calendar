import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: [
    "./src/components/Htmlpages/Terms.html",
    "./src/components/Htmlpages/Cookies_policy.html",
    "./src/components/Htmlpages/Privacy_policy.html",
  ],
});
