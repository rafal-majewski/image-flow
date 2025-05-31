<script lang="ts">
	import {GameOfLifeMapperOperatorClassicColorComponentComputer} from "../color-component-computer/implementations/classic/GameOfLifeMapperOperatorClassicColorComponentComputer.ts";
	import {GameOfLifeMapperOperatorFuzzyColorComponentComputer} from "../color-component-computer/implementations/fuzzy/GameOfLifeMapperOperatorFuzzyColorComponentComputer.ts";
	import type {GameOfLifeMapperOperator} from "../GameOfLifeMapperOperator.ts";
	const {
		mapper,
		onSetOperatorRequest,
	}: Readonly<{
		mapper: GameOfLifeMapperOperator;
		onSetOperatorRequest: (mapper: GameOfLifeMapperOperator) => void;
	}> = $props();
	function handleClassicColorComponentComputerInputChange(event: Event): void {
		onSetOperatorRequest(
			mapper.withNewColorComponentComputer(
				new GameOfLifeMapperOperatorClassicColorComponentComputer(),
			),
		);
	}
	function handleFuzzyColorComponentComputerInputChange(event: Event): void {
		onSetOperatorRequest(
			mapper.withNewColorComponentComputer(
				new GameOfLifeMapperOperatorFuzzyColorComponentComputer(),
			),
		);
	}
	function handleMixFactorInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetOperatorRequest(
			mapper.withNewMixFactor(event.currentTarget.valueAsNumber),
		);
	}
</script>

<section>
	<fieldset>
		<legend>Color component computer</legend>
		<div>
			<label>
				<input
					type="radio"
					name="component-computer"
					value="classic"
					checked={mapper.componentComputer
						instanceof GameOfLifeMapperOperatorClassicColorComponentComputer}
					onchange={handleClassicColorComponentComputerInputChange}
				/>
				Classic
			</label>
			<label>
				<input
					type="radio"
					name="component-computer"
					value="fuzzy"
					checked={mapper.componentComputer
						instanceof GameOfLifeMapperOperatorFuzzyColorComponentComputer}
					onchange={handleFuzzyColorComponentComputerInputChange}
				/>
				Fuzzy
			</label>
		</div>
	</fieldset>
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
</section>
