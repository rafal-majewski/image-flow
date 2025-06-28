<script lang="ts">
	import {Coordinates} from "./coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "./mode/supported/SupportedBoardMode.ts";
	import LineDisplayer from "./line-displayer/LineDisplayer.svelte";
	import {movingCameraBoardMode} from "./mode/implementations/moving-camera/instance/movingCameraBoardMode.ts";
	import {computeInBoardPositionFromInViewportPosition} from "./computing-in-board-position-from-in-viewport-position/computeInBoardPositionFromInViewportPosition.ts";
	import EdgeDisplayer from "./edge/displayer/EdgeDisplayer.svelte";
	import {MovingNodeBoardMode} from "./mode/implementations/moving-node/MovingNodeBoardMode.ts";
	import {SettingEdgeInputBoardMode} from "./mode/implementations/setting-edge-input/SettingEdgeInputBoardMode.ts";
	import {SettingEdgeOutputBoardMode} from "./mode/implementations/setting-edge-output/SettingEdgeOutputBoardMode.ts";
	import type {NodeClass} from "./node/class/NodeClass.ts";
	import {UnhandledEdgeBuilder} from "./edge/builder/unhandled/UnhandledEdgeBuilder.ts";
	import type {NodeState} from "./node/state/NodeState.ts";
	import type {Node} from "./node/Node.svelte.ts";
	import type {OperatingNode} from "./node/operating/OperatingNode.svelte.ts";
	let board: HTMLElement;
	let mode = $state.raw<null | SupportedBoardMode>(null);
	const {
		nodes,
		onSetCameraPositionRequest,
		cameraPosition,
		onDeleteNodeRequest,
	}: {
		readonly nodes: readonly Node<NodeState>[];
		readonly onSetCameraPositionRequest: (
			newCameraPosition: Coordinates,
		) => void;
		readonly cameraPosition: Coordinates;
		readonly onDeleteNodeRequest: (nodeToDelete: Node<NodeState>) => void;
	} = $props();
	function handleMouseMove(event: MouseEvent): void {
		if (mode !== null) {
			switch (mode.name) {
				case "movingCamera": {
					onSetCameraPositionRequest(
						cameraPosition.subtract(
							new Coordinates(event.movementX, event.movementY).divideBy(
								window.devicePixelRatio,
							),
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
			nodeInRequest.useEdgeBuilder(
				new UnhandledEdgeBuilder(mode.data.output, mode.data.index),
			);
			mode = null;
		}
	}
	function handleSetInputRequest(
		nodeInRequest: OperatingNode<number>,
		nodeInRequestInputIndex: number,
		inViewportPosition: Coordinates,
	): void {
		if (mode === null) {
			mode = new SettingEdgeInputBoardMode(
				nodeInRequestInputIndex,
				computeInBoardPositionFromInViewportPosition(
					inViewportPosition,
					board.getBoundingClientRect(),
					cameraPosition,
				),
				nodeInRequest,
			);
		} else if (mode.name === "settingEdgeOutput") {
			mode.data.input.useEdgeBuilder(
				new UnhandledEdgeBuilder(nodeInRequest, nodeInRequestInputIndex),
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
		onDeleteNodeRequest(nodeToDelete);
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
