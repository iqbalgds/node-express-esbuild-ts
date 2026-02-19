import path from 'node:path';
import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import copy from 'esbuild-copy-static-files';
import postcss from 'postcss';
import postcssUrl from 'postcss-url';

const isWatch = process.argv.includes('--watch');

const ctx = await esbuild.context({
  entryPoints: [
    'src/client/main.ts',
    'src/styles/main.scss'
  ],
  bundle: true,
  outdir: 'dist/build',
  platform: 'browser',
  target: ['es2017'],
  external: ['/assets/*'],
  plugins: [
    copy({
      src: './node_modules/govuk-frontend/dist/govuk/assets',
      dest: './public/assets',
      dereference: true
    }),
    sassPlugin({
      loadPaths: [
        path.resolve('./node_modules'),
        path.resolve('./src')
      ],
      async transform(source) {
        const { css } = await postcss([
          postcssUrl({
            // Leave absolute URLs as-is
            filter: (asset) => !asset.url.startsWith('/'),
          })
        ]).process(source, { from: undefined });
        return css;
      }
    })
  ],
  minify: !isWatch,
});

if (isWatch) {
  await ctx.watch();
  console.log("Watching for changes...");
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
