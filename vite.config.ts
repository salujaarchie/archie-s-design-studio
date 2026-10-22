import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Base path:
// - "/" if hosted at root domain (e.g. salujaarchie.github.io or custom domain)
// - "/archie-s-design-studio/" if hosted at repo subpath (salujaarchie.github.io/archie-s-design-studio/)
const getBasePath = () => {
  if (process.env.GITHUB_PAGES_SUBPATH) return "/archie-s-design-studio/";
  return "/";
};

export default defineConfig({
  base: getBasePath(),
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});
