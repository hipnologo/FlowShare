import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    port: 8080, // Make sure port matches
    host: true,  // Allow external connections
    open: true   // Open browser automatically
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': process.env
  },
  optimizeDeps: {
    exclude: ['events']
  }
});
