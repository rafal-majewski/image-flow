import {sveltekit as createSvelteKitPlugins} from "@sveltejs/kit/vite";
import type {UserConfig} from "vite";
export default {
	build: {emptyOutDir: true},
	plugins: [...(await createSvelteKitPlugins())],
} as const satisfies UserConfig;
