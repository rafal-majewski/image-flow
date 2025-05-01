<script lang="ts">
	import {computeInBoardPositionFromClientPosition} from "./computing-in-board-position-from-client-position/computeInBoardPositionFromClientPosition.ts";
	import type {Coordinates} from "./coordinates/Coordinates.ts";
	import EdgeDisplayer from "./edge-displayer/EdgeDisplayer.svelte";
	import Menu from "./main/Menu.svelte";
	import type {SupportedBoardMode} from "./mode/SupportedBoardMode.ts";
	import LineDisplayer from "./line-displayer/LineDisplayer.svelte";
	import SupportedNodeDisplayer from "./node/SupportedNodeDisplayer.svelte";
	import type {Node} from "./node/Node.svelte.ts";
	import type {SupportedOutputNode} from "./node/SupportedOutputNode.ts";
	import type {SupportedNode} from "./node/SupportedNode.ts";
	import {MapperNode} from "./node/kinds/mapper/MapperNode.svelte.ts";
	import {FromUrlLoaderNode} from "./node/kinds/from-url-loader/FromUrlLoaderNode.svelte.ts";
	import {FromFileLoaderNode} from "./node/kinds/from-file-loader/FromFileLoaderNode.svelte.ts";
	import type {OutputNode} from "./node/OutputNode.ts";
	import type {SupportedNodeClass} from "./node/SupportedNodeClass.ts";
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
	let mode = $state.raw<null | SupportedBoardMode>(null);
	$inspect(mode);
	function handleAddNodeRequest(newNodeClass: SupportedNodeClass): void {
		if (mode !== null && mode.kindName === "addingNode") {
			const newNode = new newNodeClass(mode.data.position);
			nodes = [...nodes, newNode];
			mode = null;
		}
	}
	function handleAddMapperNodeRequest(): void {
		handleAddNodeRequest(MapperNode);
	}
	function handleAddFromUrlLoaderNodeRequest(): void {
		handleAddNodeRequest(FromUrlLoaderNode);
	}
	function handleAddFromFileLoaderNodeRequest(): void {
		handleAddNodeRequest(FromFileLoaderNode);
	}
	function handleContextMenuOpen(event: MouseEvent): void {
		if (event.target === board && mode === null) {
			event.preventDefault();
			mode = {
				kindName: "addingNode",
				data: {
					position: computeInBoardPositionFromJustClientPosition({
						x: event.clientX,
						y: event.clientY,
					}),
				},
			};
		}
	}
	function handleMouseMove(event: MouseEvent): void {
		if (mode !== null) {
			switch (mode.kindName) {
				case "movingCamera": {
					cameraPosition = {
						x: cameraPosition.x - event.movementX / window.devicePixelRatio,
						y: cameraPosition.y - event.movementY / window.devicePixelRatio,
					};
					break;
				}
				case "movingNode": {
					mode.data.node.position = {
						x:
							mode.data.node.position.x
							+ event.movementX / window.devicePixelRatio,
						y:
							mode.data.node.position.y
							+ event.movementY / window.devicePixelRatio,
					};
					break;
				}
				case "settingOutputNode": {
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
				case "settingInputNode": {
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
		if (
			event.target === board
			&& event.button === 0
			&& (mode === null || mode.kindName === "addingNode")
		) {
			mode = {kindName: "movingCamera"};
		}
	}
	function handleMouseUp(event: MouseEvent): void {
		if (mode !== null && event.button === 0) {
			switch (mode.kindName) {
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
	function handleMouseLeft(): void {
		if (mode !== null) {
			switch (mode.kindName) {
				case "movingNode": {
					mode = null;
					break;
				}
				case "movingCamera": {
					mode = null;
					break;
				}
				case "settingOutputNode": {
					mode = null;
					break;
				}
				case "settingInputNode": {
					mode = null;
					break;
				}
			}
		}
	}
	function handleSetOutputNodeToNodeRequest(
		nodeInRequest: SupportedNode,
		clientPosition: Coordinates,
	): void {
		if (mode === null) {
			mode = {
				kindName: "settingOutputNode",
				data: {
					sourceNode: nodeInRequest,
					targetPosition:
						computeInBoardPositionFromJustClientPosition(clientPosition),
				},
			};
		} else if (mode.kindName === "settingInputNode") {
			nodeInRequest.addAndUpdateOutputNode(mode.data.targetNode);
			mode = null;
		}
	}
	function handleSetInputNodeToNodeRequest(
		nodeInRequest: SupportedOutputNode,
		clientPosition: Coordinates,
	): void {
		if (mode === null) {
			mode = {
				kindName: "settingInputNode",
				data: {
					targetNode: nodeInRequest,
					sourcePosition:
						computeInBoardPositionFromJustClientPosition(clientPosition),
				},
			};
		} else if (mode.kindName === "settingOutputNode") {
			mode.data.sourceNode.addAndUpdateOutputNode(nodeInRequest);
			mode = null;
		}
	}
	function handleMouseLeftButtonDownedOnNode(node: Node): void {
		if (mode === null) {
			mode = {kindName: "movingNode", data: {node}};
		}
	}
	function handleMouseLeftButtonUppedOnNode(): void {}
	function handleDeleteNodeRequest(nodeToDelete: Node): void {
		nodeToDelete.disconnect();
		nodes = nodes.filter((node) => node !== nodeToDelete);
		if (mode !== null) {
			switch (mode.kindName) {
				case "settingOutputNode": {
					if (mode.data.sourceNode === nodeToDelete) {
						mode = null;
					}
					break;
				}
				case "settingInputNode": {
					if (mode.data.targetNode === nodeToDelete) {
						mode = null;
					}
					break;
				}
				case "movingNode": {
					if (mode.data.node === nodeToDelete) {
						mode = null;
					}
					break;
				}
			}
		}
	}
	function handleEdgeDeleteRequest(
		inputNode: Node,
		outputNode: OutputNode,
	): void {
		outputNode.unsetInputNode();
	}
</script>

<section
	oncontextmenu={handleContextMenuOpen}
	role="none"
	bind:this={board}
	onmousemove={handleMouseMove}
	style:background-position="calc(50% + {-cameraPosition.x}px) calc(50% + {-cameraPosition.y}px)"
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	onmouseleave={handleMouseLeft}
>
	<div
		style:top="calc(50% + {-cameraPosition.y}px)"
		style:left="calc(50% + {-cameraPosition.x}px)"
	>
		{#if mode !== null && mode.kindName === "addingNode"}
			<Menu
				position={mode.data.position}
				onAddMapperNodeRequest={handleAddMapperNodeRequest}
				onAddFromUrlLoaderNodeRequest={handleAddFromUrlLoaderNodeRequest}
				onAddFromFileLoaderNodeRequest={handleAddFromFileLoaderNodeRequest}
			/>
		{/if}
		<ul>
			{#each nodes as node, nodeIndex (nodeIndex)}
				<li>
					<SupportedNodeDisplayer
						{node}
						onDeleteRequest={handleDeleteNodeRequest}
						onMouseLeftButtonDown={handleMouseLeftButtonDownedOnNode}
						onMouseLeftButtonUp={handleMouseLeftButtonUppedOnNode}
						onSetInputNodeRequest={handleSetInputNodeToNodeRequest}
						onSetOutputNodeRequest={handleSetOutputNodeToNodeRequest}
						boardMode={mode}
					/>
				</li>
				{#each node.outputNodes as outputNode (`${node.id}->${outputNode.id}`)}
					<li>
						<EdgeDisplayer
							inputNode={node}
							{outputNode}
							onDeleteRequest={handleEdgeDeleteRequest}
						/>
					</li>
				{/each}
			{/each}
			{#if mode !== null}
				{#if mode.kindName === "settingOutputNode"}
					<li>
						<LineDisplayer
							sourcePosition={mode.data.sourceNode.position}
							targetPosition={mode.data.targetPosition}
						/>
					</li>
				{:else if mode.kindName === "settingInputNode"}
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
