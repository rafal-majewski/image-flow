import {sveltekit as createSvelteKitPlugins} from "@sveltejs/kit/vite";
import type {UserConfig} from "vite";
const svelteKitPlugins = await createSvelteKitPlugins();
export default {
	plugins: svelteKitPlugins,
	build: {outDir: "../build", emptyOutDir: true},
	base: process.env["GITHUB_ACTIONS"] === "true" ? "/image-flow/" : "/",
} as const satisfies UserConfig;
