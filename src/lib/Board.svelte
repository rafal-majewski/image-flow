<script lang="ts">
	import type {Coordinates} from "./Coordinates.ts";
	import Menu from "./Menu.svelte";
	import {FromUrlLoaderNode} from "./FromUrlLoaderNode.svelte.ts";
	import {MapperNode} from "./MapperNode.svelte.ts";
	import NodeDisplayer from "./NodeDisplayer.svelte";
	import {Edge} from "./Edge.ts";
	import type {SupportedNode} from "./SupportedNode.ts";
	import EdgeDisplayer from "./EdgeDisplayer.svelte";
	import type {SupportedNodeClass} from "./SupportedNodeClass.ts";
	import LineDisplayer from "./LineDisplayer.svelte";
	let board: HTMLElement;
	let cameraPosition = $state<Coordinates>({x: 0, y: 0});
	let nodes = $state.raw<readonly SupportedNode[]>([]);
	let edges = $state.raw<readonly Edge[]>([]);
	let mode = $state.raw<
		| null
		| Readonly<{kind: "movingCamera"}>
		| Readonly<{kind: "movingNode"; data: Readonly<{node: SupportedNode}>}>
		| Readonly<{
				kind: "addingEdgeFromSourceNode";
				data: Readonly<{
					sourceNode: SupportedNode;
					targetPosition: Coordinates;
				}>;
		  }>
		| Readonly<{
				kind: "addingEdgeFromTargetNode";
				data: Readonly<{targetNode: MapperNode; sourcePosition: Coordinates}>;
		  }>
		| Readonly<{kind: "addingNode"; data: Readonly<{position: Coordinates}>}>
	>(null);
	function tryToAddNode(class_: SupportedNodeClass): void {
		if (mode !== null && mode.kind === "addingNode") {
			const newNode = new class_(mode.data.position);
			nodes = [...nodes, newNode];
			mode = null;
		}
	}
	function handleAddMapperNodeRequested(): void {
		tryToAddNode(MapperNode);
	}
	function handleAddFromUrlLoaderNodeRequested(): void {
		tryToAddNode(FromUrlLoaderNode);
	}
	function handleContextMenuOpened(event: MouseEvent): void {}
	function handleMouseMoved(event: MouseEvent): void {}
	function handleMouseDowned(event: MouseEvent): void {}
	function handleMouseUpped(event: MouseEvent): void {}
	function handleMouseLeft(event: MouseEvent): void {}
	function handleAddOutputToNodeRequested(): void {}
	function handleAddInputToNodeRequested(): void {}
	function handleMouseLeftButtonDownedOnNode(): void {}
	function handleMouseLeftButtonUppedOnNode(): void {}
	function handleDeleteNodeRequested(): void {}
</script>

<section
	oncontextmenu={handleContextMenuOpened}
	role="none"
	bind:this={board}
	onmousemove={handleMouseMoved}
	style:background-position="calc(50% + {-cameraPosition.x}px) calc(50% + {-cameraPosition.y}px)"
	onmousedown={handleMouseDowned}
	onmouseup={handleMouseUpped}
	onmouseleave={handleMouseLeft}
>
	<div
		style:top="calc(50% + {-cameraPosition.y}px)"
		style:left="calc(50% + {-cameraPosition.x}px)"
	>
		{#if mode !== null && mode.kind === "addingNode"}
			<Menu
				position={mode.data.position}
				onAddMapperNodeRequested={handleAddMapperNodeRequested}
				onAddFromUrlLoaderNodeRequested={handleAddFromUrlLoaderNodeRequested}
			/>
		{/if}
		<ul>
			{#each nodes as node, nodeIndex (nodeIndex)}
				<li>
					<NodeDisplayer
						{node}
						onAddOutputRequested={handleAddOutputToNodeRequested}
						onAddInputRequested={handleAddInputToNodeRequested}
						onMouseLeftButtonDowned={handleMouseLeftButtonDownedOnNode}
						onMouseLeftButtonUpped={handleMouseLeftButtonUppedOnNode}
						onDeleteRequested={handleDeleteNodeRequested}
					/>
				</li>
			{/each}
			{#each edges as edge, edgeIndex (edgeIndex)}
				<li>
					<EdgeDisplayer {edge} />
				</li>
			{/each}
			{#if mode !== null}
				{#if mode.kind === "addingEdgeFromSourceNode"}
					<li>
						<LineDisplayer
							sourcePosition={mode.data.sourceNode.position}
							targetPosition={mode.data.targetPosition}
						/>
					</li>
				{:else if mode.kind === "addingEdgeFromTargetNode"}
					<li>
						<LineDisplayer
							sourcePosition={mode.data.sourcePosition}
							targetPosition={mode.data.targetNode.position}
						/>
					</li>
				{/if}
			{/if}
		</ul>
	</div>
</section>

<style>
	div {
		position: absolute;
	}
	section {
		background-image: url("./grid.svg");
		background-repeat: repeat;
		overflow: hidden;
		position: relative;
	}
	ul {
		list-style-type: none;
		margin-block-start: 0;
		margin-block-end: 0;
		padding-inline-start: 0;
	}
</style>
