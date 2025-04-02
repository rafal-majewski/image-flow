<script lang="ts">
	import type {MapperNode} from "./MapperNode.svelte.ts";
	import type {Coordinates} from "./Coordinates.ts";
	const {
		node,
		onDeleteRequested,
		onMouseLeftButtonDowned,
		onAddOutputRequested,
		onAddInputRequested,
		onMouseLeftButtonUpped,
	}: Readonly<{
		onDeleteRequested: (node: MapperNode) => void;
		node: MapperNode;
		onAddOutputRequested: (
			sourceNode: MapperNode,
			mouseClientPosition: Coordinates,
		) => void;
		onAddInputRequested: (
			sourceNode: MapperNode,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonDowned: (
			node: MapperNode,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonUpped: (node: MapperNode) => void;
	}> = $props();
	function handleDeleteButtonClicked(): void {
		onDeleteRequested(node);
	}
	function handleAddPreviousNodeButtonMouseDowned(event: MouseEvent): void {
		onAddInputRequested(node, {x: event.clientX, y: event.clientY});
	}
	function handleAddNextNodeButtonMouseDowned(event: MouseEvent): void {
		onAddOutputRequested(node, {x: event.clientX, y: event.clientY});
	}
	function handleMouseDowned(event: MouseEvent): void {
		if (event.button === 0) {
			onMouseLeftButtonDowned(node, {x: event.clientX, y: event.clientY});
		}
	}
	function handleMouseUpped(event: MouseEvent): void {
		if (event.button === 0) {
			onMouseLeftButtonUpped(node);
		}
	}
</script>

<section
	style:top="{node.position.y}px"
	style:left="{node.position.x}px"
	class:errored={node.state.status === "errored"}
	class:processing={node.state.status === "working"}
	class:done={node.state.status === "done"}
	class:unconfigured={node.state.status === "unconfigured"}
	class:idling={node.state.status === "idling"}
	onmousedown={handleMouseDowned}
	role="none"
	onmouseup={handleMouseUpped}
>
	<header>{node.name}</header>
	<button onclick={handleDeleteButtonClicked}>🗑️</button>
	<button onmousedown={handleAddPreviousNodeButtonMouseDowned}>➡️📍</button>
	<button onmousedown={handleAddNextNodeButtonMouseDowned}>📍➡️</button>
</section>

<style lang="scss">
	section {
		position: absolute;
		transform: translate(-50%, -50%);
		background-color: white;
		border: 4px solid;
		&.errored {
			border-color: red;
		}
		&.processing {
			border-color: orange;
		}
		&.done {
			border-color: green;
		}
		&.unconfigured {
			border-color: gray;
		}
		&.idling {
			border-color: blue;
		}
		display: flex;
	}
</style>
