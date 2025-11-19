import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: { customElement: true } // 编译成 Web Component
    })
  ],
  build: {
    target: "es2015", // 保证 class 继承 HTMLElement 正常
    lib: {
      entry: "src/index.js",      // 你的入口文件
      name: "MySvelteLib",        // 全局变量名（IIFE 会挂载到 window）
      formats: ["es", "iife"],    // 输出 ES Module 和 IIFE
      fileName: (format) => `my-svelte-lib.${format}.js`
    },
    rollupOptions: {
      // 如果需要把 IIFE 挂载到全局 window
      output: {
        name: "MySvelteLib"
      }
    }
  }
});