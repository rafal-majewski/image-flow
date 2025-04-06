<script lang="ts">
	import type {Edge} from "./Edge.ts";
	import LineDisplayer from "./LineDisplayer.svelte";
	const {edge}: Readonly<{edge: Edge}> = $props();
</script>

<LineDisplayer
	sourcePosition={edge.sourceNode.position}
	targetPosition={edge.targetNode.position}
/>
