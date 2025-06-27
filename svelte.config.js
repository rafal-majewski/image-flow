import createStaticAdapter from "@sveltejs/adapter-static";
export default /** @type {const} @satisfies {import("@sveltejs/kit").Config} */ ({
	kit: {
		adapter: createStaticAdapter(),
		env: {dir: "."},
		files: {
			appTemplate: "./src/app.html",
			assets: "./static",
			errorTemplate: "./src/error.html",
			hooks: {
				client: "./src/hooks.client.ts",
				server: "./src/hooks.server.ts",
				universal: "./src/hooks.ts",
			},
			lib: "./src/lib",
			params: "./src/params",
			routes: "./src/routes",
			serviceWorker: "./src/service-worker.ts",
		},
		paths: {assets: "", base: "/image-flow", relative: false},
	},
});
