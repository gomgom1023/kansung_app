import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["gsap/ScrollTrigger"],// 필요한 GSAP 플러그인을 명시
    include: ["locomotive-scroll"], // LocomotiveScroll 강제 포함
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});