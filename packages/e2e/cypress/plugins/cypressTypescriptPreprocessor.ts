import webpackPreprocessor from '@cypress/webpack-preprocessor'
import path from 'node:path'

const webpackOptions = {
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
    alias: {
      '@company': path.resolve(__dirname, '../../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
}

const options = {
  webpackOptions,
}

export default webpackPreprocessor(options)
