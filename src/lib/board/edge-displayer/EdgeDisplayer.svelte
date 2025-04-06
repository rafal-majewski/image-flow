<script lang="ts">
	import type {Edge} from "../edge/Edge.ts";
	import LineDisplayer from "../line-displayer/LineDisplayer.svelte";
	const {edge}: Readonly<{edge: Edge}> = $props();
</script>

<LineDisplayer
	sourcePosition={edge.sourceNode.position}
	targetPosition={edge.targetNode.position}
/>
