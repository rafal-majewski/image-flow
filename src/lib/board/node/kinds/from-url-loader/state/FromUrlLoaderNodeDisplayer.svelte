<script lang="ts">
	import Canvas from "../../../Canvas.svelte";
	import type {FromUrlLoaderNode} from "../FromUrlLoaderNode.svelte.ts";
	import {InvalidUrlFromUrlLoaderNode} from "./kinds/invalid-url/InvalidUrlFromUrlLoaderNode.ts";
	import {LoadingFailedFromUrlLoaderNode} from "./kinds/loading-failed/LoadingFailedFromUrlLoaderNode.ts";
	import {LoadingInProgressFromUrlLoaderNode} from "./kinds/loading-in-progress/LoadingInProgressFromUrlLoaderNode.ts";
	import {LoadingSucceededFromUrlLoaderNode} from "./kinds/loading-succeeded/LoadingSucceededFromUrlLoaderNode.ts";
	const {node}: Readonly<{node: FromUrlLoaderNode}> = $props();
	function handleUrlInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		node.setUrl(event.currentTarget.value);
	}
</script>

<section>
	<input
		onchange={handleUrlInputChange}
		type="text"
		placeholder="Enter URL"
		value={(
			node.state instanceof LoadingSucceededFromUrlLoaderNode
			|| node.state instanceof LoadingFailedFromUrlLoaderNode
			|| node.state instanceof LoadingInProgressFromUrlLoaderNode
			|| node.state instanceof InvalidUrlFromUrlLoaderNode
		) ?
			node.state.url
		:	null}
	/>
	{#if node.state instanceof LoadingSucceededFromUrlLoaderNode}
		<Canvas image={node.state.image} />
	{/if}
</section>
