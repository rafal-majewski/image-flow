<script lang="ts">
	import type {Node} from "./Node.svelte.ts";
	import type {Snippet} from "svelte";
	const {
		onDeleted,
		content,
		node,
		onOutputAdded,
		onDraggingStarted,
	}: Readonly<{
		onDeleted: (node: Node) => void;
		node: Node;
		content: Snippet<[]>;
		onOutputAdded: (sourceNode: Node) => void;
		onDraggingStarted: (node: Node) => void;
	}> = $props();
	function handleDeleteButtonClicked(): void {
		onDeleted(node);
	}
	function handleAddOutputButtonClicked(): void {
		onOutputAdded(node);
	}
	function handleMouseDowned(event: MouseEvent): void {
		if (event.button === 0) {
			onDraggingStarted(node);
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
	onmousedown={handleMouseDowned}
	role="none"
>
	<header>
		{node.name}
	</header>
	<menu>
		<li>
			<button onclick={handleDeleteButtonClicked}>🗑️</button>
		</li>
	</menu>
	<menu>
		<li>
			<button onclick={handleAddOutputButtonClicked}>-></button>
		</li>
	</menu>
	{@render content()}
</section>

<style lang="scss">
	section {
		position: absolute;
		transform: translate(-50%, -50%);
		background-color: white;
		border-radius: 4px;
		border: 4px solid;
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
	}
</style>
