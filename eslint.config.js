import * as TypescriptEslintParser from "@typescript-eslint/parser";
import perfectionistEslintPlugin from "eslint-plugin-perfectionist";
export default [
	{
		files: ["**/*.mjs", "**/*.js", "**/*.ts"],
		languageOptions: {sourceType: "module"},
	},
	{files: ["**/*.cjs"], languageOptions: {sourceType: "commonjs"}},
	{
		files: ["**/*.ts", "**/*.js", "**/*.cjs", "**/*.mjs"],
		languageOptions: {
			ecmaVersion: 13,
			parser: TypescriptEslintParser,
			parserOptions: {
				extraFileExtensions: [],
				project: "./tsconfig.json",
				tsconfigRootDir: ".",
			},
		},
	},
	{
		plugins: {perfectionist: perfectionistEslintPlugin},
		rules: {
			"perfectionist/sort-classes": [
				"warn",
				{
					customGroups: [],
					groups: ["constructor", "unknown"],
					ignoreCase: false,
					order: "asc",
					partitionByComment: false,
					type: "natural",
					specialCharacters: "keep",
					newlinesBetween: "never",
				},
			],
		},
	},
	{ignores: ["**/.git/**", "**/.svelte-kit/**", "**/node_modules/**"]},
];
