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
	import {computeInBoardPositionFromClientPosition} from "./computeInBoardPositionFromClientPosition.ts";
	let board: HTMLElement;
	let cameraPosition = $state<Coordinates>({x: 0, y: 0});
	function computeInBoardPositionFromJustClientPosition(
		clientPosition: Coordinates,
	): Coordinates {
		const boardBoundingBox = board.getBoundingClientRect();
		return computeInBoardPositionFromClientPosition(
			clientPosition,
			boardBoundingBox,
			cameraPosition,
		);
	}
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
	$inspect(mode);
	function tryToAddNode(class_: SupportedNodeClass): void {
		if (mode !== null && mode.kind === "addingNode") {
			const newNode = new class_(mode.data.position);
			nodes = [...nodes, newNode];
			mode = null;
		}
	}
	function handleAddMapperNodeRequest(): void {
		tryToAddNode(MapperNode);
	}
	function handleAddFromUrlLoaderNodeRequest(): void {
		tryToAddNode(FromUrlLoaderNode);
	}
	function handleContextMenuOpen(event: MouseEvent): void {
		if (event.target === board && mode === null) {
			event.preventDefault();
			mode = {
				kind: "addingNode",
				data: {
					position: computeInBoardPositionFromJustClientPosition({
						x: event.clientX,
						y: event.clientY,
					}),
				},
			};
		}
	}
	function handleMouseMov(event: MouseEvent): void {
		if (mode !== null) {
			switch (mode.kind) {
				case "movingCamera": {
					cameraPosition = {
						x: cameraPosition.x - event.movementX,
						y: cameraPosition.y - event.movementY,
					};
					break;
				}
				case "movingNode": {
					mode.data.node.position = {
						x: mode.data.node.position.x + event.movementX,
						y: mode.data.node.position.y + event.movementY,
					};
					break;
				}
				case "addingEdgeFromSourceNode": {
					mode = {
						...mode,
						data: {
							...mode.data,
							targetPosition: computeInBoardPositionFromJustClientPosition({
								x: event.clientX,
								y: event.clientY,
							}),
						},
					};
					break;
				}
				case "addingEdgeFromTargetNode": {
					mode = {
						...mode,
						data: {
							...mode.data,
							sourcePosition: computeInBoardPositionFromJustClientPosition({
								x: event.clientX,
								y: event.clientY,
							}),
						},
					};
					break;
				}
			}
		}
	}
	function handleMouseDown(event: MouseEvent): void {
		if (event.target === board && mode === null && event.button === 0) {
			mode = {kind: "movingCamera"};
		}
	}
	function handleMouseUp(event: MouseEvent): void {
		if (mode !== null && event.button === 0) {
			switch (mode.kind) {
				case "movingNode": {
					mode = null;
					break;
				}
				case "movingCamera": {
					mode = null;
					break;
				}
			}
		}
	}
	function handleMouseLeft(): void {}
	function handleAddOutputEdgeToNodeRequest(
		node: SupportedNode,
		clientPosition: Coordinates,
	): void {
		if (mode === null) {
			mode = {
				kind: "addingEdgeFromSourceNode",
				data: {
					sourceNode: node,
					targetPosition:
						computeInBoardPositionFromJustClientPosition(clientPosition),
				},
			};
		}
	}
	function handleAddInputEdgeToNodeRequest(node: MapperNode): void {
		if (mode !== null && mode.kind === "addingEdgeFromSourceNode") {
			const edge = new Edge(mode.data.sourceNode, node);
			edges = [...edges, edge];
			mode.data.sourceNode.addOutputEdge(edge);
			node.inputEdge = edge;
			mode = null;
		}
	}
	function handleMouseLeftButtonDownedOnNode(node: SupportedNode): void {
		if (mode === null) {
			mode = {kind: "movingNode", data: {node}};
		}
	}
	function handleMouseLeftButtonUppedOnNode(): void {}
	function handleDeleteNodeRequest(): void {}
</script>

<section
	oncontextmenu={handleContextMenuOpen}
	role="none"
	bind:this={board}
	onmousemove={handleMouseMov}
	style:background-position="calc(50% + {-cameraPosition.x}px) calc(50% + {-cameraPosition.y}px)"
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	onmouseleave={handleMouseLeft}
>
	<div
		style:top="calc(50% + {-cameraPosition.y}px)"
		style:left="calc(50% + {-cameraPosition.x}px)"
	>
		{#if mode !== null && mode.kind === "addingNode"}
			<Menu
				position={mode.data.position}
				onAddMapperNodeRequest={handleAddMapperNodeRequest}
				onAddFromUrlLoaderNodeRequest={handleAddFromUrlLoaderNodeRequest}
			/>
		{/if}
		<ul>
			{#each nodes as node, nodeIndex (nodeIndex)}
				<li>
					<NodeDisplayer
						{node}
						onAddOutputEdgeRequest={handleAddOutputEdgeToNodeRequest}
						onAddInputEdgeRequest={handleAddInputEdgeToNodeRequest}
						onMouseLeftButtonDown={handleMouseLeftButtonDownedOnNode}
						onMouseLeftButtonUp={handleMouseLeftButtonUppedOnNode}
						onDeleteRequest={handleDeleteNodeRequest}
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
