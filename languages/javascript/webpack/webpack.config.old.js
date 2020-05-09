const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  /* BASIC WEBPACK CONFIG */
  mode: 'development', // development or production or none (no default behavior)
  // devtool: 'true', // If true it uses normal js instead of eval strings
  entry: './src/index.js',
  output: {
    filename: 'main.[contentHash].js', // Cache busting by hashing the code to change the filename
    path: path.resolve(__dirname, 'dist')
  },
  /* END BASIC WEBPACK CONFIG */
  /* PLUGIN CONFIGS */
  plugins: [
    // Creates an index.html using the content in our template.html
    // Injects the js file with the hashed file name as a script tag
    new HtmlWebpackPlugin({
      template: './src/template.html'
    })
  ],
  /* LOADER CONFIGS */
  module: {
    rules: [
      {
        test: /\.scss$/,
        // The loaders run in reverse order in the array, recursion? sass-loader runs first
        use: [
          'style-loader', // 3. Injects styles into the dom using js
          'css-loader', //   2. Turns css into commonjs
          'sass-loader' //   1. Turns sass into css
        ]
      }
    ]
  }
}
