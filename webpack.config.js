const path = require(`path`);
const merge = require(`webpack-merge`);
const parts = require(`./webpack.parts`);
const webpack = require(`webpack`);

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

const CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin;

const PATHS = {
  src: path.join(__dirname, `src`),
  dist: path.join(__dirname, `dist`),
};

const commonConfig = {
  entry: {
    "index_script": [
      path.join(PATHS.src, `js/index_script.js`),
      path.join(PATHS.src, `detail.html`),
      path.join(PATHS.src, `css/style.css`),
    ],
    "detail_script": [
      path.join(PATHS.src, `js/detail_script.js`),
      path.join(PATHS.src, `index.html`),
      path.join(PATHS.src, `css/style.css`),
    ],
  },
  output: {
    path: PATHS.dist,
    filename: `js/[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: `babel-loader`,
          },
          {
            loader: `eslint-loader`,
            options: {
              fix: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test:/\.html$/,
        loader: `html-loader`,
        options: {
          minimize: true,
          inject: 'body',
        }
      },
      {
        test: /\.(jpe?g|png|svg|woff|woff2|webp|gif)$/,
        loader: `url-loader`,
        options: {
          limit: 1000,
          context: `./src`,
          name: `[path][name].[ext]`,
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: `es6-promise`,
      fetch: `imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch`,
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      chunks: ['index_script'],
      filename: 'index.html',
      template: "./src/index.html"
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      chunks: ['detail_script'],
      filename: 'detail.html',
      template: "./src/detail.html"
    })
  ],
};

const productionConfig = merge([
  parts.extractCSS(),
  {
    plugins: [
      new ImageminPlugin({
        test: /\.(jpe?g)$/i ,
        plugins: [
          imageminJpegRecompress({})
        ]
      }),
      new CriticalPlugin({
        src: 'index.html',
        inline: true,
        minify: true,
        dest: 'index.html'
      })
    ]
  }
]);

const developmentConfig = merge([
  {
    devServer: {
      overlay: true,
      contentBase: PATHS.src,
    },
  },
  parts.loadCSS(),
]);

module.exports = () => {
  if (process.env.NODE_ENV === `production`) {
    console.log(`building production`);
    return merge(commonConfig, productionConfig);
  }
  return merge(commonConfig, developmentConfig);
};
