<script lang="ts">
	import type {Snippet} from "svelte";
	import type {Coordinates} from "../../coordinates/Coordinates.ts";
	import type {Node} from "../Node.svelte.ts";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onMouseLeftButtonUp,
		stateDisplayer,
		name,
	}: Readonly<{
		onDeleteRequest: (node: Node) => void;
		node: Node;
		onMouseLeftButtonDown: (
			node: Node,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: Node) => void;
		name: string;
		stateDisplayer: Snippet<[]>;
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
			{name}
		</header>
		<button onclick={handleDeleteButtonClick}>🗑️</button>
	</div>
	{@render stateDisplayer()}
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
