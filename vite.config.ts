import { defineConfig } from "vite";
import pluginReact from "@vitejs/plugin-react";
import pluginSVGR from "vite-plugin-svgr";
import pluginTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: { outDir: "build" },
  plugins: [pluginReact(), pluginSVGR(), pluginTsconfigPaths()],
  server: { open: true, port: 3000 },
});
