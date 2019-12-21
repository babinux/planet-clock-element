import {
  createDefaultConfig
} from '@open-wc/building-rollup';
import copy from 'rollup-plugin-copy'

// import postcss from 'rollup-plugin-postcss';


// // PostCSS plugins
// import simplevars from 'postcss-simple-vars';
// import nested from 'postcss-nested';
// import cssnext from 'postcss-cssnext';
// import cssnano from 'cssnano';



const configs = createDefaultConfig({
  input: './index.js',

});


// map if you use an array of configs, otherwise just extend the config
export default {
  ...configs,
  output: {
    ...configs.output,
    sourcemap: true,
    entryFileNames: '[name].js',
    chunkFileNames: '[name].js',
  },
  plugins: [
    ...configs.plugins,
    copy({
      // copy over all images files
      files: ['**/*.png', '**/**.css'],
      targets: [{
        src: 'src',
        dest: 'dist'
      }],
      options: {
        // parents makes sure to preserve the original folder structure
        parents: true,
      },
    }),
  ]
};

// // map if you use an array of configs, otherwise just extend the config
// export default {
//   ...configs,
//   plugins: [
// 	...configs.plugins,
// 	postcss({
//       plugins: [
//         simplevars(),
//         nested(),
//         cssnext({
//           warnForDuplicates: false,
//         }),
//         cssnano(),
//       ],
//       extensions: ['.css'],
//     })
//   ],
// };
