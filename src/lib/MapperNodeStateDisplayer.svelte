<script lang="ts">
	import type {MapperNodeState} from "./MapperNodeState.ts";
	import {NoInputMapperNodeState} from "./NoInputMapperNodeState.ts";
	import {NoMapperMapperNodeState} from "./NoMapperMapperNodeState.ts";
	import {NoInputAndNoMapperMapperNodeState} from "./NoInputAndNoMapperMapperNodeState.ts";
	import {supportedMappers} from "./supportedMappers.ts";
	import {WorkingMapperNodeState} from "./WorkingMapperNodeState.ts";
	import type {Mapper} from "./Mapper.ts";
	const {
		state,
		onUnsetMapperRequest,
		onSetMapperRequest,
	}: Readonly<{
		state: MapperNodeState;
		onUnsetMapperRequest: () => void;
		onSetMapperRequest: (newMapper: Mapper) => void;
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
</script>

<section>
	<select onchange={handleSelectChange}>
		<option
			value="none"
			selected={state instanceof NoMapperMapperNodeState
				|| state instanceof NoInputAndNoMapperMapperNodeState}
		>
			No mapper
		</option>
		{#each supportedMappers as mapper}
			<option
				value={mapper.id}
				selected={(state instanceof NoInputMapperNodeState
					|| state instanceof WorkingMapperNodeState)
					&& state.mapper.id === mapper.id}
			>
				{mapper.name}
			</option>
		{/each}
	</select>
	{#if state instanceof NoInputMapperNodeState}
		<p>No input</p>
	{:else if state instanceof NoMapperMapperNodeState}
		<p>No mapper</p>
	{:else if state instanceof NoInputAndNoMapperMapperNodeState}
		<p>No input and no mapper</p>
	{/if}
</section>
