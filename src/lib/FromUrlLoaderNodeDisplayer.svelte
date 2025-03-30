<script lang="ts">
	import NodeDisplayer from "./NodeDisplayer.svelte";
	import type {FromUrlLoaderNode} from "./FromUrlLoaderNode.svelte.ts";
	import type {Node} from "./Node.ts";
	const {
		node,
		onDelete,
	}: Readonly<{node: FromUrlLoaderNode; onDelete: (node: Node) => void}> =
		$props();
	function handleUrlInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		node.setUrl(event.currentTarget.value);
	}
</script>

{#snippet content()}
	<section>
		<input type="text" onchange={handleUrlInputChange} />
	</section>
{/snippet}

<NodeDisplayer {content} {node} {onDelete} />
