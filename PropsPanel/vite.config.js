// import { defineConfig } from 'vite'
// import { svelte } from '@sveltejs/vite-plugin-svelte'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [svelte()],
// })



// import { defineConfig } from "vite";
// import { svelte } from "@sveltejs/vite-plugin-svelte";

// export default defineConfig({
//   plugins: [svelte({ compilerOptions: { customElement: true } })],
//   build: {
//     lib: {
//       entry: "src/index.js",
//       formats: ["es"],
//     },
//     rollupOptions: {
//       output: {
//         entryFileNames: "my-svelte-lib.js"
//       }
//     }
//   }
// });



// import { defineConfig } from "vite";
// import { svelte } from "@sveltejs/vite-plugin-svelte";

// export default defineConfig({
//   plugins: [svelte({ compilerOptions: { customElement: true } })],
//   build: {
//     lib: {
//       entry: "src/index.js",
//       formats: ["es","iife"],
//     },
//     rollupOptions: {
//       output: {
//         entryFileNames: "my-svelte-lib.js"
//       }
//     }
//   }
// });




import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: { customElement: true }
    })
  ],
  build: {
    target: "es2015",
    lib: {
      entry: "src/index.js",
      name: "mcxa_select",
      formats: ["es", "iife"],
      fileName: (format) => `mcxa_select.${format}.js`
    },
    rollupOptions: {
      output: {
        name: "mcxa_select"
      }
    }
  }
});





// // vite.config.js（如果用 Vite 打包）
// import { svelte } from '@sveltejs/vite-plugin-svelte';
// import { defineConfig } from 'vite';

// export default defineConfig({
//   plugins: [
//     svelte({
//       compilerOptions: {
//         customElement: true, // 必须启用自定义元素模式
//         accessors: true, // 确保组件属性可通过 JS 访问（默认 true，但显式声明更安全）
//       },
//       // 禁用 Tree-shaking（避免打包时误删依赖）
//       experimental: {
//         disableDependencyReinjection: true,
//       },
//     }),
//   ],
//   build: {
//     lib: {
//       entry: 'src/components/variable-excel.svelte', // 你的组件入口
//       name: 'MySvelteLib',
//       formats: ['iife'], // 确保输出 IIFE 格式
//       fileName: 'my-svelte-lib',
//     },
//     rollupOptions: {
//       // 外部化不需要打包的依赖（如果组件依赖外部库，避免重复打包）
//       external: [],
//       output: {
//         // 全局变量声明（如果有外部依赖，需要映射）
//         globals: {},
//       },
//     },
//   },
// });