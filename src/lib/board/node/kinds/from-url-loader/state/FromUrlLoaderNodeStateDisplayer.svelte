<script lang="ts">
	import Canvas from "../../../Canvas.svelte";
	import type {FromUrlLoaderNode} from "../FromUrlLoaderNode.svelte.ts";
	import {InvalidUrlFromUrlLoaderNodeState} from "./kinds/invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
	import {LoadingFailedFromUrlLoaderNodeState} from "./kinds/loading-failed/LoadingFailedFromUrlLoaderNodeState.ts";
	import {LoadingInProgressFromUrlLoaderNodeState} from "./kinds/loading-in-progress/LoadingInProgressFromUrlLoaderNodeState.ts";
	import {LoadingSucceededFromUrlLoaderNodeState} from "./kinds/loading-succeeded/LoadingSucceededFromUrlLoaderNodeState.ts";
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
			node.state instanceof LoadingSucceededFromUrlLoaderNodeState
			|| node.state instanceof LoadingFailedFromUrlLoaderNodeState
			|| node.state instanceof LoadingInProgressFromUrlLoaderNodeState
			|| node.state instanceof InvalidUrlFromUrlLoaderNodeState
		) ?
			node.state.url
		:	null}
	/>
	{#if node.state instanceof LoadingSucceededFromUrlLoaderNodeState}
		<Canvas image={node.state.image} />
	{/if}
</section>
