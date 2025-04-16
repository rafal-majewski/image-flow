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
	import type {SupportedMapperNodeMode} from "../mode/SupportedMapperNodeMode.ts";
	import type {NodeId} from "../../../id/NodeId.ts";
	const {
		state,
		onDoManualStepsRequest,
		onUnsetMapperRequest,
		onSetMapperRequest,
		onSetInputNodeRequest,
		onSetOutputNodeRequest,
		boardMode,
		mode,
		id,
		onSetModeRequest,
	}: Readonly<{
		id: NodeId;
		mode: SupportedMapperNodeMode;
		state: MapperNodeState;
		onSetInputNodeRequest: (mouseClientPosition: Coordinates) => void;
		onDoManualStepsRequest: () => void;
		onUnsetMapperRequest: () => void;
		onSetMapperRequest: (mapper: Mapper) => void;
		onSetOutputNodeRequest: (mouseClientPosition: Coordinates) => void;
		boardMode: SupportedBoardMode | null;
		onSetModeRequest: (mode: SupportedMapperNodeMode["kindName"]) => void;
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
	function handleDoManualStepsButtonClick(): void {
		onDoManualStepsRequest();
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
	function handleModeRadioInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetModeRequest(
			event.currentTarget.value as SupportedMapperNodeMode["kindName"],
		);
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
		{#if mode.kindName === "manual"}
			<button onclick={handleDoManualStepsButtonClick}>Do steps</button>
		{/if}
	{:else if state instanceof NoInputImageAndNoMapperMapperNodeState}
		<p>No input image and no mapper</p>
	{:else if state instanceof NoInputNodeAndNoMapperMapperNodeState}
		<p>No input node and no mapper</p>
	{/if}
	<fieldset>
		<legend>Mode</legend>
		{mode.kindName}
		<div>
			<label>
				<input
					type="radio"
					name="{id}-mode"
					value="manual"
					checked={mode.kindName === "manual"}
					onchange={handleModeRadioInputChange}
				/>
				Manual
			</label>
			<label>
				<input
					type="radio"
					name="{id}-mode"
					value="animated"
					checked={mode.kindName === "animated"}
					onchange={handleModeRadioInputChange}
				/>
				Animated
			</label>
			<label>
				<input
					type="radio"
					name="{id}-mode"
					value="instant"
					checked={mode.kindName === "instant"}
					onchange={handleModeRadioInputChange}
				/>
				Instant
			</label>
		</div>
		{#if mode.kindName === "manual"}
			<div>
				<label>
					Step count:
					<input type="number" min="1" step="1" value={mode.data.stepCount} />
				</label>
			</div>
		{:else if mode.kindName === "animated"}
			<div>
				<label>
					Interval:
					<input
						type="number"
						min="0.01"
						step="0.01"
						value={mode.data.intervalIntervalSeconds}
					/>
				</label>
				<button>Pause/Unpause</button>
			</div>
		{/if}
	</fieldset>
</section>
