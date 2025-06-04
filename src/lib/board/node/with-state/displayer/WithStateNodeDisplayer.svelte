<script
	lang="ts"
	generics="
		InputEdgeCount extends number,
		StateToUse extends NodeState<InputEdgeCount>,
	"
>
	import type {Snippet} from "svelte";
	import type {Coordinates} from "../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../mode/supported/SupportedBoardMode.ts";
	import type {Node} from "../../Node.svelte.ts";
	import type {WithStateNode} from "../WithStateNode.svelte.ts";
	import {NodeState} from "../state/NodeState.ts";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onMouseLeftButtonUp,
		onSetInputRequest,
		onSetOutputRequest,
		boardMode,
		children,
	}: Readonly<{
		onDeleteRequest: (node: Node<InputEdgeCount>) => void;
		node: WithStateNode<InputEdgeCount, StateToUse>;
		boardMode: null | SupportedBoardMode;
		onMouseLeftButtonDown: (
			node: Node<InputEdgeCount>,
			mouseCursorInViewportPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: Node<InputEdgeCount>) => void;
		onSetInputRequest: (
			index: number,
			nodeInRequest: Node<InputEdgeCount>,
			inViewportPosition: Coordinates,
		) => void;
		onSetOutputRequest: (
			nodeInRequest: Node<InputEdgeCount>,
			inViewportPosition: Coordinates,
		) => void;
		children: Snippet<[]>;
	}> = $props();
	function handleDeleteButtonClick(): void {
		node.delete();
		onDeleteRequest(node);
	}
	function handleMouseDown(event: MouseEvent): void {
		if (event.button === 0) {
			onMouseLeftButtonDown(node, {x: event.clientX, y: event.clientY});
		}
	}
	function handleMouseUp(event: MouseEvent): void {
		if (event.button === 0) {
			onMouseLeftButtonUp(node);
		}
	}
	function handleSetInputButtonClick(
		index: number,
		mouseCursorInViewportPosition: Coordinates,
	): void {
		onSetInputRequest(index, node, mouseCursorInViewportPosition);
	}
	function handleSetOutputButtonClick(event: MouseEvent): void {
		onSetOutputRequest(node, {x: event.clientX, y: event.clientY});
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
	<ol>
		{#each node.inputEdges as edge, index (index)}
			<li>
				<button
					disabled={boardMode !== null && boardMode.name === "settingEdgeInput"}
					onclick={(event) => {
						handleSetInputButtonClick(index, {
							x: event.clientX,
							y: event.clientY,
						});
					}}>🔌</button
				>
			</li>
		{/each}
	</ol>
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
