export default /** @type {const} @satisfies {import("dependency-cruiser").IConfiguration} */ ({
	forbidden: [
		{from: {orphan: true}, name: "no-orphans", severity: "warn", to: {}},
	],
	options: {
		detectJSDocImports: true,
		doNotFollow: {path: []},
		enhancedResolveOptions: {
			conditionNames: ["default", "import", "node", "require", "types"],
			exportsFields: ["exports"],
			mainFields: ["main", "module", "types", "typings"],
		},
		reporterOptions: {archi: {}, dot: {}, text: {highlightFocused: true}},
		skipAnalysisNotInRules: true,
		tsConfig: {fileName: "./tsconfig.json"},
		tsPreCompilationDeps: true,
	},
});
