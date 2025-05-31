<script lang="ts" generics="InputEdgeCount extends number, Name extends string">
	import type {Coordinates} from "../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../mode/supported/SupportedBoardMode.ts";
	import type {Node} from "../Node.svelte.ts";
	import type {Operator} from "../operator/Operator.ts";
	import NodeStateDisplayer from "../state/displayer/NodeStateDisplayer.svelte";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onMouseLeftButtonUp,
		onSetInputRequest,
		onSetOutputRequest,
		operators,
		boardMode,
	}: Readonly<{
		onDeleteRequest: (node: Node<InputEdgeCount, Name>) => void;
		node: Node<InputEdgeCount, Name>;
		boardMode: null | SupportedBoardMode;
		operators: readonly Operator<InputEdgeCount>[];
		onMouseLeftButtonDown: (
			node: Node<InputEdgeCount, Name>,
			mouseCursorInViewportPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: Node<InputEdgeCount, Name>) => void;
		onSetInputRequest: (
			index: number,
			nodeInRequest: Node<InputEdgeCount, Name>,
			inViewportPosition: Coordinates,
		) => void;
		onSetOutputRequest: (
			nodeInRequest: Node<InputEdgeCount, Name>,
			inViewportPosition: Coordinates,
		) => void;
	}> = $props();
	function handleDeleteButtonClick(): void {
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
	class:errored={node.status === "errored"}
	class:processing={node.status === "working"}
	class:done={node.status === "done"}
	class:unconfigured={node.status === "unconfigured"}
	class:idling={node.status === "idling"}
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
					disabled={boardMode !== null
						&& boardMode.kindName === "settingInEdgePut"}
					onclick={(event) => {
						handleSetInputButtonClick(index, {
							x: event.clientX,
							y: event.clientY,
						});
					}}>🔌</button
				>
				{edge}
			</li>
		{/each}
	</ol>
	<NodeStateDisplayer state={node.state} />
	<select>
		<option value="" disabled selected>Choose operator</option>
		{#each operators as operator (operator.id)}
			<option value={operator.id}>{operator.name}</option>
		{/each}
	</select>
	<div>
		<button
			onclick={handleSetOutputButtonClick}
			disabled={boardMode !== null
				&& boardMode.kindName === "settingOutEdgePut"}>🔌</button
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
		&.errored {
			border-color: red;
		}
		&.processing {
			border-color: orange;
		}
		&.done {
			border-color: green;
		}
		&.unconfigured {
			border-color: gray;
		}
		&.idling {
			border-color: blue;
		}
		display: flex;
	}
</style>
