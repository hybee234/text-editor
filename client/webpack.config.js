const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
// const { GenerateSW } = require('workbox-webpack-plugin'); // [HL]

// TODO: Add and configure workbox plugins for a service worker and manifest file.




module.exports = () => {
	return {
		mode: 'development',
		entry: {
			main: './src/js/index.js',
			install: './src/js/install.js'
		},
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
		},
		plugins: [
			// Automatically generates link in HTML file
			new HtmlWebpackPlugin({
				template: './index.html',
				title: 'J.A.T.E',
			}),

			new MiniCssExtractPlugin(),

			// Generate Manifest
			new WebpackPwaManifest({
				filename: 'manifest.json',
				name: 'JATE - Text Editor Short',
				short_name: 'JATE',
				description: 'JATE Description!',
				background_color: '#225ca3',
				// background_color: '#7eb4e2',
				theme_color: '#225ca3',
				start_url: './',
				publicPath: './',
				icons: [
					{
						src: path.resolve('src/images/logo.png'),
						sizes: [96, 128, 192, 256, 384, 512],
						destination: path.join('assets', 'icons'),
						// options: {
						// 	name: '[path][name].[ext]',
						// }
					},
				],
			}),

			// Generate Service Worker
			new InjectManifest({
				swSrc: './src-sw.js',
				swDest: 'service-worker.js',
			}),

		],

		module: {
			rules: [
				//CSS
				{
					test: /\.css$/i,
					use: [MiniCssExtractPlugin.loader, "css-loader"]
				}, 
				//BABEL
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
						presets: ['@babel/preset-env']
						}
					}
				},			
			],
		},
	};
};
