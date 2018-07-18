const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.extractCSS = () => {
  const extractCSS = new ExtractTextPlugin({
    filename: 'css/style.[hash].css'
   });

  return  {
      plugins: [extractCSS],
      module: {
        rules: [
          {
            test: /\.css$/,
            use: extractCSS.extract({
              use: [ `css-loader`, 'postcss-loader'],
              publicPath: '../'
            })
          }
        ]
      }
    };
}


exports.loadCSS = () => ({
    module: {
      rules: [
        {
          test: /\.css$/,
          use:[
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        }
      ]
    }
})