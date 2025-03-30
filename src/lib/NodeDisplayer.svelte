<script lang="ts">
	import type {Node} from "./Node.ts";
	import type {Snippet} from "svelte";
	const {
		onDelete,
		content,
		node,
		// onAdd,
	}: Readonly<{
		onDelete: (node: Node) => void;
		node: Node;
		content: Snippet<[]>;
	}> = $props();
	function handleDeleteButtonClick(): void {
		onDelete(node);
	}
	function handleAddOutputButtonClick(): void {
		// TODO AD HERE
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
>
	<header>
		{node.name}
	</header>
	<menu>
		<li>
			<button onclick={handleDeleteButtonClick}>🗑️</button>
		</li>
	</menu>
	<menu>
		<li>
			<button onclick={handleAddOutputButtonClick}>+</button>
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
