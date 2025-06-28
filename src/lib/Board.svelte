<script lang="ts">
	import {Coordinates} from "./coordinates/Coordinates.ts";
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
	import type {NodeClass} from "./node/class/NodeClass.ts";
	import {UnhandledEdgeBuilder} from "./edge/builder/unhandled/UnhandledEdgeBuilder.ts";
	import {MapperOperatingNode} from "./node/implementations/mapper/MapperOperatingNode.ts";
	import {CombinerOperatingNode} from "./node/implementations/combiner/CombinerOperatingNode.ts";
	import {FromFileLoaderNode} from "./node/implementations/from-file-loader/FromFileLoaderNode.ts";
	import {FromUrlLoaderNode} from "./node/implementations/from-url-loader/FromUrlLoaderNode.ts";
	import {GeneratorOperatingNode} from "./node/implementations/generator/GeneratorOperatingNode.ts";
	import type {NodeState} from "./node/state/NodeState.ts";
	import type {Node} from "./node/Node.svelte.ts";
	import type {Edge} from "./edge/Edge.ts";
	import type {OperatingNode} from "./node/operating/OperatingNode.svelte.ts";
	let board: HTMLElement;
	let nodes = $state.raw<readonly Node<NodeState>[]>([]);
	let cameraPosition = $state<Coordinates>(new Coordinates(0, 0));
	let mode = $state.raw<null | SupportedBoardMode>(null);
	function handleAddNodeRequest(newNodeClass: NodeClass): void {
		if (mode !== null && mode.name === "addingNode") {
			const newNode = new newNodeClass(mode.data.position);
			nodes = [...nodes, newNode];
			mode = null;
		}
	}
	function handleAddMapperOperatingNodeRequest(): void {
		handleAddNodeRequest(MapperOperatingNode);
	}
	function handleAddGeneratorOperatingNodeRequest(): void {
		handleAddNodeRequest(GeneratorOperatingNode);
	}
	function handleAddFromFileLoaderNodeRequest(): void {
		handleAddNodeRequest(FromFileLoaderNode);
	}
	function handleAddFromUrlLoaderNodeRequest(): void {
		handleAddNodeRequest(FromUrlLoaderNode);
	}
	function handleAddCombinerOperatingNodeRequest(): void {
		handleAddNodeRequest(CombinerOperatingNode);
	}
	function handleContextMenuOpen(event: MouseEvent): void {
		if (event.target === board && mode === null) {
			event.preventDefault();
			mode = new AddingNodeBoardMode(
				computeInBoardPositionFromInViewportPosition(
					new Coordinates(event.clientX, event.clientY),
					board.getBoundingClientRect(),
					cameraPosition,
				),
			);
		}
	}
	function handleMouseMove(event: MouseEvent): void {
		if (mode !== null) {
			switch (mode.name) {
				case "movingCamera": {
					cameraPosition = cameraPosition.subtract(
						new Coordinates(event.movementX, event.movementY).divideBy(
							window.devicePixelRatio,
						),
					);
					break;
				}
				case "movingNode": {
					mode.data.node.position = mode.data.node.position.add(
						new Coordinates(event.movementX, event.movementY).divideBy(
							window.devicePixelRatio,
						),
					);
					break;
				}
				case "settingEdgeOutput": {
					mode = new SettingEdgeOutputBoardMode(
						mode.data.input,
						computeInBoardPositionFromInViewportPosition(
							new Coordinates(event.clientX, event.clientY),
							board.getBoundingClientRect(),
							cameraPosition,
						),
					);
					break;
				}
				case "settingEdgeInput": {
					mode = new SettingEdgeInputBoardMode(
						mode.data.index,
						computeInBoardPositionFromInViewportPosition(
							new Coordinates(event.clientX, event.clientY),
							board.getBoundingClientRect(),
							cameraPosition,
						),
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
		nodeInRequest: Node<NodeState>,
		inViewportPosition: Coordinates,
	): void {
		if (mode === null) {
			mode = new SettingEdgeOutputBoardMode(
				nodeInRequest,
				computeInBoardPositionFromInViewportPosition(
					inViewportPosition,
					board.getBoundingClientRect(),
					cameraPosition,
				),
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
		nodeInRequest: OperatingNode<number>,
		inViewportPosition: Coordinates,
	): void {
		if (mode === null) {
			mode = new SettingEdgeInputBoardMode(
				index,
				computeInBoardPositionFromInViewportPosition(
					inViewportPosition,
					board.getBoundingClientRect(),
					cameraPosition,
				),
				nodeInRequest,
			);
		} else if (mode.name === "settingEdgeOutput") {
			mode.data.input.handleEdgeBuilder(
				new UnhandledEdgeBuilder(index, nodeInRequest),
			);
			mode = null;
		}
	}
	function handleMouseLeftButtonDownedOnNode(node: Node<NodeState>): void {
		if (mode === null) {
			mode = new MovingNodeBoardMode(node);
		}
	}
	function handleMouseLeftButtonUppedOnNode(): void {}
	function handleDeleteNodeRequest(nodeToDelete: Node<NodeState>): void {
		throw new Error("Not implemented yet.");
		// nodes = nodes.filter((node) => node !== nodeToDelete);
		// if (mode !== null) {
		// 	switch (mode.name) {
		// 		case "settingEdgeOutput": {
		// 			if (mode.data.input === nodeToDelete) {
		// 				mode = null;
		// 			}
		// 			break;
		// 		}
		// 		case "settingEdgeInput": {
		// 			if (mode.data.output === nodeToDelete) {
		// 				mode = null;
		// 			}
		// 			break;
		// 		}
		// 		case "movingNode": {
		// 			if (mode.data.node === nodeToDelete) {
		// 				mode = null;
		// 			}
		// 			break;
		// 		}
		// 	}
		// }
	}
	function handleDeleteEdgeRequest(edgeToDelete: Edge): void {
		throw new Error("Not implemented yet.");
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
				onAddMapperOperatingNodeRequest={handleAddMapperOperatingNodeRequest}
				onAddGeneratorOperatingNodeRequest={handleAddGeneratorOperatingNodeRequest}
				onAddFromFileLoaderNodeRequest={handleAddFromFileLoaderNodeRequest}
				onAddFromUrlLoaderNodeRequest={handleAddFromUrlLoaderNodeRequest}
				onAddCombinerOperatingNodeRequest={handleAddCombinerOperatingNodeRequest}
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
				{#each node.outputEdges as edge (`${edge.input.id}-${edge.outputInputIndex}-${edge.output.id}`)}
					<li>
						<EdgeDisplayer {edge} onDeleteRequest={handleDeleteEdgeRequest} />
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
