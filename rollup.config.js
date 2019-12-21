import {
  createDefaultConfig
} from '@open-wc/building-rollup';

import postcss from 'rollup-plugin-postcss';


// PostCSS plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';



const configs = createDefaultConfig({
  input: './demo/index.html'
});



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
  ],
};

