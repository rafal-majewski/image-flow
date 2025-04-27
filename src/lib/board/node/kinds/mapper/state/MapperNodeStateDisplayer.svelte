<script lang="ts">
	import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../mode/SupportedBoardMode.ts";
	import Canvas from "../../../Canvas.svelte";
	import {supportedMappers} from "../supportedMappers.ts";
	import type {NodeId} from "../../../id/NodeId.ts";
	import type {Mapper} from "../mapper/Mapper.ts";
	import type {MapperNodeState} from "./MapperNodeState.ts";
	import {ManualNoInputImageMapperNodeState} from "./kinds/manual-no-input-image/ManualNoInputImageMapperNodeState.ts";
	import {ManualNoInputNodeMapperNodeState} from "./kinds/manual-no-input-node/ManualNoInputNodeMapperNodeState.ts";
	import {InstantNoInputNodeMapperNodeState} from "./kinds/instant-no-input-node/InstantNoInputNodeMapperNodeState.ts";
	import {ManualMappingSucceededMapperNodeState} from "./kinds/manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
	import {ManualNoMapperMapperNodeState} from "./kinds/manual-no-mapper/ManualNoMapperMapperNodeState.ts";
	import {InstantNoMapperMapperNodeState} from "./kinds/instant-no-mapper/InstantNoMapperMapperNodeState.ts";
	import {InstantMappingSucceededMapperNodeState} from "./kinds/instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
	import {InstantNoInputImageMapperNodeState} from "./kinds/instant-no-input-image/InstantNoInputImageMapperNodeState.ts";
	import {ManualMappingInProgressMapperNodeState} from "./kinds/manual-mapping-in-progress/ManualMappingInProgressMapperNodeState.ts";
	import {ManualNoInputImageAndNoMapperMapperNodeState} from "./kinds/manual-no-input-image-and-no-mapper/ManualNoInputImageAndNoMapperMapperNodeState.ts";
	import {ManualNoInputNodeAndNoMapperMapperNodeState} from "./kinds/manual-no-input-node-and-no-mapper/ManualNoInputNodeAndNoMapperMapperNodeState.ts";
	import {InstantNoInputImageAndNoMapperMapperNodeState} from "./kinds/instant-no-input-image-and-no-mapper/InstantNoInputImageAndNoMapperMapperNodeState.ts";
	import {InstantNoInputNodeAndNoMapperMapperNodeState} from "./kinds/instant-no-input-node-and-no-mapper/InstantNoInputNodeAndNoMapperMapperNodeState.ts";
	import {AnimatedMappingInProgressMapperNodeState} from "./kinds/animated-mapping-in-progress/AnimatedMappingInProgressMapperNodeState.ts";
	import {AnimatedMappingSucceededMapperNodeState} from "./kinds/animated-mapping-succeeded/AnimatedMappingSucceededMapperNodeState.ts";
	import {AnimatedNoInputImageMapperNodeState} from "./kinds/animated-no-input-image/AnimatedNoInputImageMapperNodeState.ts";
	import {AnimatedNoInputNodeMapperNodeState} from "./kinds/animated-no-input-node/AnimatedNoInputNodeMapperNodeState.ts";
	import {AnimatedNoInputImageAndNoMapperMapperNodeState} from "./kinds/animated-no-input-image-and-no-mapper/AnimatedNoInputImageAndNoMapperMapperNodeState.ts";
	import {AnimatedNoInputNodeAndNoMapperMapperNodeState} from "./kinds/animated-no-input-node-and-no-mapper/AnimatedNoInputNodeAndNoMapperMapperNodeState.ts";
	import {AnimatedNoMapperMapperNodeState} from "./kinds/animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
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
				|| state instanceof AnimatedNoInputNodeAndNoMapperMapperNodeState
				|| state instanceof AnimatedNoMapperMapperNodeState
				|| state instanceof InstantNoInputImageAndNoMapperMapperNodeState
				|| state instanceof InstantNoInputNodeAndNoMapperMapperNodeState
				|| state instanceof InstantNoMapperMapperNodeState
				|| state instanceof ManualNoInputImageAndNoMapperMapperNodeState
				|| state instanceof ManualNoInputNodeAndNoMapperMapperNodeState
				|| state instanceof ManualNoMapperMapperNodeState}>No mapper</option
		>
		{#each supportedMappers as mapper}
			<option
				value={mapper.id}
				selected={(state instanceof AnimatedMappingInProgressMapperNodeState
					|| state instanceof AnimatedMappingSucceededMapperNodeState
					|| state instanceof AnimatedNoInputImageMapperNodeState
					|| state instanceof AnimatedNoInputNodeMapperNodeState
					|| state instanceof InstantMappingSucceededMapperNodeState
					|| state instanceof InstantNoInputImageMapperNodeState
					|| state instanceof InstantNoInputNodeMapperNodeState
					|| state instanceof ManualMappingInProgressMapperNodeState
					|| state instanceof ManualMappingSucceededMapperNodeState
					|| state instanceof ManualNoInputImageMapperNodeState
					|| state instanceof ManualNoInputNodeMapperNodeState)
					&& state.mapper.id === mapper.id}>{mapper.name}</option
			>
		{/each}
	</select>
	{#if state instanceof AnimatedNoInputImageMapperNodeState || state instanceof InstantNoInputImageMapperNodeState || state instanceof ManualNoInputImageMapperNodeState}
		<p>No input image</p>
	{:else if state instanceof AnimatedNoInputNodeMapperNodeState || state instanceof InstantNoInputNodeMapperNodeState || state instanceof ManualNoInputNodeMapperNodeState}
		<p>No input node</p>
	{:else if state instanceof AnimatedNoMapperMapperNodeState || state instanceof InstantNoMapperMapperNodeState || state instanceof ManualNoMapperMapperNodeState}
		<p>No mapper</p>
	{:else if state instanceof AnimatedMappingInProgressMapperNodeState || state instanceof AnimatedMappingSucceededMapperNodeState || state instanceof InstantMappingSucceededMapperNodeState || state instanceof ManualMappingInProgressMapperNodeState || state instanceof ManualMappingSucceededMapperNodeState}
		<Canvas image={state.outputImage} />
	{:else if state instanceof AnimatedNoInputImageAndNoMapperMapperNodeState || state instanceof InstantNoInputImageAndNoMapperMapperNodeState || state instanceof ManualNoInputImageAndNoMapperMapperNodeState}
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
						|| state instanceof ManualNoInputImageAndNoMapperMapperNodeState
						|| state instanceof ManualNoInputImageMapperNodeState
						|| state instanceof ManualNoInputNodeAndNoMapperMapperNodeState
						|| state instanceof ManualNoInputNodeMapperNodeState
						|| state instanceof ManualNoMapperMapperNodeState}
					onchange={onMakeManualRequest}
				/>Manual{#if state instanceof ManualMappingInProgressMapperNodeState || state instanceof ManualMappingSucceededMapperNodeState || state instanceof ManualNoInputImageAndNoMapperMapperNodeState || state instanceof ManualNoInputImageMapperNodeState || state instanceof ManualNoInputNodeAndNoMapperMapperNodeState || state instanceof ManualNoInputNodeMapperNodeState || state instanceof ManualNoMapperMapperNodeState}
					<div>
						<label
							>Step count:<input
								type="number"
								min="1"
								step="1"
								value={state.stepCount}
							/>
						</label>
						<button onclick={handleDoManualStepsButtonClick}>Do steps</button>
					</div>
				{/if}
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
						|| state instanceof AnimatedNoInputNodeAndNoMapperMapperNodeState
						|| state instanceof AnimatedNoInputNodeMapperNodeState
						|| state instanceof AnimatedNoMapperMapperNodeState}
					onchange={onMakeAnimatedRequest}
				/>Animated{#if state instanceof AnimatedMappingInProgressMapperNodeState || state instanceof AnimatedMappingSucceededMapperNodeState || state instanceof AnimatedNoInputImageAndNoMapperMapperNodeState || state instanceof AnimatedNoInputImageMapperNodeState || state instanceof AnimatedNoInputNodeAndNoMapperMapperNodeState || state instanceof AnimatedNoInputNodeMapperNodeState || state instanceof AnimatedNoMapperMapperNodeState}
					<div>
						<label
							>Interval:<input
								type="number"
								min="0.01"
								step="0.01"
								value={state.intervalIntervalSeconds}
							/>
						</label>
						<button>Pause/Unpause</button>
					</div>
				{/if}
			</label>
			<label>
				<input
					type="radio"
					name="{id}-mode"
					value="instant"
					checked={state instanceof InstantMappingSucceededMapperNodeState
						|| state instanceof InstantNoInputImageAndNoMapperMapperNodeState
						|| state instanceof InstantNoInputImageMapperNodeState
						|| state instanceof InstantNoInputNodeAndNoMapperMapperNodeState
						|| state instanceof InstantNoInputNodeMapperNodeState
						|| state instanceof InstantNoMapperMapperNodeState}
					onchange={onMakeInstantRequest}
				/>Instant</label
			>
		</div>
	</fieldset>
</section>
