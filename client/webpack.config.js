const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
// const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.


const { GenerateSW } = require('workbox-webpack-plugin'); // [HL]

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
				title: 'Text Editor (Title)',
			}),


			new MiniCssExtractPlugin(),
			
			// Generate Service Worker
			new GenerateSW(),  // [HL]
			
			// Generate Manifest
			new WebpackPwaManifest({
				filename: 'manifest.json',
				name: 'JATE',
				short_name: 'JATE',
				description: 'Just a text editor!',
				background_color: '#7eb4e2',
				theme_color: '#7eb4e2',
				start_url: './',
				publicPath: './',
				icons: [
					{
						src: path.resolve('src/images/logo.png'),
						sizes: [96, 128, 192, 256, 384, 512],
						destination: path.join('assets', 'icons'),
					},
				],
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
