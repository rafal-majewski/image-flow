<script lang="ts">
	import type {AverageBlurringMapperOperator} from "../AverageBlurringMapperOperator.ts";
	const {
		operator,
		onSetOperatorRequest,
	}: {
		readonly operator: AverageBlurringMapperOperator;
		readonly onSetOperatorRequest: (
			operator: AverageBlurringMapperOperator,
		) => void;
	} = $props();
	function handleMixFactorInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.withNewMixFactor(event.currentTarget.valueAsNumber),
		);
	}
	function handleRadiusInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.withNewRadius(event.currentTarget.valueAsNumber),
		);
	}
</script>

<section>
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
	<label>
		Radius
		<input
			type="number"
			min="0"
			max="100"
			step="0.1"
			value={operator.radius}
			onchange={handleRadiusInputChange}
		/>
	</label>
</section>
