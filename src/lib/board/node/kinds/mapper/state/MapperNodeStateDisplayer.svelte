<script lang="ts">
	import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../mode/SupportedBoardMode.ts";
	import Canvas from "../../../Canvas.svelte";
	import {MapperNode} from "../MapperNode.svelte.ts";
	import {supportedMappers} from "../supportedMappers.ts";
	import {MappingInProgressMapperNodeState} from "./kinds/mapping-in-progress/MappingInProgressMapperNodeState.svelte.ts";
	import {MappingSucceededMapperNodeState} from "./kinds/mapping-succeeded/MappingSucceededMapperNodeState.svelte.ts";
	import {NoInputAndNoMapperMapperNodeState} from "./kinds/no-input-and-no-mapper/NoInputAndNoMapperMapperNodeState.ts";
	import {NoInputMapperNodeState} from "./kinds/no-input/NoInputMapperNodeState.ts";
	import {NoMapperMapperNodeState} from "./kinds/no-mapper/NoMapperMapperNodeState.ts";
	const {
		node,
		onSetInputNodeRequest,
		mode,
	}: Readonly<{
		node: MapperNode;
		onSetInputNodeRequest: (
			targetNode: MapperNode,
			mouseClientPosition: Coordinates,
		) => void;
		mode: SupportedBoardMode | null;
	}> = $props();
	function handleSelectChange(
		event: Event & Readonly<{currentTarget: HTMLSelectElement}>,
	): void {
		if (event.currentTarget.value === "none") {
			node.unsetMapper();
		} else {
			const selectedMapper = supportedMappers.find(
				(mapper) => mapper.id === event.currentTarget.value,
			) as (typeof supportedMappers)[number];
			node.setMapper(selectedMapper);
		}
	}
	function handleDoStepButtonClick(): void {
		for (let stepIndex = 0; stepIndex < 10000; stepIndex += 1) {
			if (!(node.state instanceof MappingInProgressMapperNodeState)) {
				break;
			} else {
				node.state = node.state.doStep();
			}
		}
	}
	function handleSetInputNodeButtonClick(
		event: MouseEvent & Readonly<{currentTarget: HTMLButtonElement}>,
	): void {
		if (node.$inputNode === null) {
			onSetInputNodeRequest(node, {x: event.clientX, y: event.clientY});
		}
	}
</script>

<section>
	<button
		onclick={handleSetInputNodeButtonClick}
		disabled={node.$inputNode !== null
			|| (mode !== null && mode.kindName === "settingInputNode")}>➡️📍</button
	>
	<select onchange={handleSelectChange}>
		<option
			value="none"
			selected={node.state instanceof NoMapperMapperNodeState
				|| node.state instanceof NoInputAndNoMapperMapperNodeState}
		>
			No mapper
		</option>
		{#each supportedMappers as mapper}
			<option
				value={mapper.id}
				selected={(node.state instanceof NoInputMapperNodeState
					|| node.state instanceof MappingInProgressMapperNodeState)
					&& node.state.mapper.id === mapper.id}
			>
				{mapper.name}
			</option>
		{/each}
	</select>
	{#if node.state instanceof NoInputMapperNodeState}
		<p>No input</p>
	{:else if node.state instanceof NoMapperMapperNodeState}
		<p>No mapper</p>
	{:else if node.state instanceof MappingSucceededMapperNodeState}
		<Canvas image={node.state.output} />
	{:else if node.state instanceof MappingInProgressMapperNodeState}
		<Canvas image={node.state.output} />
		<button onclick={handleDoStepButtonClick}>Do step</button>
	{:else if node.state instanceof NoInputAndNoMapperMapperNodeState}
		<p>No input and no mapper</p>
	{/if}
</section>
