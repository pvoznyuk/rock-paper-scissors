const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	cache: true,
	devtool: "source-map",
	devServer: {

	},
	resolve: {
		extensions: [".js", ".ts"]
	},
	entry: "./src/js/index.ts",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].js",
		sourceMapFilename: "[file].map"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "public", "index.html"),
			favicon: path.resolve(__dirname, "public", "favicon.ico")
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css"
		})
	],
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			},
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192
						}
					}
				]
			},
		]
	}
};
