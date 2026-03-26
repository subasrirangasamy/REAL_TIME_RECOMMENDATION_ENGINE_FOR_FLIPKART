import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: [
      { find: "@/components", replacement: path.resolve(__dirname, "./src/frontend/components") },
      { find: "@/pages", replacement: path.resolve(__dirname, "./src/frontend/pages") },
      { find: "@/hooks", replacement: path.resolve(__dirname, "./src/frontend/hooks") },
      { find: "@/context", replacement: path.resolve(__dirname, "./src/frontend/context") },
      { find: "@/types", replacement: path.resolve(__dirname, "./src/frontend/types") },
      { find: "@/data", replacement: path.resolve(__dirname, "./src/frontend/data") },
      { find: "@/services", replacement: path.resolve(__dirname, "./src/backend/services") },
      { find: "@/integrations", replacement: path.resolve(__dirname, "./src/backend/integrations") },
      { find: "@", replacement: path.resolve(__dirname, "./src") },
    ],
  },
}));
