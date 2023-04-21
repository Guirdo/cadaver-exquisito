import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import Unfonts from 'unplugin-fonts/vite'

export default defineConfig({
  plugins: [
    solidPlugin(),
    Unfonts({
      custom:{
        families:[{
          name: 'Aleo',
          local: 'Aleo',
          src: './public/fonts/*.woff2',
          transform(font) {
            if (font.basename === 'Aleo-Bold') {
              font.weight = 700
            }
            return font
          }
        }],
        preload: true,
      }
    })
  ],
});