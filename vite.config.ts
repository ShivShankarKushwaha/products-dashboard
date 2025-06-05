import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    testTimeout: 10000,
    dir: "./tests/unit",
    setupFiles: "tests/setupTests.ts",
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/**/*"],
      exclude: ["src/tests/**/*", "src/lib/**/*"],
    },
  },
});
