import * as typescriptEslintParser from "@typescript-eslint/parser";
import perfectionistEslintPlugin from "eslint-plugin-perfectionist";
export default [
	{
		files: ["**/*.js", "**/*.mjs", "**/*.ts"],
		languageOptions: {sourceType: "module"},
	},
	{files: ["**/*.cjs"], languageOptions: {sourceType: "commonjs"}},
	{
		files: ["**/*.cjs", "**/*.js", "**/*.mjs", "**/*.ts"],
		languageOptions: {
			ecmaVersion: 13,
			parser: typescriptEslintParser,
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
					newlinesBetween: "never",
					order: "asc",
					partitionByComment: false,
					specialCharacters: "keep",
					type: "natural",
				},
			],
		},
	},
	{ignores: [".git", ".svelte-kit", "build", "node_modules"]},
];
