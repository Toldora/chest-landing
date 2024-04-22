import { defineConfig, loadEnv } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import autoprefixer from 'autoprefixer';
import * as fs from 'fs';
import * as path from 'path';
import { TEMPLATE_CONTEXT } from './src/template-context';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relative => path.resolve(appDirectory, relative);
const root = path.resolve(__dirname, resolveApp('src'));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // const viteEnv = Object.entries(env).reduce((acc, [key, value]) => {
  //   if (key.startsWith('VITE_')) {
  //     acc[`process.env.${key}`] = `${String(value)}`;
  //   }
  //   return acc;
  // }, {});
  // console.log(viteEnv);
  return {
    base: '/',
    publicDir: 'static',
    // define: viteEnv,
    ...(env.VITE_PORT
      ? {
          server: {
            port: Number(env.VITE_PORT),
          },
        }
      : {}),
    plugins: [
      handlebars({
        partialDirectory: path.resolve(__dirname, 'src/partials'),
        context: TEMPLATE_CONTEXT,
        helpers: {
          isGreaterOrEqual(arg1, arg2, options) {
            return arg1 >= arg2 ? options.fn(this) : options.inverse(this);
          },
        },
      }),
      createHtmlPlugin({
        minify: true,
        entry: '/src/main.js',
        template: '/index.html',
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(__dirname, 'src/icons')],
        symbolId: '[name]',
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "src/styles/base/_mixins.scss";
          @import "src/styles/base/_placeholders.scss";
          @import "src/styles/base/_functions.scss";
          @import "src/styles/base/_media.scss";
        `,
        },
      },
      devSourcemap: true,
      postcss: {
        plugins: [autoprefixer({})],
      },
    },
    resolve: {
      alias: {
        '@': `${root}/`,
        '@static': `${root}/../static`,
      },
    },
  };
});
