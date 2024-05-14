/** @type {import('@remix-run/dev').AppConfig} */
export default {
	ignoredRouteFiles: ["**/.*"],
	tailwind: true,
	postcss: true,
	browserNodeBuiltinsPolyfill: {
		modules: {
			crypto: true,
			events: true,
			path: true,
			child_process: true,
			fs: true,
			stream: true,
			util: true,
		},
	},
	// appDirectory: "app",
	// assetsBuildDirectory: "public/build",
	// publicPath: "/build/",
	// serverBuildPath: "build/index.js",
};
