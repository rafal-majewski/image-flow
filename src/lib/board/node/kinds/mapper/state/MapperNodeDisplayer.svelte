<script lang="ts">
	import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../mode/SupportedBoardMode.ts";
	import Canvas from "../../../Canvas.svelte";
	import {MapperNode} from "../MapperNode.svelte.ts";
	import {supportedMappers} from "../supportedMappers.ts";
	import {MappingInProgressMapperNode} from "./kinds/mapping-in-progress/MappingInProgressMapperNode.svelte.ts";
	import {MappingSucceededMapperNode} from "./kinds/mapping-succeeded/MappingSucceededMapperNode.svelte.ts";
	import {NoInputMapperNode} from "./kinds/no-input-node/NoInputNodeMapperNode.ts";
	import {NoMapperMapperNode} from "./kinds/no-mapper/NoMapperMapperNode.ts";
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
			if (!(node.state instanceof MappingInProgressMapperNode)) {
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
			selected={node.state instanceof NoMapperMapperNode
				|| node.state instanceof NoInputAndNoMapperMapperNode}
		>
			No mapper
		</option>
		{#each supportedMappers as mapper}
			<option
				value={mapper.id}
				selected={(node.state instanceof NoInputMapperNode
					|| node.state instanceof MappingInProgressMapperNode)
					&& node.state.mapper.id === mapper.id}
			>
				{mapper.name}
			</option>
		{/each}
	</select>
	{#if node.state instanceof NoInputMapperNode}
		<p>No input</p>
	{:else if node.state instanceof NoMapperMapperNode}
		<p>No mapper</p>
	{:else if node.state instanceof MappingSucceededMapperNode}
		<Canvas image={node.state.outputImage} />
	{:else if node.state instanceof MappingInProgressMapperNode}
		<Canvas image={node.state.outputImage} />
		<button onclick={handleDoStepButtonClick}>Do step</button>
	{:else if node.state instanceof NoInputAndNoMapperMapperNode}
		<p>No input and no mapper</p>
	{/if}
</section>
