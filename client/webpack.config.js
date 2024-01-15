const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.

module.exports = () => {
	return {
		// mode: 'development',
		mode: 'production',
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
				favicon: "./src/images/favicon.ico"
			}),

			new MiniCssExtractPlugin(),

			// Generate Manifest
			new WebpackPwaManifest({
				filename: 'manifest.json',
				name: 'JATE - Text Editor Short',
				short_name: 'JATE',
				description: 'Just - not just another text editor',
				background_color: '#225ca3',
				theme_color: '#225ca3',
				start_url: './',
				publicPath: './',
				icons: [
					{
						src: path.resolve('src/images/logo.png'),
						sizes: [96, 128, 192, 256, 384, 512],
						destination: path.join('assets', 'icons'),
					},
				],
				screenshots: [
					{
						src: ('./7ca8f4f01e321aba1194.png'),
						sizes: "698x698",
						type: "image/png",
						form_factor: "wide",
						label: "JATE screenshot",
					},
					{
						src: ('./7ca8f4f01e321aba1194.png'),
						sizes: "698x698",
						type: "image/png",
						// form_factor: "wide",
						label: "Jate screenshot",
					}
				]
			}),

			// Generate Service Worker
			new InjectManifest({
				swSrc: './src-sw.js',
				swDest: 'service-worker.js',
			}),

		],

		module: {
			rules: [
				// //CSS
				{
					test: /\.css$/i,
					use: [MiniCssExtractPlugin.loader, "css-loader"]
				}, 
				//IMAGES
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
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
