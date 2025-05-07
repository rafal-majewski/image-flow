<script lang="ts">
	import type {AverageBlurringMapper} from "../AverageBlurringMapper.ts";
	const {
		mapper,
		onSetMapperRequest,
	}: Readonly<{
		mapper: AverageBlurringMapper;
		onSetMapperRequest: (mapper: AverageBlurringMapper) => void;
	}> = $props();
	// function handleClassicColorComponentComputerInputChange(event: Event): void {
	// 	onSetMapperRequest(
	// 		mapper.withNewColorComponentComputer(
	// 			new GameOfLifeMapperClassicColorComponentComputer(),
	// 		),
	// 	);
	// }
	// function handleFuzzyColorComponentComputerInputChange(event: Event): void {
	// 	onSetMapperRequest(
	// 		mapper.withNewColorComponentComputer(
	// 			new GameOfLifeMapperFuzzyColorComponentComputer(),
	// 		),
	// 	);
	// }
	function handleMixFactorInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetMapperRequest(
			mapper.withNewMixFactor(event.currentTarget.valueAsNumber),
		);
	}
	function handleRadiusInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetMapperRequest(mapper.withNewRadius(event.currentTarget.valueAsNumber));
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
