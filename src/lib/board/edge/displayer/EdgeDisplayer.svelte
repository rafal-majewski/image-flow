<script lang="ts">
	import LineDisplayer from "../../line-displayer/LineDisplayer.svelte";
	import type {Edge} from "../Edge.ts";
	const {
		edge,
		onDeleteRequest,
	}: Readonly<{edge: Edge; onDeleteRequest: (edge: Edge) => void}> = $props();
	function handleDeleteButtonClick() {
		onDeleteRequest(edge);
	}
</script>

<div>
	<LineDisplayer
		sourcePosition={edge.input.position}
		targetPosition={edge.output.position}
	/>
	<button
		onclick={handleDeleteButtonClick}
		style:top={`${(edge.input.position.y + edge.output.position.y) / 2}px`}
		style:left={`${(edge.input.position.x + edge.output.position.x) / 2}px`}
		>🗑️</button
	>
</div>

<style lang="scss">
	button {
		position: absolute;
		transform-origin: center left;
		transform: translate(-50%, -50%);
	}
</style>
