<script lang="ts">
	import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../../mode/supported/SupportedBoardMode.ts";
	import Canvas from "../../../../Canvas.svelte";
	import {supportedMappers} from "../../supportedMappers.ts";
	import type {NodeId} from "../../../../id/NodeId.ts";
	import type {Mapper} from "../../mapper/Mapper.ts";
	import type {MapperNodeState} from "../MapperNodeState.ts";
	import {ManualNoInputEdgeMapperNodeState} from "../kinds/manual-no-input-node/ManualNoInputEdgeMapperNodeState.ts";
	import {InstantNoInputEdgeMapperNodeState} from "../kinds/instant-no-input-node/InstantNoInputEdgeMapperNodeState.ts";
	import {ManualMappingSucceededMapperNodeState} from "../kinds/manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
	import {ManualNoMapperMapperNodeState} from "../kinds/manual-no-mapper/ManualNoMapperMapperNodeState.ts";
	import {InstantNoMapperMapperNodeState} from "../kinds/instant-no-mapper/InstantNoMapperMapperNodeState.ts";
	import {InstantMappingSucceededMapperNodeState} from "../kinds/instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
	import {AnimatedNoInputEdgeAndNoMapperMapperNodeState} from "../kinds/animated-no-input-node-and-no-mapper/AnimatedNoInputEdgeAndNoMapperMapperNodeState.ts";
	import {AnimatedNoMapperMapperNodeState} from "../kinds/animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
	import {AnimatedMappingInProgressMapperNodeState} from "../kinds/animated-mapping-in-progress/AnimatedMappingInProgressMapperNodeState.ts";
	import {AnimatedMappingSucceededMapperNodeState} from "../kinds/animated-mapping-succeeded/AnimatedMappingSucceededMapperNodeState.ts";
	import {AnimatedNoInputImageAndNoMapperMapperNodeState} from "../kinds/animated-no-input-node-image-and-no-mapper/AnimatedNoInputImageAndNoMapperMapperNodeState.ts";
	import {AnimatedNoInputImageMapperNodeState} from "../kinds/animated-no-input-node-image/AnimatedNoInputImageMapperNodeState.ts";
	import {AnimatedNoInputEdgeMapperNodeState} from "../kinds/animated-no-input-node/AnimatedNoInputEdgeMapperNodeState.ts";
	import {InstantNoInputEdgeAndNoMapperMapperNodeState} from "../kinds/instant-no-input-node-and-no-mapper/InstantNoInputEdgeAndNoMapperMapperNodeState.ts";
	import {InstantNoInputImageAndNoMapperMapperNodeState} from "../kinds/instant-no-input-node-image-and-no-mapper/InstantNoInputImageAndNoMapperMapperNodeState.ts";
	import {InstantNoInputImageMapperNodeState} from "../kinds/instant-no-input-node-image/InstantNoInputImageMapperNodeState.ts";
	import {ManualMappingInProgressMapperNodeState} from "../kinds/manual-mapping-in-progress/ManualMappingInProgressMapperNodeState.ts";
	import {ManualNoInputEdgeAndNoMapperMapperNodeState} from "../kinds/manual-no-input-node-and-no-mapper/ManualNoInputEdgeAndNoMapperMapperNodeState.ts";
	import {ManualNoInputImageAndNoMapperMapperNodeState} from "../kinds/manual-no-input-node-image-and-no-mapper/ManualNoInputImageAndNoMapperMapperNodeState.ts";
	import {ManualNoInputImageMapperNodeState} from "../kinds/manual-no-input-node-image/ManualNoInputImageMapperNodeState.ts";
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
			selected={state instanceof AnimatedNoInputImageAndNoMapperMapperNodeState
				|| state instanceof AnimatedNoInputEdgeAndNoMapperMapperNodeState
				|| state instanceof AnimatedNoMapperMapperNodeState
				|| state instanceof InstantNoInputImageAndNoMapperMapperNodeState
				|| state instanceof InstantNoInputEdgeAndNoMapperMapperNodeState
				|| state instanceof InstantNoMapperMapperNodeState
				|| state instanceof ManualNoInputImageAndNoMapperMapperNodeState
				|| state instanceof ManualNoInputEdgeAndNoMapperMapperNodeState
				|| state instanceof ManualNoMapperMapperNodeState}
		>
			No mapper
		</option>
		{#each supportedMappers as mapper}
			<option
				value={mapper.id}
				selected={(state instanceof AnimatedMappingInProgressMapperNodeState
					|| state instanceof AnimatedMappingSucceededMapperNodeState
					|| state instanceof AnimatedNoInputImageMapperNodeState
					|| state instanceof AnimatedNoInputEdgeMapperNodeState
					|| state instanceof InstantMappingSucceededMapperNodeState
					|| state instanceof InstantNoInputImageMapperNodeState
					|| state instanceof InstantNoInputEdgeMapperNodeState
					|| state instanceof ManualMappingInProgressMapperNodeState
					|| state instanceof ManualMappingSucceededMapperNodeState
					|| state instanceof ManualNoInputImageMapperNodeState
					|| state instanceof ManualNoInputEdgeMapperNodeState)
					&& state.mapper.id === mapper.id}>{mapper.name}</option
			>
		{/each}
	</select>
	{#if state instanceof AnimatedMappingInProgressMapperNodeState || state instanceof AnimatedMappingSucceededMapperNodeState || state instanceof AnimatedNoInputImageMapperNodeState || state instanceof AnimatedNoInputEdgeMapperNodeState || state instanceof InstantMappingSucceededMapperNodeState || state instanceof InstantNoInputImageMapperNodeState || state instanceof InstantNoInputEdgeMapperNodeState || state instanceof ManualMappingInProgressMapperNodeState || state instanceof ManualMappingSucceededMapperNodeState || state instanceof ManualNoInputImageMapperNodeState || state instanceof ManualNoInputEdgeMapperNodeState}
		<SupportedMapperDisplayer
			mapper={state.mapper}
			{onSetMapperRequest}
			nodeId={id}
		/>
	{/if}
	{#if state instanceof AnimatedNoInputImageMapperNodeState || state instanceof InstantNoInputImageMapperNodeState || state instanceof ManualNoInputImageMapperNodeState}
		<p>No input image</p>
	{:else if state instanceof AnimatedNoInputEdgeMapperNodeState || state instanceof InstantNoInputEdgeMapperNodeState || state instanceof ManualNoInputEdgeMapperNodeState}
		<p>No input node</p>
	{:else if state instanceof AnimatedNoMapperMapperNodeState || state instanceof InstantNoMapperMapperNodeState || state instanceof ManualNoMapperMapperNodeState}
		<p>No mapper</p>
	{:else if state instanceof AnimatedMappingInProgressMapperNodeState || state instanceof AnimatedMappingSucceededMapperNodeState || state instanceof InstantMappingSucceededMapperNodeState || state instanceof ManualMappingInProgressMapperNodeState || state instanceof ManualMappingSucceededMapperNodeState}
		<Canvas image={state.outputImage} />
	{:else if state instanceof AnimatedNoInputImageAndNoMapperMapperNodeState || state instanceof InstantNoInputImageAndNoMapperMapperNodeState || state instanceof ManualNoInputImageAndNoMapperMapperNodeState}
		<p>No input image and no mapper</p>
	{:else if state instanceof AnimatedNoInputEdgeAndNoMapperMapperNodeState || state instanceof InstantNoInputEdgeAndNoMapperMapperNodeState || state instanceof ManualNoInputEdgeAndNoMapperMapperNodeState}
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
						|| state instanceof ManualNoInputImageAndNoMapperMapperNodeState
						|| state instanceof ManualNoInputImageMapperNodeState
						|| state instanceof ManualNoInputEdgeAndNoMapperMapperNodeState
						|| state instanceof ManualNoInputEdgeMapperNodeState
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
						|| state instanceof AnimatedNoInputImageAndNoMapperMapperNodeState
						|| state instanceof AnimatedNoInputImageMapperNodeState
						|| state instanceof AnimatedNoInputEdgeAndNoMapperMapperNodeState
						|| state instanceof AnimatedNoInputEdgeMapperNodeState
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
						|| state instanceof InstantNoInputImageAndNoMapperMapperNodeState
						|| state instanceof InstantNoInputImageMapperNodeState
						|| state instanceof InstantNoInputEdgeAndNoMapperMapperNodeState
						|| state instanceof InstantNoInputEdgeMapperNodeState
						|| state instanceof InstantNoMapperMapperNodeState}
					onchange={onMakeInstantRequest}
				/>
				Instant
			</label>
		</div>
		{#if state instanceof ManualMappingInProgressMapperNodeState || state instanceof ManualMappingSucceededMapperNodeState || state instanceof ManualNoInputImageAndNoMapperMapperNodeState || state instanceof ManualNoInputImageMapperNodeState || state instanceof ManualNoInputEdgeAndNoMapperMapperNodeState || state instanceof ManualNoInputEdgeMapperNodeState || state instanceof ManualNoMapperMapperNodeState || state instanceof AnimatedMappingInProgressMapperNodeState || state instanceof AnimatedMappingSucceededMapperNodeState || state instanceof AnimatedNoInputImageAndNoMapperMapperNodeState || state instanceof AnimatedNoInputImageMapperNodeState || state instanceof AnimatedNoInputEdgeAndNoMapperMapperNodeState || state instanceof AnimatedNoInputEdgeMapperNodeState || state instanceof AnimatedNoMapperMapperNodeState}
			<div>
				{#if state instanceof ManualMappingInProgressMapperNodeState || state instanceof ManualMappingSucceededMapperNodeState || state instanceof ManualNoInputImageAndNoMapperMapperNodeState || state instanceof ManualNoInputImageMapperNodeState || state instanceof ManualNoInputEdgeAndNoMapperMapperNodeState || state instanceof ManualNoInputEdgeMapperNodeState || state instanceof ManualNoMapperMapperNodeState}
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
				{#if state instanceof AnimatedMappingInProgressMapperNodeState || state instanceof AnimatedMappingSucceededMapperNodeState || state instanceof AnimatedNoInputImageAndNoMapperMapperNodeState || state instanceof AnimatedNoInputImageMapperNodeState || state instanceof AnimatedNoInputEdgeAndNoMapperMapperNodeState || state instanceof AnimatedNoInputEdgeMapperNodeState || state instanceof AnimatedNoMapperMapperNodeState}
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
