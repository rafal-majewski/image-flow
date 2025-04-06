export default /** @type {const} @satisfies {import("dependency-cruiser").IConfiguration} */ ({
	forbidden: [
		{from: {orphan: true}, name: "no-orphans", severity: "warn", to: {}},
	],
	options: {
		detectJSDocImports: true,
		doNotFollow: {path: []},
		enhancedResolveOptions: {
			conditionNames: ["import", "require", "node", "default", "types"],
			exportsFields: ["exports"],
			mainFields: ["module", "main", "types", "typings"],
		},
		reporterOptions: {archi: {}, dot: {}, text: {highlightFocused: true}},
		skipAnalysisNotInRules: true,
		tsConfig: {fileName: "./tsconfig.json"},
		tsPreCompilationDeps: true,
	},
});
