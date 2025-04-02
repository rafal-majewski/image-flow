<script lang="ts">
	import type {Edge} from "./Edge.ts";
	const {edge}: Readonly<{edge: Edge}> = $props();
	const length = $derived(
		((edge.sourceNode.position.x - edge.targetNode.position.x) ** 2
			+ (edge.sourceNode.position.y - edge.targetNode.position.y) ** 2)
			** 0.5,
	);
	const angleRadians = $derived(
		Math.atan2(
			edge.targetNode.position.y - edge.sourceNode.position.y,
			edge.targetNode.position.x - edge.sourceNode.position.x,
		),
	);
</script>

<svg
	viewBox="0 0 {length} {2}"
	width={length}
	height={2}
	xmlns="http://www.w3.org/2000/svg"
	style:rotate="{angleRadians}rad"
	style:top="{edge.sourceNode.position.y}px"
	style:left="{edge.sourceNode.position.x}px"
>
	<line x1={0} y1={1} x2={length} y2={1} stroke="black" stroke-width="2" />
</svg>

<style lang="scss">
	svg {
		position: absolute;
		transform-origin: center left;
	}
</style>
