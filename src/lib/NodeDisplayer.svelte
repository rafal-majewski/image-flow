<script lang="ts">
	import type {SupportedNode} from "./SupportedNode.ts";
	import type {NodeId} from "./NodeId.ts";
	const {
		node,
		onDelete,
	}: Readonly<{node: SupportedNode; onDelete: (id: NodeId) => void}> = $props();
	function handleDeleteButtonClick(): void {
		onDelete(node.id);
	}
	function handleUrlInput(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		node.load(event.currentTarget.value);
	}
</script>

<section
	style:top="{node.position.y}px"
	style:left="{node.position.x}px"
	class:errored={node.status === "errored"}
	class:processing={node.status === "processing"}
	class:done={node.status === "done"}
	class:unconfigured={node.status === "unconfigured"}
	class:idling={node.status === "idling"}
>
	<header>
		{node.name}
	</header>
	<input type="text" oninput={handleUrlInput} />
	<button onclick={handleDeleteButtonClick}>🗑️</button>
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
			border-color: blue;
		}
		&.idling {
			border-color: gray;
		}
	}
</style>
