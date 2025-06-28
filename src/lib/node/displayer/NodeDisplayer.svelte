<script lang="ts">
	import type {Snippet} from "svelte";
	import {Coordinates} from "../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../mode/supported/SupportedBoardMode.ts";
	import type {Node} from "../Node.svelte.ts";
	import {NodeState} from "../state/NodeState.ts";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onMouseLeftButtonUp,
		onSetOutputRequest,
		boardMode,
		children,
	}: {
		readonly onDeleteRequest: (node: Node<NodeState>) => void;
		readonly node: Node<NodeState>;
		readonly boardMode: null | SupportedBoardMode;
		readonly onMouseLeftButtonDown: (
			node: Node<NodeState>,
			mouseCursorInViewportPosition: Coordinates,
		) => void;
		readonly onMouseLeftButtonUp: (node: Node<NodeState>) => void;
		readonly onSetOutputRequest: (
			nodeInRequest: Node<NodeState>,
			inViewportPosition: Coordinates,
		) => void;
		readonly children: Snippet<[]>;
	} = $props();
	function handleDeleteButtonClick(): void {
		node.disconnect();
		onDeleteRequest(node);
	}
	function handleMouseDown(event: MouseEvent): void {
		if (event.button === 0) {
			onMouseLeftButtonDown(
				node,
				new Coordinates(event.clientX, event.clientY),
			);
		}
	}
	function handleMouseUp(event: MouseEvent): void {
		if (event.button === 0) {
			onMouseLeftButtonUp(node);
		}
	}
	function handleSetOutputButtonClick(event: MouseEvent): void {
		onSetOutputRequest(node, new Coordinates(event.clientX, event.clientY));
	}
</script>

<section
	style:top="{node.position.y}px"
	style:left="{node.position.x}px"
	class:started={node.state.status === "started"}
	class:doned={node.state.status === "doned"}
	class:unconfigured={node.state.status === "unconfigured"}
	onmousedown={handleMouseDown}
	role="none"
	onmouseup={handleMouseUp}
>
	<div>
		<header>
			{node.name}
		</header>
		<button onclick={handleDeleteButtonClick}>🗑️</button>
	</div>
	{@render children()}
	<div>
		<button
			onclick={handleSetOutputButtonClick}
			disabled={boardMode !== null && boardMode.name === "settingEdgeOutput"}
			>🔌</button
		>
	</div>
</section>

<style lang="scss">
	section {
		width: min-content;
		position: absolute;
		transform: translate(-50%, -50%);
		background-color: white;
		border: 4px solid;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 1;
		> div {
			display: flex;
			flex-direction: row;
		}
		&.started {
			border-color: orange;
		}
		&.doned {
			border-color: green;
		}
		&.unconfigured {
			border-color: gray;
		}
		display: flex;
	}
</style>
