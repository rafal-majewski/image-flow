<script lang="ts">
	import type {AverageBlurringMapperOperator} from "../AverageBlurringMapperOperator.ts";
	const {
		mapper,
		onSetOperatorRequest,
	}: Readonly<{
		mapper: AverageBlurringMapperOperator;
		onSetOperatorRequest: (mapper: AverageBlurringMapperOperator) => void;
	}> = $props();
	// function handleClassicColorComponentComputerInputChange(event: Event): void {
	// 	onSetOperatorRequest(
	// 		mapper.withNewColorComponentComputer(
	// 			new GameOfLifeMapperOperatorClassicColorComponentComputer(),
	// 		),
	// 	);
	// }
	// function handleFuzzyColorComponentComputerInputChange(event: Event): void {
	// 	onSetOperatorRequest(
	// 		mapper.withNewColorComponentComputer(
	// 			new GameOfLifeMapperOperatorFuzzyColorComponentComputer(),
	// 		),
	// 	);
	// }
	function handleMixFactorInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetOperatorRequest(
			mapper.withNewMixFactor(event.currentTarget.valueAsNumber),
		);
	}
	function handleRadiusInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetOperatorRequest(
			mapper.withNewRadius(event.currentTarget.valueAsNumber),
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
			value={mapper.mixFactor}
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
			value={mapper.radius}
			onchange={handleRadiusInputChange}
		/>
	</label>
</section>
