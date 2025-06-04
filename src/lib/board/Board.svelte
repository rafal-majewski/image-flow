<script lang="ts">
	import type {Coordinates} from "./coordinates/Coordinates.ts";
	import Menu from "./menu/Menu.svelte";
	import type {SupportedBoardMode} from "./mode/supported/SupportedBoardMode.ts";
	import LineDisplayer from "./line-displayer/LineDisplayer.svelte";
	import {movingCameraBoardMode} from "./mode/implementations/moving-camera/instance/movingCameraBoardMode.ts";
	import {computeInBoardPositionFromInViewportPosition} from "./computing-in-board-position-from-in-viewport-position/computeInBoardPositionFromInViewportPosition.ts";
	import EdgeDisplayer from "./edge/displayer/EdgeDisplayer.svelte";
	import {MovingNodeBoardMode} from "./mode/implementations/moving-node/MovingNodeBoardMode.ts";
	import {AddingNodeBoardMode} from "./mode/implementations/adding-node/AddingNodeBoardMode.ts";
	import {SettingEdgeInputBoardMode} from "./mode/implementations/setting-edge-input/SettingEdgeInputBoardMode.ts";
	import {SettingEdgeOutputBoardMode} from "./mode/implementations/setting-edge-output/SettingEdgeOutputBoardMode.ts";
	import type {Node} from "./node/Node.svelte.ts";
	import type {NodeClass} from "./node/class/NodeClass.ts";
	import {FromFileLoaderNode} from "./node/with-state/implementations/from-file-loader/FromFileLoaderNode.ts";
	import {GeneratorOperatableNode} from "./node/with-state/implementations/operatable/implementations/generator/GeneratorOperatableNode.ts";
	import {MapperOperatableNode} from "./node/with-state/implementations/operatable/implementations/mapper/MapperOperatableNode.ts";
	import {UnhandledEdgeBuilder} from "./edge/builder/implementations/unhandled/UnhandledEdgeBuilder.ts";
	import {FromUrlLoaderNode} from "./node/with-state/implementations/from-url-loader/FromUrlLoaderNode.ts";
	import {CombinerOperatableNode} from "./node/with-state/implementations/operatable/implementations/combiner/CombinerOperatableNode.ts";
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
	let nodes = $state.raw<readonly Node<number>[]>([]);
	let mode = $state.raw<null | SupportedBoardMode>(null);
	function handleAddNodeRequest(newNodeClass: NodeClass): void {
		if (mode !== null && mode.name === "addingNode") {
			const newNode = new newNodeClass(mode.data.position);
			nodes = [...nodes, newNode];
			mode = null;
		}
	}
	function handleAddMapperOperatableNodeRequest(): void {
		handleAddNodeRequest(MapperOperatableNode);
	}
	function handleAddGeneratorOperatableNodeRequest(): void {
		handleAddNodeRequest(GeneratorOperatableNode);
	}
	function handleAddFromFileLoaderNodeRequest(): void {
		handleAddNodeRequest(FromFileLoaderNode);
	}
	function handleAddFromUrlLoaderNodeRequest(): void {
		handleAddNodeRequest(FromUrlLoaderNode);
	}
	function handleAddCombinerOperatableNodeRequest(): void {
		handleAddNodeRequest(CombinerOperatableNode);
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
			switch (mode.name) {
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
				case "settingEdgeOutput": {
					mode = new SettingEdgeOutputBoardMode(
						mode.data.input,
						computeInBoardPositionFromJustInViewportPosition({
							x: event.clientX,
							y: event.clientY,
						}),
					);
					break;
				}
				case "settingEdgeInput": {
					mode = new SettingEdgeInputBoardMode(
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
			switch (mode.name) {
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
		nodeInRequest: Node<number>,
		inViewportPosition: Coordinates,
	): void {
		if (mode === null) {
			mode = new SettingEdgeOutputBoardMode(
				nodeInRequest,
				computeInBoardPositionFromJustInViewportPosition(inViewportPosition),
			);
		} else if (mode.name === "settingEdgeInput") {
			nodeInRequest.handleEdgeBuilder(
				new UnhandledEdgeBuilder(mode.data.index, mode.data.output),
			);
			mode = null;
		}
	}
	function handleSetInputRequest(
		index: number,
		nodeInRequest: Node<number>,
		inViewportPosition: Coordinates,
	): void {
		if (mode === null) {
			mode = new SettingEdgeInputBoardMode(
				index,
				computeInBoardPositionFromJustInViewportPosition(inViewportPosition),
				nodeInRequest,
			);
		} else if (mode.name === "settingEdgeOutput") {
			mode.data.input.handleEdgeBuilder(
				new UnhandledEdgeBuilder(index, nodeInRequest),
			);
			mode = null;
		}
	}
	function handleMouseLeftButtonDownedOnNode(node: Node<number>): void {
		if (mode === null) {
			mode = new MovingNodeBoardMode(node);
		}
	}
	function handleMouseLeftButtonUppedOnNode(): void {}
	function handleDeleteNodeRequest(nodeToDelete: Node<number>): void {
		nodes = nodes.filter((node) => node !== nodeToDelete);
		if (mode !== null) {
			switch (mode.name) {
				case "settingEdgeOutput": {
					if (mode.data.input === nodeToDelete) {
						mode = null;
					}
					break;
				}
				case "settingEdgeInput": {
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
		{#if mode !== null && mode.name === "addingNode"}
			<Menu
				position={mode.data.position}
				onAddMapperOperatableNodeRequest={handleAddMapperOperatableNodeRequest}
				onAddGeneratorOperatableNodeRequest={handleAddGeneratorOperatableNodeRequest}
				onAddFromFileLoaderNodeRequest={handleAddFromFileLoaderNodeRequest}
				onAddFromUrlLoaderNodeRequest={handleAddFromUrlLoaderNodeRequest}
				onAddCombinerOperatableNodeRequest={handleAddCombinerOperatableNodeRequest}
			/>
		{/if}
		<ul>
			{#each nodes as node (node.id)}
				<li>
					<node.displayer
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
						<EdgeDisplayer {edge} />
					</li>
				{/each}
			{/each}
			{#if mode !== null}
				{#if mode.name === "settingEdgeOutput"}
					<li>
						<LineDisplayer
							sourcePosition={mode.data.input.position}
							targetPosition={mode.data.mouseCursorInBoardPosition}
						/>
					</li>
				{:else if mode.name === "settingEdgeInput"}
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
