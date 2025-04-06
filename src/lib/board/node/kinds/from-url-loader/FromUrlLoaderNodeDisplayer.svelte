<script lang="ts">
	import type {FromUrlLoaderNode} from "./FromUrlLoaderNode.svelte.ts";
	import type {Coordinates} from "../../../coordinates/Coordinates.ts";
	import FromUrlLoaderNodeStateDisplayer from "./state/FromUrlLoaderNodeStateDisplayer.svelte";
	const {
		node,
		onMouseLeftButtonDown,
		onDeleteRequest,
		onAddOutputEdgeRequest,
		onMouseLeftButtonUp,
	}: Readonly<{
		node: FromUrlLoaderNode;
		onDeleteRequest: (node: FromUrlLoaderNode) => void;
		onAddOutputEdgeRequest: (
			sourceNode: FromUrlLoaderNode,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonDown: (
			node: FromUrlLoaderNode,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: FromUrlLoaderNode) => void;
	}> = $props();
	function handleUrlInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		node.setUrl(event.currentTarget.value);
	}
	function handleMouseDown(event: MouseEvent): void {
		if (event.button === 0) {
			onMouseLeftButtonDown(node, {x: event.clientX, y: event.clientY});
		}
	}
	function handleDeleteButtonClick(): void {
		onDeleteRequest(node);
	}
	function handleAddNextNodeButtonClick(event: MouseEvent): void {
		onAddOutputEdgeRequest(node, {x: event.clientX, y: event.clientY});
	}
	let displayerHtmlElement: HTMLElement;
	function handleMouseUp(event: MouseEvent): void {
		if (event.button === 0) {
			onMouseLeftButtonUp(node);
		}
	}
	function handleSetMapperRequest(): void {}
</script>

<section
	bind:this={displayerHtmlElement}
	style:top="{node.position.y}px"
	style:left="{node.position.x}px"
	class:error={node.state.status === "errored"}
	class:processing={node.state.status === "working"}
	class:done={node.state.status === "done"}
	class:unconfigur={node.state.status === "unconfigured"}
	class:idling={node.state.status === "idling"}
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	role="none"
>
	<header>{node.name}</header>
	<button onclick={handleDeleteButtonClick}>🗑️</button>
	<button onclick={handleAddNextNodeButtonClick}>📍➡️</button>
	<FromUrlLoaderNodeStateDisplayer
		state={node.state}
		onSetMapperRequest={handleSetMapperRequest}
	/>
	<!-- {#snippet loadingLoadingSucceed(
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
		visitLoadingSucceed() {
			return loadingLoadingSucceeded;
		},
		visitLoadingFail() {
			return nothing;
		},
		visitNoUrl() {
			return nothing;
		},
	} as const)(node.state as any)} -->
</section>

<style lang="scss">
	section {
		position: absolute;
		width: min-content;
		transform: translate(-50%, -50%);
		background-color: white;
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
		display: flex;
	}
</style>
