<script lang="ts">
	import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../mode/SupportedBoardMode.ts";
	import Canvas from "../../../Canvas.svelte";
	import {supportedMappers} from "../supportedMappers.ts";
	import {MappingInProgressMapperNodeState} from "./kinds/mapping-in-progress/MappingInProgressMapperNodeState.ts";
	import {MappingSucceededMapperNodeState} from "./kinds/mapping-succeeded/MappingSucceededMapperNodeState.ts";
	import {NoInputImageAndNoMapperMapperNodeState} from "./kinds/no-input-image-and-no-mapper/NoInputImageAndNoMapperMapperNodeState.ts";
	import {NoInputImageMapperNodeState} from "./kinds/no-input-image/NoInputImageMapperNodeState.ts";
	import {NoInputNodeAndNoMapperMapperNodeState} from "./kinds/no-input-node-and-no-mapper/NoInputNodeAndNoMapperMapperNodeState.ts";
	import {NoInputNodeMapperNodeState} from "./kinds/no-input-node/NoInputNodeMapperNodeState.ts";
	import {NoMapperMapperNodeState} from "./kinds/no-mapper/NoMapperMapperNodeState.ts";
	import type {MapperNodeState} from "./MapperNodeState.ts";
	import type {Mapper} from "../mapper/Mapper.ts";
	const {
		state,
		onDoStepRequest,
		onUnsetMapperRequest,
		onSetMapperRequest,
		onSetInputNodeRequest,
		onSetOutputNodeRequest,
		boardMode,
	}: Readonly<{
		state: MapperNodeState;
		onSetInputNodeRequest: (mouseClientPosition: Coordinates) => void;
		onDoStepRequest: () => void;
		onUnsetMapperRequest: () => void;
		onSetMapperRequest: (mapper: Mapper) => void;
		onSetOutputNodeRequest: (mouseClientPosition: Coordinates) => void;
		boardMode: SupportedBoardMode | null;
	}> = $props();
	function handleSelectChange(
		event: Event & Readonly<{currentTarget: HTMLSelectElement}>,
	): void {
		if (event.currentTarget.value === "none") {
			onUnsetMapperRequest();
		} else {
			const selectedMapper = supportedMappers.find(
				(mapper) => mapper.id === event.currentTarget.value,
			) as (typeof supportedMappers)[number];
			onSetMapperRequest(selectedMapper);
		}
	}
	function handleDoStepButtonClick(): void {
		onDoStepRequest();
	}
	function handleSetInputNodeButtonClick(
		event: MouseEvent & Readonly<{currentTarget: HTMLButtonElement}>,
	): void {
		onSetInputNodeRequest({x: event.clientX, y: event.clientY});
	}
	function handleSetOutputNodeButtonClick(
		event: MouseEvent & Readonly<{currentTarget: HTMLButtonElement}>,
	): void {
		onSetOutputNodeRequest({x: event.clientX, y: event.clientY});
	}
</script>

<section>
	<button
		onclick={handleSetInputNodeButtonClick}
		disabled={boardMode !== null && boardMode.kindName === "settingInputNode"}
		>➡️📍</button
	>
	<button
		onclick={handleSetOutputNodeButtonClick}
		disabled={boardMode !== null && boardMode.kindName === "settingOutputNode"}
		>📍➡️</button
	>
	<select onchange={handleSelectChange}>
		<option
			value="none"
			selected={state instanceof NoMapperMapperNodeState
				|| state instanceof NoInputNodeAndNoMapperMapperNodeState
				|| state instanceof NoInputImageAndNoMapperMapperNodeState}
		>
			No mapper
		</option>
		{#each supportedMappers as mapper}
			<option
				value={mapper.id}
				selected={(state instanceof NoInputNodeMapperNodeState
					|| state instanceof NoInputImageMapperNodeState
					|| state instanceof MappingInProgressMapperNodeState
					|| state instanceof MappingSucceededMapperNodeState)
					&& state.mapper.id === mapper.id}
			>
				{mapper.name}
			</option>
		{/each}
	</select>
	{#if state instanceof NoInputImageMapperNodeState}
		<p>No input image</p>
	{:else if state instanceof NoInputNodeMapperNodeState}
		<p>No input node</p>
	{:else if state instanceof NoMapperMapperNodeState}
		<p>No mapper</p>
	{:else if state instanceof MappingSucceededMapperNodeState}
		<Canvas image={state.outputImage} />
	{:else if state instanceof MappingInProgressMapperNodeState}
		<Canvas image={state.outputImage} />
		<button onclick={handleDoStepButtonClick}>Do step</button>
	{:else if state instanceof NoInputImageAndNoMapperMapperNodeState}
		<p>No input image and no mapper</p>
	{:else if state instanceof NoInputNodeAndNoMapperMapperNodeState}
		<p>No input node and no mapper</p>
	{/if}
</section>
