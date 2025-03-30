<script lang="ts">
	import NodeDisplayer from "./NodeDisplayer.svelte";
	import type {FromUrlLoaderNode} from "./FromUrlLoaderNode.svelte.ts";
	import type {Node} from "./Node.svelte.ts";
	import type {LoadingSucceededFromUrlLoaderNodeState} from "./LoadingSucceededFromUrlLoaderNodeState.ts";
	import LoadingInProgressFromUrlLoaderNodeStateDisplayer from "./LoadingInProgressFromUrlLoaderNodeStateDisplayer.svelte";
	const {
		node,
		onDeleted,
		onOutputAdded,
		onDraggingStarted,
	}: Readonly<{
		onOutputAdded: (sourceNode: Node) => void;
		node: FromUrlLoaderNode;
		onDeleted: (node: Node) => void;
		onDraggingStarted: (node: Node) => void;
	}> = $props();
	function handleUrlInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		node.setUrl(event.currentTarget.value);
	}
</script>

{#snippet content()}
	<section>
		<input type="text" onchange={handleUrlInputChange} />
		{#snippet loadingLoadingSucceeded(
			state: LoadingSucceededFromUrlLoaderNodeState,
		)}
			<LoadingInProgressFromUrlLoaderNodeStateDisplayer {state} />
		{/snippet}
		{#snippet nothing()}{/snippet}
		{@render node.state.acceptVisitor({
			visitInvalidUrl() {
				return nothing;
			},
			visitLoadingInProgress() {
				return nothing;
			},
			visitLoadingSucceeded() {
				return loadingLoadingSucceeded;
			},
			visitLoadingFailed() {
				return nothing;
			},
			visitNoUrl() {
				return nothing;
			},
		} as const)(node.state as any)}
	</section>
{/snippet}

<NodeDisplayer
	{content}
	{node}
	{onDeleted}
	{onOutputAdded}
	{onDraggingStarted}
/>
