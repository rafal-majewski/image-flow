<script lang="ts">
	import type {MapperNode} from "./MapperNode.svelte.ts";
	import type {Coordinates} from "../../../coordinates/Coordinates.ts";
	import type {Mapper} from "./mapper/Mapper.ts";
	import MapperNodeStateDisplayer from "./state/MapperNodeStateDisplayer.svelte";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onAddOutputEdgeRequest,
		onAddInputEdgeRequest,
		onMouseLeftButtonUp,
	}: Readonly<{
		onDeleteRequest: (node: MapperNode) => void;
		node: MapperNode;
		onAddOutputEdgeRequest: (
			sourceNode: MapperNode,
			mouseClientPosition: Coordinates,
		) => void;
		onAddInputEdgeRequest: (
			sourceNode: MapperNode,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonDown: (
			node: MapperNode,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: MapperNode) => void;
	}> = $props();
	function handleDeleteButtonClick(): void {
		onDeleteRequest(node);
	}
	function handleAddInputEdgeButtonClick(event: MouseEvent): void {
		onAddInputEdgeRequest(node, {x: event.clientX, y: event.clientY});
	}
	function handleAddOutputEdgeButtonClick(event: MouseEvent): void {
		onAddOutputEdgeRequest(node, {x: event.clientX, y: event.clientY});
	}
	function handleMouseDown(event: MouseEvent): void {
		if (event.button === 0) {
			onMouseLeftButtonDown(node, {x: event.clientX, y: event.clientY});
		}
	}
	function handleMouseUp(event: MouseEvent): void {
		if (event.button === 0) {
			onMouseLeftButtonUp(node);
		}
	}
	function handleSetMapperRequest(newMapper: Mapper): void {
		node.setMapper(newMapper);
	}
	function handleUnsetMapperRequest(): void {
		node.unsetMapper();
	}
</script>

<section
	style:top="{node.position.y}px"
	style:left="{node.position.x}px"
	class:error={node.state.status === "errored"}
	class:processing={node.state.status === "working"}
	class:done={node.state.status === "done"}
	class:unconfigur={node.state.status === "unconfigured"}
	class:idling={node.state.status === "idling"}
	onmousedown={handleMouseDown}
	role="none"
	onmouseup={handleMouseUp}
>
	<header>{node.name}</header>
	<button onclick={handleDeleteButtonClick}>🗑️</button>
	<button onclick={handleAddInputEdgeButtonClick}>➡️📍</button>
	<button onclick={handleAddOutputEdgeButtonClick}>📍➡️</button>
	<MapperNodeStateDisplayer
		state={node.state}
		onSetMapperRequest={handleSetMapperRequest}
		onUnsetMapperRequest={handleUnsetMapperRequest}
	/>
</section>

<style lang="scss">
	section {
		width: min-content;
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
