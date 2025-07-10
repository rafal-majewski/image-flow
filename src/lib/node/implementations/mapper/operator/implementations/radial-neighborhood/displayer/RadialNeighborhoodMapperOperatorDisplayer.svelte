<script lang="ts">
	import type {
		RadialNeighborhoodMapperOperator,
		RadialNeighborhoodMode,
	} from "../RadialNeighborhoodMapperOperator.ts";
	const {
		operator,
		onSetOperatorRequest,
	}: {
		readonly operator: RadialNeighborhoodMapperOperator;
		readonly onSetOperatorRequest: (
			operator: RadialNeighborhoodMapperOperator,
		) => void;
	} = $props();
	function handleRadiusInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	) {
		onSetOperatorRequest(
			operator.replaceRadius(event.currentTarget.valueAsNumber),
		);
	}
	function handleModeChange(
		event: Event & {readonly currentTarget: HTMLSelectElement},
	) {
		onSetOperatorRequest(
			operator.replaceMode(event.currentTarget.value as RadialNeighborhoodMode),
		);
	}
	function handleMixFactorInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	) {
		onSetOperatorRequest(
			operator.replaceMixFactor(event.currentTarget.valueAsNumber),
		);
	}
</script>

<section>
	<label>
		Mode
		<select value={operator.mode} onchange={handleModeChange}>
			<option value="none">None</option>
			<option value="blur">Blur</option>
			<option value="min">Min</option>
			<option value="max">Max</option>
			<option value="minmax-avg">Min/Max Avg</option>
		</select>
	</label>
	<label>
		Radius
		<input
			type="number"
			min="1"
			step="1"
			value={operator.radius}
			onchange={handleRadiusInputChange}
		/>
	</label>
	{#if operator.mode === "blur"}
		<label>
			Mix factor
			<input
				type="number"
				min="0"
				max="1"
				step="0.01"
				value={operator.mixFactor}
				onchange={handleMixFactorInputChange}
			/>
		</label>
	{/if}
</section>

<style lang="scss">
</style>
