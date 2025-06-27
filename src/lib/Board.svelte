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
	import type {Node} from "./node/Node.ts";
	import type {NodeClass} from "./node/class/NodeClass.ts";
	import {UnhandledEdgeBuilder} from "./edge/builder/unhandled/UnhandledEdgeBuilder.ts";
	import {Graph} from "./graph/Graph.ts";
	let board: HTMLElement;
	let graph: Graph = $state.raw(Graph.create());
	let cameraPosition = $state<Coordinates>(new Coordinates(0, 0));
	let mode = $state.raw<null | SupportedBoardMode>(null);
	function handleAddNodeRequest(NewNodeClass: NodeClass): void {
		if (mode !== null && mode.name === "addingNode") {
			const newNode = new NewNodeClass(mode.data.position);
			graph = graph.withNewNode(newNode);
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
					graph = graph.withMovedNode(
						mode.data.node.id,
						mode.data.node.position.add(
							new Coordinates(event.movementX, event.movementY).divideBy(
								window.devicePixelRatio,
							),
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
		nodeInRequest: Node,
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
		nodeInRequest: Node,
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
	function handleMouseLeftButtonDownedOnNode(node: Node): void {
		if (mode === null) {
			mode = new MovingNodeBoardMode(node);
		}
	}
	function handleMouseLeftButtonUppedOnNode(): void {}
	function handleDeleteNodeRequest(nodeToDelete: Node): void {
		graph = graph.withoutNode(nodeToDelete.id);
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
				onAddMapperOperatingNodeRequest={handleAddMapperOperatingNodeRequest}
				onAddGeneratorOperatingNodeRequest={handleAddGeneratorOperatingNodeRequest}
				onAddFromFileLoaderNodeRequest={handleAddFromFileLoaderNodeRequest}
				onAddFromUrlLoaderNodeRequest={handleAddFromUrlLoaderNodeRequest}
				onAddCombinerOperatingNodeRequest={handleAddCombinerOperatingNodeRequest}
			/>
		{/if}
		<ul>
			{#each graph as node (node.id)}
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
				{#each node.outputEdges as edge (`${edge.inputNodeId}-${edge.outputNodeInputEdgeIndex}-${edge.outputNodeId}`)}
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
