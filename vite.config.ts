import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    testTimeout: 10000,
    include: ["tests/unit/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    setupFiles: "tests/setupTests.ts",
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/**/*"],
      exclude: ["src/tests/**/*", "src/lib/**/*"],
    },
  },
});
