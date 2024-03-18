import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import tailwind, { tailwindHMR } from 'stencil-tailwind-plugin';

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.tsx', './src/**/*.css', './src/index.html'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

export const config: Config = {
  namespace: 'naoned-dijkstra',
  plugins: [
    tailwind(),
    tailwindHMR(),
    postcss({
      plugins: [
        require('postcss-import'),
        require('tailwindcss')('./tailwind.config.js'),
        autoprefixer(),
        ...(process.env.NODE_ENV === 'production' ? [purgecss, require('cssnano')] : []),
      ],
    }),
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [{ src: 'assets' }, { src: 'pages' }, { src: 'workers' }],
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
};
