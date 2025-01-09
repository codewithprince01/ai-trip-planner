export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure this is set to your Vite build folder.
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
