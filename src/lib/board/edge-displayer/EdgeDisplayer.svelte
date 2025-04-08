<script lang="ts">
	import LineDisplayer from "../line-displayer/LineDisplayer.svelte";
	import type {Node} from "../node/Node.svelte.ts";
	const {
		sourceNode,
		targetNode,
	}: Readonly<{sourceNode: Node; targetNode: Node}> = $props();
</script>

<LineDisplayer
	sourcePosition={sourceNode.position}
	targetPosition={targetNode.position}
/>
