import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";

function cleanAssetsFolder() {
   const assetsPath = path.resolve(
      path.dirname(new URL(import.meta.url).pathname),
      "../assets"
   );
   if (fs.existsSync(assetsPath)) {
      for (const file of fs.readdirSync(assetsPath)) {
         fs.rmSync(path.join(assetsPath, file), {
            recursive: true,
            force: true,
         });
      }
   }
}

// https://vite.dev/config/
export default defineConfig({
   base: "./",
   plugins: [react(), tailwindcss(), cleanAssetsFolder()],
   build: {
      outDir: "./../",
   },
});
