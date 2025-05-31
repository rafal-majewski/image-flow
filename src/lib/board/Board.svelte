<script lang="ts">
	import type {Coordinates} from "./coordinates/Coordinates.ts";
	import Menu from "./menu/Menu.svelte";
	import type {SupportedBoardMode} from "./mode/supported/SupportedBoardMode.ts";
	import LineDisplayer from "./line-displayer/LineDisplayer.svelte";
	import {movingCameraBoardMode} from "./mode/implementations/moving-camera/instance/movingCameraBoardMode.ts";
	import {computeInBoardPositionFromInViewportPosition} from "./computing-in-board-position-from-in-viewport-position/computeInBoardPositionFromInViewportPosition.ts";
	import EdgeDisplayer from "./edge/displayer/EdgeDisplayer.svelte";
	import type {Edge} from "./edge/Edge.ts";
	import type {SupportedNode} from "./node/supported/SupportedNode.ts";
	import {MapperNode} from "./node/implementations/mapper/MapperNode.svelte.ts";
	import {UnhandledEdgeBuilder} from "./edge/builder/implementations/unhandled/UnhandledEdgeBuilder.ts";
	import {MovingNodeBoardMode} from "./mode/implementations/moving-node/MovingNodeBoardMode.ts";
	import {SettingInEdgePutBoardMode} from "./mode/kinds/setting-edge-input/SettingInEdgePutBoardMode.ts";
	import {AddingNodeBoardMode} from "./mode/implementations/adding-node/AddingNodeBoardMode.ts";
	import {SettingOutEdgePutBoardMode} from "./mode/kinds/setting-edge-output/SettingOutEdgePutBoardMode.ts";
	import type {SupportedNodeClass} from "./node/class/supported/SupportedNodeClass.ts";
	import SupportedNodeDisplayer from "./node/supported/displayer/SupportedNodeDisplayer.svelte";
	let board: HTMLElement;
	let cameraPosition = $state<Coordinates>({x: 0, y: 0});
	function computeInBoardPositionFromJustInViewportPosition(
		inViewportPosition: Coordinates,
	): Coordinates {
		const boardBoundingBox = board.getBoundingClientRect();
		return computeInBoardPositionFromInViewportPosition(
			inViewportPosition,
			boardBoundingBox,
			cameraPosition,
		);
	}
	let nodes = $state.raw<readonly SupportedNode[]>([]);
	let mode = $state.raw<null | SupportedBoardMode>(null);
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
	function handleAddGeneratorNodeRequest(): void {
		handleAddNodeRequest(GeneratorNode);
	}
	function handleAddBicombinerNodeRequest(): void {
		handleAddNodeRequest(BicombinerNode);
	}
	function handleContextMenuOpen(event: MouseEvent): void {
		if (event.target === board && mode === null) {
			event.preventDefault();
			mode = new AddingNodeBoardMode(
				computeInBoardPositionFromJustInViewportPosition({
					x: event.clientX,
					y: event.clientY,
				}),
			);
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
				case "settingOutEdgePut": {
					mode = new SettingOutEdgePutBoardMode(
						mode.data.input,
						computeInBoardPositionFromJustInViewportPosition({
							x: event.clientX,
							y: event.clientY,
						}),
					);
					break;
				}
				case "settingInEdgePut": {
					mode = new SettingInEdgePutBoardMode(
						mode.data.index,
						computeInBoardPositionFromJustInViewportPosition({
							x: event.clientX,
							y: event.clientY,
						}),
						mode.data.output,
					);
					break;
				}
			}
		}
	}
	function handleMouseDown(event: MouseEvent): void {
		if (event.target === board && event.button === 0) {
			mode = movingCameraBoardMode;
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
			mode = null;
		}
	}
	function handleSetOutputRequest(
		nodeInRequest: SupportedNode,
		inViewportPosition: Coordinates,
	): void {
		if (mode === null) {
			mode = new SettingOutEdgePutBoardMode(
				nodeInRequest,
				computeInBoardPositionFromJustInViewportPosition(inViewportPosition),
			);
		} else if (mode.kindName === "settingInEdgePut") {
			nodeInRequest.addOutputEdge(
				new UnhandledEdgeBuilder(mode.data.index, mode.data.output),
			);
			mode = null;
		}
	}
	function handleSetInputRequest(
		index: number,
		nodeInRequest: SupportedNode,
		inViewportPosition: Coordinates,
	): void {
		if (mode === null) {
			mode = new SettingInEdgePutBoardMode(
				index,
				computeInBoardPositionFromJustInViewportPosition(inViewportPosition),
				nodeInRequest,
			);
		} else if (mode.kindName === "settingOutEdgePut") {
			mode.data.input.addOutputEdge(
				new UnhandledEdgeBuilder(index, nodeInRequest),
			);
			mode = null;
		}
	}
	function handleMouseLeftButtonDownedOnNode(node: SupportedNode): void {
		if (mode === null) {
			mode = new MovingNodeBoardMode(node);
		}
	}
	function handleMouseLeftButtonUppedOnNode(): void {}
	function handleDeleteNodeRequest(nodeToDelete: SupportedNode): void {
		alert("Not implemented yet");
		nodes = nodes.filter((node) => node !== nodeToDelete);
		if (mode !== null) {
			switch (mode.kindName) {
				case "settingOutEdgePut": {
					if (mode.data.input === nodeToDelete) {
						mode = null;
					}
					break;
				}
				case "settingInEdgePut": {
					if (mode.data.output === nodeToDelete) {
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
	function handleEdgeDeleteRequest(edge: Edge): void {
		alert("Not implemented yet");
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
				onAddGeneratorNodeRequest={handleAddGeneratorNodeRequest}
				onAddCombinerNodeRequest={handleAddCombinerNodeRequest}
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
						onSetInputRequest={handleSetInputRequest}
						onSetOutputRequest={handleSetOutputRequest}
						boardMode={mode}
					/>
				</li>
				{#each node.outputEdges as edge (edge.id)}
					<li>
						<EdgeDisplayer {edge} onDeleteRequest={handleEdgeDeleteRequest} />
					</li>
				{/each}
			{/each}
			{#if mode !== null}
				{#if mode.kindName === "settingOutEdgePut"}
					<li>
						<LineDisplayer
							sourcePosition={mode.data.input.position}
							targetPosition={mode.data.mouseCursorInBoardPosition}
						/>
					</li>
				{:else if mode.kindName === "settingInEdgePut"}
					<li>
						<LineDisplayer
							sourcePosition={mode.data.mouseCursorInBoardPosition}
							targetPosition={mode.data.output.position}
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
