<script lang="ts">
	import type {SupportedNode} from "./SupportedNode.ts";
	import {FromUrlLoaderNode} from "./FromUrlLoaderNode.svelte.ts";
	import NodeDisplayer from "./NodeDisplayer.svelte";
	import type {Coordinates} from "./Coordinates.ts";
	import Menu from "./Menu.svelte";
	import {generateId} from "./generateId.ts";
	import type {NodeId} from "./NodeId.ts";
	// let dialog: HTMLDialogElement;
	let board: HTMLElement;
	let cursorPosition = $state<Coordinates | null>(null);
	let cameraPosition = $state<Coordinates>({x: 0, y: 0});
	function handleRightClick(event: MouseEvent): void {
		if (event.target === board) {
			const eventTargetBoundingBox = board.getBoundingClientRect();
			cursorPosition = {
				x:
					event.clientX
					- eventTargetBoundingBox.x
					- eventTargetBoundingBox.width / 2
					+ cameraPosition.x,
				y:
					event.clientY
					- eventTargetBoundingBox.y
					- eventTargetBoundingBox.height / 2
					+ cameraPosition.y,
			};
			event.preventDefault();
		}
	}
	// function handleAddMapperButtonClick(): void {
	// 	console.log("Add mapper button clicked!");
	// 	dialog.close();
	// }

	let nodes = $state<readonly SupportedNode[]>([]);
	function handleAddFromUrlLoaderNodeClick(): void {
		if (cursorPosition !== null) {
			const node = new FromUrlLoaderNode(generateId(), {
				x: cursorPosition.x,
				y: cursorPosition.y,
			});
			nodes = [...nodes, node];
			cursorPosition = null;
		}
	}
	let isBeingDragged = false;
	function handleMouseDown(event: MouseEvent): void {
		isBeingDragged = true;
	}
	function handleMouseUp(event: MouseEvent): void {
		isBeingDragged = false;
	}
	function handleMouseLeave(event: MouseEvent): void {
		isBeingDragged = false;
	}
	function handleMouseMove(event: MouseEvent): void {
		if (isBeingDragged) {
			const cameraPositionDelta = {x: event.movementX, y: event.movementY};
			cameraPosition = {
				x: cameraPosition.x - cameraPositionDelta.x,
				y: cameraPosition.y - cameraPositionDelta.y,
			};
		}
	}
	function handleNodeDelete(id: NodeId): void {
		nodes = nodes.filter((node) => node.id !== id);
	}
</script>

<section
	oncontextmenu={handleRightClick}
	role="none"
	bind:this={board}
	onmousemove={handleMouseMove}
	style:background-position="{-cameraPosition.x}px {-cameraPosition.y}px"
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	onmouseleave={handleMouseLeave}
>
	<div
		style:top="calc(50% + {-cameraPosition.y}px)"
		style:left="calc(50% + {-cameraPosition.x}px)"
	>
		{#if cursorPosition}
			<Menu
				position={cursorPosition}
				onAddFromUrlLoaderNodeClick={handleAddFromUrlLoaderNodeClick}
			/>
		{/if}
		<ul>
			{#each nodes as node (node.id)}
				<li>
					<NodeDisplayer {node} onDelete={handleNodeDelete} />
				</li>
			{/each}
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
