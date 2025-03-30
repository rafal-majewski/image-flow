<script lang="ts">
	import type {Coordinates} from "./Coordinates.ts";
	import Menu from "./Menu.svelte";
	import type {Node} from "./Node.svelte.ts";
	import FromUrlLoaderNodeDisplayer from "./FromUrlLoaderNodeDisplayer.svelte";
	import {FromUrlLoaderNode} from "./FromUrlLoaderNode.svelte.ts";
	import {MapperNode} from "./MapperNode.svelte.ts";
	import MapperNodeDisplayer from "./MapperNodeDisplayer.svelte";
	import Edge from "./Edge.svelte";
	let board: HTMLElement;
	// let mousePosition = $state<Coordinates | null>(null);
	let cameraPosition = $state<Coordinates>({x: 0, y: 0});
	// function handleAddMapperButtonClick(): void {
	// 	console.log("Add mapper button clicked!");
	// 	dialog.close();
	// }

	let nodes = $state.raw<readonly Node[]>([]);
	// function handleAddFromUrlLoaderNodeClick(): void {
	// 	if (cursorPosition !== null) {
	// 		const newNode = new FromUrlLoaderNode(cursorPosition);
	// 		nodes = [...nodes, newNode];
	// 		cursorPosition = null;
	// 	}
	// }
	// function handleAddMapperButtonClick(): void {
	// 	if (cursorPosition !== null) {
	// 		const newNode = new MapperNode(cursorPosition);
	// 		nodes = [...nodes, newNode];
	// 		cursorPosition = null;
	// 	}
	// }

	// let isDraggingCamera = $state.raw<boolean>(false);
	// let draggingNodeState = $state.raw<null | Readonly<{node: Node}>>(null);
	// let draggingEdgeState = $state.raw<null | Readonly<{sourceNode: Node}>>(null);
	let mode = $state.raw<null | Readonly<
		| {kind: "draggingCamera"}
		| {kind: "draggingNode"; data: Readonly<{node: Node}>}
		| {
				kind: "draggingEdge";
				data: Readonly<{sourceNode: Node; targetPosition: Coordinates}>;
		  }
		| {kind: "addingNode"; data: Readonly<{position: Coordinates}>}
	>>(null);
	$inspect(mode);
	function handleNodeAdded(node: Node): void {
		console.log("Node added:", node);
		if (mode !== null && mode.kind === "addingNode") {
			nodes = [...nodes, node];
			mode = null;
		}
	}
	function handleMouseDowned(event: MouseEvent): void {
		if (event.target === board && event.button === 0) {
			console.log("Mouse downed on board");
			if (mode === null) {
				mode = {kind: "draggingCamera"};
			}
		}
	}
	function handleMouseUpped(event: MouseEvent): void {
		if (event.button === 0) {
			if (mode !== null) {
				// if (mode.kind === "draggingCamera") {
				// 	mode = null;
				// }
				switch (mode.kind) {
					case "draggingCamera": {
						mode = null;
						break;
					}
					case "draggingNode": {
						mode = null;
						break;
					}
				}
			}
		}
	}
	function handleMouseLeaved(): void {
		if (mode !== null) {
			// if (mode.kind === "draggingCamera") {
			// 	mode = null;
			// }
			switch (mode.kind) {
				case "draggingCamera": {
					mode = null;
					break;
				}
				case "draggingNode": {
					mode = null;
					break;
				}
			}
		}
	}
	function handleMouseMoved(event: MouseEvent): void {
		if (mode !== null) {
			switch (mode.kind) {
				case "draggingCamera": {
					// mousePosition = {
					// 	x:
					// 		event.clientX
					// 		- boardBoundingBox.x
					// 		- boardBoundingBox.width / 2
					// 		+ cameraPosition.x,
					// 	y:
					// 		event.clientY
					// 		- boardBoundingBox.y
					// 		- boardBoundingBox.height / 2
					// 		+ cameraPosition.y,
					// };
					// cameraPosition = {
					// 	x: event.clientX - boardBoundingBox.x - boardBoundingBox.width / 2,
					// 	y: event.clientY - boardBoundingBox.y - boardBoundingBox.height / 2,
					// };
					const mousePositionDelta = {x: event.movementX, y: event.movementY};
					cameraPosition = {
						x: cameraPosition.x - mousePositionDelta.x,
						y: cameraPosition.y - mousePositionDelta.y,
					};
					break;
				}
				case "draggingNode": {
					const mousePositionDelta = {x: event.movementX, y: event.movementY};
					const newNodePosition = {
						x: mode.data.node.position.x + mousePositionDelta.x,
						y: mode.data.node.position.y + mousePositionDelta.y,
					};
					mode.data.node.position = newNodePosition;
					break;
				}
			}
		}
		// if (draggingMode !== null) {
		// 	switch (draggingMode.kind) {
		// 		case "camera": {
		// 			cameraPosition = mousePosition;
		// 			break;
		// 		}
		// 		case "node": {
		// 			draggingMode.data.node.position = mousePosition;
		// 			break;
		// 		}
		// 		case "edge": {
		// 			// TODO
		// 			break;
		// 		}
		// 	}
		// }
	}
	function handleNodeDeleted(node: Node): void {
		nodes = nodes.filter((nodeToCheck) => node !== nodeToCheck);
	}
	// TODO: Rename
	function handleNodeOutputAdded(sourceNode: Node): void {
		// draggingEdgeState = {sourceNode};
		// draggingMode = {kind: "edge", data: {sourceNode}};
		if (mode === null) {
			mode = {kind: "draggingEdge", data: {sourceNode}};
		}
	}
	function handleContextMenuOpened(event: MouseEvent): void {
		if (mode === null || mode.kind === "addingNode") {
			event.preventDefault();
			const boardBoundingBox = board.getBoundingClientRect();
			const mousePosition = {
				x:
					event.clientX
					- boardBoundingBox.x
					- boardBoundingBox.width / 2
					+ cameraPosition.x,
				y:
					event.clientY
					- boardBoundingBox.y
					- boardBoundingBox.height / 2
					+ cameraPosition.y,
			};
			mode = {kind: "addingNode", data: {position: mousePosition}};
		}
		// if (mousePosition !== null) {
		// 	event.preventDefault();
		// 	addingNodeState = {position: mousePosition};
		// }
	}
	function handleNodeDraggingStarted(node: Node): void {
		if (mode === null) {
			mode = {kind: "draggingNode", data: {node}};
		}
	}
