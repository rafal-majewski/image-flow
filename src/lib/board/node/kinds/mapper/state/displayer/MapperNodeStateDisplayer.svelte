<script lang="ts">
	import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../../mode/supported/SupportedBoardMode.ts";
	import Canvas from "../../../../Canvas.svelte";
	import {supportedMappers} from "../../supportedMappers.ts";
	import type {NodeId} from "../../../../id/NodeId.ts";
	import type {Mapper} from "../../mapper/Mapper.ts";
	import type {MapperNodeState} from "../MapperNodeState.ts";
	import {ManualNoInputNodeMapperNodeState} from "../kinds/manual-no-input-node/ManualNoInputNodeMapperNodeState.ts";
	import {InstantNoInputNodeMapperNodeState} from "../kinds/instant-no-input-node/InstantNoInputNodeMapperNodeState.ts";
	import {ManualMappingSucceededMapperNodeState} from "../kinds/manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
	import {ManualNoMapperMapperNodeState} from "../kinds/manual-no-mapper/ManualNoMapperMapperNodeState.ts";
	import {InstantNoMapperMapperNodeState} from "../kinds/instant-no-mapper/InstantNoMapperMapperNodeState.ts";
	import {InstantMappingSucceededMapperNodeState} from "../kinds/instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
	import {AnimatedNoInputNodeAndNoMapperMapperNodeState} from "../kinds/animated-no-input-node-and-no-mapper/AnimatedNoInputNodeAndNoMapperMapperNodeState.ts";
	import {AnimatedNoMapperMapperNodeState} from "../kinds/animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
	import {AnimatedMappingInProgressMapperNodeState} from "../kinds/animated-mapping-in-progress/AnimatedMappingInProgressMapperNodeState.ts";
	import {AnimatedMappingSucceededMapperNodeState} from "../kinds/animated-mapping-succeeded/AnimatedMappingSucceededMapperNodeState.ts";
	import {AnimatedNoInputNodeImageAndNoMapperMapperNodeState} from "../kinds/animated-no-input-node-image-and-no-mapper/AnimatedNoInputNodeImageAndNoMapperMapperNodeState.ts";
	import {AnimatedNoInputNodeImageMapperNodeState} from "../kinds/animated-no-input-node-image/AnimatedNoInputNodeImageMapperNodeState.ts";
	import {AnimatedNoInputNodeMapperNodeState} from "../kinds/animated-no-input-node/AnimatedNoInputNodeMapperNodeState.ts";
	import {InstantNoInputNodeAndNoMapperMapperNodeState} from "../kinds/instant-no-input-node-and-no-mapper/InstantNoInputNodeAndNoMapperMapperNodeState.ts";
	import {InstantNoInputNodeImageAndNoMapperMapperNodeState} from "../kinds/instant-no-input-node-image-and-no-mapper/InstantNoInputNodeImageAndNoMapperMapperNodeState.ts";
	import {InstantNoInputNodeImageMapperNodeState} from "../kinds/instant-no-input-node-image/InstantNoInputNodeImageMapperNodeState.ts";
	import {ManualMappingInProgressMapperNodeState} from "../kinds/manual-mapping-in-progress/ManualMappingInProgressMapperNodeState.ts";
	import {ManualNoInputNodeAndNoMapperMapperNodeState} from "../kinds/manual-no-input-node-and-no-mapper/ManualNoInputNodeAndNoMapperMapperNodeState.ts";
	import {ManualNoInputNodeImageAndNoMapperMapperNodeState} from "../kinds/manual-no-input-node-image-and-no-mapper/ManualNoInputNodeImageAndNoMapperMapperNodeState.ts";
	import {ManualNoInputNodeImageMapperNodeState} from "../kinds/manual-no-input-node-image/ManualNoInputNodeImageMapperNodeState.ts";
	import SupportedMapperDisplayer from "../../mapper/supported-displayer/SupportedMapperDisplayer.svelte";
	const {
		state,
		onDoManualStepsRequest,
		onUnsetMapperRequest,
		onSetMapperRequest,
		onSetNodeRequest,
		onSetOutputNodeRequest,
		boardMode,
		id,
		onMakeManualRequest,
		onMakeAnimatedRequest,
		onMakeInstantRequest,
		onSetStepCountRequest,
		onSetIntervalIntervalRequest,
		onResetOutputImageRequest,
	}: Readonly<{
		id: NodeId;
		state: MapperNodeState;
		onSetNodeRequest: (mouseClientPosition: Coordinates) => void;
		onDoManualStepsRequest: () => void;
		onUnsetMapperRequest: () => void;
		onSetMapperRequest: (mapper: Mapper) => void;
		onSetOutputNodeRequest: (mouseClientPosition: Coordinates) => void;
		boardMode: SupportedBoardMode | null;
		onMakeManualRequest: () => void;
		onMakeAnimatedRequest: () => void;
		onMakeInstantRequest: () => void;
		onSetStepCountRequest: (stepCount: number) => void;
		onSetIntervalIntervalRequest: (intervalIntervalSeconds: number) => void;
		onResetOutputImageRequest: () => void;
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
	function handleSetNodeButtonClick(
		event: MouseEvent & Readonly<{currentTarget: HTMLButtonElement}>,
	): void {
		onSetNodeRequest({x: event.clientX, y: event.clientY});
	}
	function handleSetOutputNodeButtonClick(
		event: MouseEvent & Readonly<{currentTarget: HTMLButtonElement}>,
	): void {
		onSetOutputNodeRequest({x: event.clientX, y: event.clientY});
	}
	function handleStepCountInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetStepCountRequest(Number.parseInt(event.currentTarget.value, 10));
	}
	function handleIntervalIntervalInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetIntervalIntervalRequest(Number.parseFloat(event.currentTarget.value));
	}
	function handleResetOutputImageButtonClick(
		event: Event & Readonly<{currentTarget: HTMLButtonElement}>,
	): void {
		onResetOutputImageRequest();
	}
