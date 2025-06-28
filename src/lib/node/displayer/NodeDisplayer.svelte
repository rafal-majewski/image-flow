<script
	lang="ts"
	generics="
		InputEdgeCount extends number,
		StateToUse extends NodeState,
	"
>
	import type {Snippet} from "svelte";
	import {Coordinates} from "../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../mode/supported/SupportedBoardMode.ts";
	import type {Node} from "../Node.ts";
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
	}: {
		readonly onDeleteRequest: (node: Node) => void;
		readonly node: WithStateNode<InputEdgeCount, StateToUse>;
		readonly boardMode: null | SupportedBoardMode;
		readonly onMouseLeftButtonDown: (
			node: Node,
			mouseCursorInViewportPosition: Coordinates,
		) => void;
		readonly onMouseLeftButtonUp: (node: Node) => void;
		readonly onSetInputRequest: (
			index: number,
			nodeInRequest: Node,
			inViewportPosition: Coordinates,
		) => void;
		readonly onSetOutputRequest: (
			nodeInRequest: Node,
			inViewportPosition: Coordinates,
		) => void;
		readonly children: Snippet<[]>;
	} = $props();
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
						handleSetInputButtonClick(
							index,
							new Coordinates(event.clientX, event.clientY),
						);
					}}>🔌</button
				>
				{#if edge !== null}
					{#if edge.image === null}
						⌛
					{:else}
						🖼️
					{/if}
				{/if}
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
