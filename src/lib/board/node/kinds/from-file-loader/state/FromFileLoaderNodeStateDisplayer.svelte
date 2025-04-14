<script lang="ts">
	import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../mode/SupportedBoardMode.ts";
	import Canvas from "../../../Canvas.svelte";
	import {LoadingSucceededFromFileLoaderNodeState} from "./kinds/loading-succeeded/LoadingSucceededFromFileLoaderNodeState.ts";
	import type {SupportedFromFileLoaderNodeState} from "./SupportedFromFileLoaderNodeState.ts";
	const {
		state,
		onSetFileRequest,
		boardMode,
		onSetOutputNodeRequest,
	}: Readonly<{
		state: SupportedFromFileLoaderNodeState;
		onSetFileRequest: (file: File) => void;
		boardMode: SupportedBoardMode | null;
		onSetOutputNodeRequest: (mouseClientPosition: Coordinates) => void;
	}> = $props();
	function handleFileInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetFileRequest((event.currentTarget.files as FileList)[0] as File);
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
	<input onchange={handleFileInputChange} type="file" accept="image/*" />
	{#if state instanceof LoadingSucceededFromFileLoaderNodeState}
		<Canvas image={state.image} />
	{/if}
</section>