</script>

<section>
	<button
		onclick={handleSetNodeButtonClick}
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
			selected={state
				instanceof AnimatedNoInputNodeImageAndNoMapperMapperNodeState
				|| state instanceof AnimatedNoInputNodeAndNoMapperMapperNodeState
				|| state instanceof AnimatedNoMapperMapperNodeState
				|| state instanceof InstantNoInputNodeImageAndNoMapperMapperNodeState
				|| state instanceof InstantNoInputNodeAndNoMapperMapperNodeState
				|| state instanceof InstantNoMapperMapperNodeState
				|| state instanceof ManualNoInputNodeImageAndNoMapperMapperNodeState
				|| state instanceof ManualNoInputNodeAndNoMapperMapperNodeState
				|| state instanceof ManualNoMapperMapperNodeState}
		>
			No mapper
		</option>
		{#each supportedMappers as mapper}
			<option
				value={mapper.id}
				selected={(state instanceof AnimatedMappingInProgressMapperNodeState
					|| state instanceof AnimatedMappingSucceededMapperNodeState
					|| state instanceof AnimatedNoInputNodeImageMapperNodeState
					|| state instanceof AnimatedNoInputNodeMapperNodeState
					|| state instanceof InstantMappingSucceededMapperNodeState
					|| state instanceof InstantNoInputNodeImageMapperNodeState
					|| state instanceof InstantNoInputNodeMapperNodeState
					|| state instanceof ManualMappingInProgressMapperNodeState
					|| state instanceof ManualMappingSucceededMapperNodeState
					|| state instanceof ManualNoInputNodeImageMapperNodeState
					|| state instanceof ManualNoInputNodeMapperNodeState)
					&& state.mapper.id === mapper.id}>{mapper.name}</option
			>
		{/each}
	</select>
	{#if state instanceof AnimatedMappingInProgressMapperNodeState || state instanceof AnimatedMappingSucceededMapperNodeState || state instanceof AnimatedNoInputNodeImageMapperNodeState || state instanceof AnimatedNoInputNodeMapperNodeState || state instanceof InstantMappingSucceededMapperNodeState || state instanceof InstantNoInputNodeImageMapperNodeState || state instanceof InstantNoInputNodeMapperNodeState || state instanceof ManualMappingInProgressMapperNodeState || state instanceof ManualMappingSucceededMapperNodeState || state instanceof ManualNoInputNodeImageMapperNodeState || state instanceof ManualNoInputNodeMapperNodeState}
		<SupportedMapperDisplayer mapper={state.mapper} {onSetMapperRequest} />
	{/if}
	{#if state instanceof AnimatedNoInputNodeImageMapperNodeState || state instanceof InstantNoInputNodeImageMapperNodeState || state instanceof ManualNoInputNodeImageMapperNodeState}
		<p>No input image</p>
	{:else if state instanceof AnimatedNoInputNodeMapperNodeState || state instanceof InstantNoInputNodeMapperNodeState || state instanceof ManualNoInputNodeMapperNodeState}
		<p>No input node</p>
	{:else if state instanceof AnimatedNoMapperMapperNodeState || state instanceof InstantNoMapperMapperNodeState || state instanceof ManualNoMapperMapperNodeState}
		<p>No mapper</p>
	{:else if state instanceof AnimatedMappingInProgressMapperNodeState || state instanceof AnimatedMappingSucceededMapperNodeState || state instanceof InstantMappingSucceededMapperNodeState || state instanceof ManualMappingInProgressMapperNodeState || state instanceof ManualMappingSucceededMapperNodeState}
		<Canvas image={state.outputImage} />
	{:else if state instanceof AnimatedNoInputNodeImageAndNoMapperMapperNodeState || state instanceof InstantNoInputNodeImageAndNoMapperMapperNodeState || state instanceof ManualNoInputNodeImageAndNoMapperMapperNodeState}
		<p>No input image and no mapper</p>
	{:else if state instanceof AnimatedNoInputNodeAndNoMapperMapperNodeState || state instanceof InstantNoInputNodeAndNoMapperMapperNodeState || state instanceof ManualNoInputNodeAndNoMapperMapperNodeState}
		<p>No input node and no mapper</p>
	{/if}
	<fieldset>
		<legend>Mode</legend>
		<div>
			<label>
				<input
					type="radio"
					name="{id}-mode"
					value="manual"
					checked={state instanceof ManualMappingInProgressMapperNodeState
						|| state instanceof ManualMappingSucceededMapperNodeState
						|| state instanceof ManualNoInputNodeImageAndNoMapperMapperNodeState
						|| state instanceof ManualNoInputNodeImageMapperNodeState
						|| state instanceof ManualNoInputNodeAndNoMapperMapperNodeState
						|| state instanceof ManualNoInputNodeMapperNodeState
						|| state instanceof ManualNoMapperMapperNodeState}
					onchange={onMakeManualRequest}
				/>
				Manual
			</label>
			<label>
				<input
					type="radio"
					name="{id}-mode"
					value="animated"
					checked={state instanceof AnimatedMappingInProgressMapperNodeState
						|| state instanceof AnimatedMappingSucceededMapperNodeState
						|| state
							instanceof AnimatedNoInputNodeImageAndNoMapperMapperNodeState
						|| state instanceof AnimatedNoInputNodeImageMapperNodeState
						|| state instanceof AnimatedNoInputNodeAndNoMapperMapperNodeState
						|| state instanceof AnimatedNoInputNodeMapperNodeState
						|| state instanceof AnimatedNoMapperMapperNodeState}
					onchange={onMakeAnimatedRequest}
				/>
				Animated
			</label>
			<label>
				<input
					type="radio"
					name="{id}-mode"
					value="instant"
					checked={state instanceof InstantMappingSucceededMapperNodeState
						|| state
							instanceof InstantNoInputNodeImageAndNoMapperMapperNodeState
						|| state instanceof InstantNoInputNodeImageMapperNodeState
						|| state instanceof InstantNoInputNodeAndNoMapperMapperNodeState
						|| state instanceof InstantNoInputNodeMapperNodeState
						|| state instanceof InstantNoMapperMapperNodeState}
					onchange={onMakeInstantRequest}
				/>
				Instant
			</label>
		</div>
		{#if state instanceof ManualMappingInProgressMapperNodeState || state instanceof ManualMappingSucceededMapperNodeState || state instanceof ManualNoInputNodeImageAndNoMapperMapperNodeState || state instanceof ManualNoInputNodeImageMapperNodeState || state instanceof ManualNoInputNodeAndNoMapperMapperNodeState || state instanceof ManualNoInputNodeMapperNodeState || state instanceof ManualNoMapperMapperNodeState || state instanceof AnimatedMappingInProgressMapperNodeState || state instanceof AnimatedMappingSucceededMapperNodeState || state instanceof AnimatedNoInputNodeImageAndNoMapperMapperNodeState || state instanceof AnimatedNoInputNodeImageMapperNodeState || state instanceof AnimatedNoInputNodeAndNoMapperMapperNodeState || state instanceof AnimatedNoInputNodeMapperNodeState || state instanceof AnimatedNoMapperMapperNodeState}
			<div>
				{#if state instanceof ManualMappingInProgressMapperNodeState || state instanceof ManualMappingSucceededMapperNodeState || state instanceof ManualNoInputNodeImageAndNoMapperMapperNodeState || state instanceof ManualNoInputNodeImageMapperNodeState || state instanceof ManualNoInputNodeAndNoMapperMapperNodeState || state instanceof ManualNoInputNodeMapperNodeState || state instanceof ManualNoMapperMapperNodeState}
					<label>
						Step count:
						<input
							type="number"
							min="1"
							step="1"
							value={state.stepCount}
							onchange={handleStepCountInputChange}
						/>
					</label>
					<button onclick={handleDoManualStepsButtonClick}>Do steps</button>
				{/if}
				{#if state instanceof AnimatedMappingInProgressMapperNodeState || state instanceof AnimatedMappingSucceededMapperNodeState || state instanceof AnimatedNoInputNodeImageAndNoMapperMapperNodeState || state instanceof AnimatedNoInputNodeImageMapperNodeState || state instanceof AnimatedNoInputNodeAndNoMapperMapperNodeState || state instanceof AnimatedNoInputNodeMapperNodeState || state instanceof AnimatedNoMapperMapperNodeState}
					<label>
						Interval (seconds):
						<input
							type="number"
							min="0.0001"
							step="0.0001"
							value={state.intervalIntervalSeconds}
							onchange={handleIntervalIntervalInputChange}
						/>
					</label>
				{/if}
				<button onclick={handleResetOutputImageButtonClick}>Reset</button>
			</div>
		{/if}
	</fieldset>
</section>
