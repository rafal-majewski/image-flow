<script lang="ts">
	import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../mode/SupportedBoardMode.ts";
	import Canvas from "../../../Canvas.svelte";
	import {InvalidUrlFromUrlLoaderNodeState} from "./kinds/invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
	import {LoadingFailedFromUrlLoaderNodeState} from "./kinds/loading-failed/LoadingFailedFromUrlLoaderNodeState.ts";
	import {LoadingInProgressFromUrlLoaderNodeState} from "./kinds/loading-in-progress/LoadingInProgressFromUrlLoaderNodeState.ts";
	import {LoadingSucceededFromUrlLoaderNodeState} from "./kinds/loading-succeeded/LoadingSucceededFromUrlLoaderNodeState.ts";
	import type {SupportedFromUrlLoaderNodeState} from "./SupportedFromUrlLoaderNodeState.ts";
	const {
		state,
		onSetUrlRequest,
		boardMode,
		onSetOutputNodeRequest,
	}: Readonly<{
		state: SupportedFromUrlLoaderNodeState;
		onSetUrlRequest: (url: string) => void;
		boardMode: SupportedBoardMode | null;
		onSetOutputNodeRequest: (mouseClientPosition: Coordinates) => void;
	}> = $props();
	function handleUrlInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetUrlRequest(event.currentTarget.value);
	}
	function handleSetOutputNodeButtonClick(
		event: MouseEvent & Readonly<{currentTarget: HTMLButtonElement}>,
	): void {
		onSetOutputNodeRequest({x: event.clientX, y: event.clientY});
	}
</script>

<section>
	<button
		onclick={handleSetOutputNodeButtonClick}
		disabled={boardMode !== null && boardMode.kindName === "settingOutputNode"}
		>📍➡️</button
	>
	<input
		onchange={handleUrlInputChange}
		type="text"
		placeholder="Enter URL"
		value={(
			state instanceof LoadingSucceededFromUrlLoaderNodeState
			|| state instanceof LoadingFailedFromUrlLoaderNodeState
			|| state instanceof LoadingInProgressFromUrlLoaderNodeState
			|| state instanceof InvalidUrlFromUrlLoaderNodeState
		) ?
			state.url
		:	null}
	/>
	{#if state instanceof LoadingSucceededFromUrlLoaderNodeState}
		<Canvas image={state.image} />
	{/if}
</section>
