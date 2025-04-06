<script lang="ts">
	import type {Mapper} from "./mapper/Mapper.ts";
	import {NoInputAndNoMapperMapperNodeState} from "./states/no-input-and-no-mapper/NoInputAndNoMapperMapperNodeState.ts";
	import {NoInputMapperNodeState} from "./states/no-input/NoInputMapperNodeState.ts";
	import {NoMapperMapperNodeState} from "./states/no-mapper/NoMapperMapperNodeState.ts";
	import type {SupportedMapperNodeState} from "./SupportedMapperNodeState.ts";
	import {supportedMappers} from "./supportedMappers.ts";
	import {WorkingMapperNodeState} from "./WorkingMapperNodeState.ts";
	const {
		state,
		onUnsetMapperRequest,
		onSetMapperRequest,
	}: Readonly<{
		state: SupportedMapperNodeState;
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
