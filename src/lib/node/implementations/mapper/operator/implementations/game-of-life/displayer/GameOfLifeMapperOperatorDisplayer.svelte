<script lang="ts">
	import {GameOfLifeMapperOperatorClassicColorComponentComputer} from "../color-component-computer/implementations/classic/GameOfLifeMapperOperatorClassicColorComponentComputer.ts";
	import {GameOfLifeMapperOperatorFuzzyColorComponentComputer} from "../color-component-computer/implementations/fuzzy/GameOfLifeMapperOperatorFuzzyColorComponentComputer.ts";
	import type {GameOfLifeMapperOperator} from "../GameOfLifeMapperOperator.ts";
	const {
		operator,
		onSetOperatorRequest,
	}: {
		readonly operator: GameOfLifeMapperOperator;
		readonly onSetOperatorRequest: (operator: GameOfLifeMapperOperator) => void;
	} = $props();
	function handleClassicColorComponentComputerInputChange(event: Event): void {
		onSetOperatorRequest(
			operator.withNewColorComponentComputer(
				new GameOfLifeMapperOperatorClassicColorComponentComputer(),
			),
		);
	}
	function handleFuzzyColorComponentComputerInputChange(event: Event): void {
		onSetOperatorRequest(
			operator.withNewColorComponentComputer(
				new GameOfLifeMapperOperatorFuzzyColorComponentComputer(),
			),
		);
	}
	function handleMixFactorInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.withNewMixFactor(event.currentTarget.valueAsNumber),
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
					checked={operator.componentComputer
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
					checked={operator.componentComputer
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
			value={operator.mixFactor}
			onchange={handleMixFactorInputChange}
		/>
	</label>
</section>
