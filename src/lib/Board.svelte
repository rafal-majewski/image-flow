<script lang="ts">
	import type {Coordinates} from "./Coordinates.ts";
	import Menu from "./Menu.svelte";
	import type {Node} from "./Node.ts";
	import FromUrlLoaderNodeDisplayer from "./FromUrlLoaderNodeDisplayer.svelte";
	import {FromUrlLoaderNode} from "./FromUrlLoaderNode.svelte.ts";
	import {MapperNode} from "./MapperNode.svelte.ts";
	import MapperNodeDisplayer from "./MapperNodeDisplayer.svelte";
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

	let nodes = $state.raw<readonly Node[]>([]);
	function handleAddFromUrlLoaderNodeClick(): void {
		if (cursorPosition !== null) {
			const newNode = new FromUrlLoaderNode(cursorPosition);
			nodes = [...nodes, newNode];
			cursorPosition = null;
		}
	}
	function handleAddMapperButtonClick(): void {
		if (cursorPosition !== null) {
			const newNode = new MapperNode(cursorPosition);
			nodes = [...nodes, newNode];
			cursorPosition = null;
		}
	}
	let isBeingDragged = false;
	function handleMouseDown(): void {
		isBeingDragged = true;
	}
	function handleMouseUp(): void {
		isBeingDragged = false;
	}
	function handleMouseLeave(): void {
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
	function handleNodeDelete(node: Node): void {
		nodes = nodes.filter((nodeToCheck) => node !== nodeToCheck);
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
		{#if cursorPosition !== null}
			<Menu
				position={cursorPosition}
				onAddFromUrlLoaderNodeClick={handleAddFromUrlLoaderNodeClick}
				onAddMapperNodeClick={handleAddMapperButtonClick}
			/>
		{/if}
		<ul>
			{#each nodes as node, i (i)}
				<li>
					{#snippet fromUrlLoader(node: FromUrlLoaderNode)}
						<FromUrlLoaderNodeDisplayer {node} onDelete={handleNodeDelete} />
					{/snippet}
					{#snippet mapper(node: MapperNode)}
						<MapperNodeDisplayer {node} onDelete={handleNodeDelete} />
					{/snippet}
					{@render node.acceptVisitor({
						visitFromUrlLoader() {
							return fromUrlLoader;
						},
						visitMapper() {
							return mapper;
						},
					} as const)(node)}
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
