<script lang="ts">
	import {MapperNode} from "./kinds/mapper/MapperNode.svelte.ts";
	import {FromUrlLoaderNode} from "./kinds/from-url-loader/FromUrlLoaderNode.svelte.ts";
	import type {Coordinates} from "../coordinates/Coordinates.ts";
	import type {SupportedNode} from "./SupportedNode.ts";
	import MapperNodeDisplayer from "./kinds/mapper/state/MapperNodeDisplayer.svelte";
	import FromUrlLoaderNodeDisplayer from "./kinds/from-url-loader/state/FromUrlLoaderNodeDisplayer.svelte";
	import type {SupportedBoardMode} from "../mode/SupportedBoardMode.ts";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onSetOutputNodeRequest,
		onSetInputNodeRequest,
		onMouseLeftButtonUp,
		mode,
	}: Readonly<{
		mode: SupportedBoardMode | null;
		onDeleteRequest: (node: SupportedNode) => void;
		node: SupportedNode;
		onSetOutputNodeRequest: (
			sourceNode: SupportedNode,
			mouseClientPosition: Coordinates,
		) => void;
		onSetInputNodeRequest: (
			targetNode: MapperNode,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonDown: (
			node: SupportedNode,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: SupportedNode) => void;
	}> = $props();
	function handleDeleteButtonClick(): void {
		onDeleteRequest(node);
	}
	function handleSetOutputNodeButtonClick(event: MouseEvent): void {
		onSetOutputNodeRequest(node, {x: event.clientX, y: event.clientY});
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
	class:error={node.status === "errored"}
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
			{#if node instanceof MapperNode}
				Mapper
			{:else if node instanceof FromUrlLoaderNode}
				From URL
			{/if}
		</header>
		<button onclick={handleDeleteButtonClick}>🗑️</button>
		<button
			onclick={handleSetOutputNodeButtonClick}
			disabled={mode !== null && mode.kindName === "settingOutputNode"}
			>📍➡️</button
		>
	</div>
	{#if node instanceof MapperNode}
		<MapperNodeDisplayer {node} {onSetInputNodeRequest} {mode} />
	{:else if node instanceof FromUrlLoaderNode}
		<FromUrlLoaderNodeDisplayer {node} />
	{/if}
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
