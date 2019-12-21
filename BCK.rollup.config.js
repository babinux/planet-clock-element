import {
  createDefaultConfig
} from '@open-wc/building-rollup';

// Rollup plugins
import litcss from 'rollup-plugin-lit-css';

//   import babel from 'rollup-plugin-babel';
//   import eslint from 'rollup-plugin-eslint';
//   import resolve from 'rollup-plugin-node-resolve';
//   import commonjs from 'rollup-plugin-commonjs';
//   import replace from 'rollup-plugin-replace';
//   import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';

// PostCSS plugins

import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

const configs = createDefaultConfig({
  input: './demo/index.html'
});

console.log(configs);


// map if you use an array of configs, otherwise just extend the config
export default {
  ...configs,
  plugins: [
    ...configs.plugins,
    postcss({

      plugins: [
        simplevars(),
        nested(),
        cssnext({
          warnForDuplicates: false,
        }),
        cssnano(),
      ],
      extensions: ['.css'],
    })
    // ,
    // litcss({
    //   include: ['**/*.css'],
    //   exclude: '',
    //   uglify: true
    // })
  ],
};


// if you need to support IE11 use "modern-and-legacy-config" instead.
// import { createCompatibilityConfig } from '@open-wc/building-rollup';
// export default createCompatibilityConfig({ input: './index.html' });

// export default createDefaultConfig({ input: './demo/index.html' });