</script>

<section
	oncontextmenu={handleContextMenuOpened}
	role="none"
	bind:this={board}
	onmousemove={handleMouseMoved}
	style:background-position="calc(50% + {-cameraPosition.x}px) calc(50% + {-cameraPosition.y}px)"
	onmousedown={handleMouseDowned}
	onmouseup={handleMouseUpped}
	onmouseleave={handleMouseLeaved}
>
	<div
		style:top="calc(50% + {-cameraPosition.y}px)"
		style:left="calc(50% + {-cameraPosition.x}px)"
	>
		{#if mode !== null && mode.kind === "addingNode"}
			<Menu position={mode.data.position} onNodeAdded={handleNodeAdded} />
		{/if}
		<ul>
			{#each nodes as node, i (i)}
				<li>
					<NodeDisplayer
						{content}
						{node}
						{onDeleted}
						{onOutputAdded}
						{onDraggingStarted}
					>
						{#snippet fromUrlLoader(node: FromUrlLoaderNode)}
							<FromUrlLoaderNodeDisplayer
								{node}
								onDeleted={handleNodeDeleted}
								onOutputAdded={handleNodeOutputAdded}
								onDraggingStarted={handleNodeDraggingStarted}
							/>
						{/snippet}
						{#snippet mapper(node: MapperNode)}
							<MapperNodeDisplayer
								{node}
								onDeleted={handleNodeDeleted}
								onOutputAdded={handleNodeOutputAdded}
								onDraggingStarted={handleNodeDraggingStarted}
							/>
						{/snippet}
						{@render (
							(node as any).acceptVisitor({
								visitFromUrlLoader() {
									return fromUrlLoader;
								},
								visitMapper() {
									return mapper;
								},
							} as const as any) as any
						)(node as any)}
					</NodeDisplayer>
				</li>
			{/each}
		</ul>
		{#if mode !== null && mode.kind === "draggingEdge"}
			<Edge
				sourcePosition={mode.data.sourceNode.position}
				targetPosition={mode.data.targetPosition}
			/>
		{/if}
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
