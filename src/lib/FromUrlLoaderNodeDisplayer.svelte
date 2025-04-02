<script lang="ts">
	import type {FromUrlLoaderNode} from "./FromUrlLoaderNode.svelte.ts";
	import type {Coordinates} from "./Coordinates.ts";
	// import type {LoadingSucceededFromUrlLoaderNodeState} from "./LoadingSucceededFromUrlLoaderNodeState.ts";
	// import LoadingInProgressFromUrlLoaderNodeStateDisplayer from "./LoadingInProgressFromUrlLoaderNodeStateDisplayer.svelte";
	const {
		node,
		onMouseLeftButtonDowned,
		onDeleteRequested,
		onAddOutputRequested,
		onMouseLeftButtonUpped,
	}: Readonly<{
		node: FromUrlLoaderNode;
		onDeleteRequested: (node: FromUrlLoaderNode) => void;
		onAddOutputRequested: (
			sourceNode: FromUrlLoaderNode,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonDowned: (
			node: FromUrlLoaderNode,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonUpped: (node: FromUrlLoaderNode) => void;
	}> = $props();
	function handleUrlInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		node.setUrl(event.currentTarget.value);
	}
	function handleMouseDowned(event: MouseEvent): void {
		if (event.button === 0) {
			onMouseLeftButtonDowned(node, {x: event.clientX, y: event.clientY});
		}
	}
	function handleDeleteButtonClicked(): void {
		onDeleteRequested(node);
	}
	function handleAddNextNodeButtonMouseDowned(event: MouseEvent): void {
		onAddOutputRequested(node, {x: event.clientX, y: event.clientY});
	}
	function handleMouseUpped(event: MouseEvent): void {
		if (event.button === 0) {
			onMouseLeftButtonUpped(node);
		}
	}
</script>

<section
	style:top="{node.position.y}px"
	style:left="{node.position.x}px"
	class:errored={node.state.status === "errored"}
	class:processing={node.state.status === "working"}
	class:done={node.state.status === "done"}
	class:unconfigured={node.state.status === "unconfigured"}
	class:idling={node.state.status === "idling"}
	onmousedown={handleMouseDowned}
	onmouseup={handleMouseUpped}
	role="none"
>
	<header>{node.name}</header>
	<button onclick={handleDeleteButtonClicked}>🗑️</button>
	<input type="text" onchange={handleUrlInputChange} />
	<button onmousedown={handleAddNextNodeButtonMouseDowned}>➡️📍</button>
	<!-- {#snippet loadingLoadingSucceeded(
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
	} as const)(node.state as any)} -->
</section>

<style lang="scss">
	section {
		position: absolute;
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
