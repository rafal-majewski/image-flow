<script lang="ts">
	import {GameOfLifeMappingOperatorClassicColorComponentComputer} from "../color-component-computer/implementations/classic/GameOfLifeMapperOperatorClassicColorComponentComputer.ts";
	import {GameOfLifeMappingOperatorFuzzyColorComponentComputer} from "../color-component-computer/implementations/fuzzy/GameOfLifeMapperOperatorFuzzyColorComponentComputer.ts";
	import type {GameOfLifeMappingOperator} from "../GameOfLifeMapperOperator.ts";
	const {
		operator,
		onSetOperatorRequest,
	}: {
		readonly operator: GameOfLifeMappingOperator;
		readonly onSetOperatorRequest: (
			operator: GameOfLifeMappingOperator,
		) => void;
	} = $props();
	function handleClassicColorComponentComputerInputChange(event: Event): void {
		onSetOperatorRequest(
			operator.withNewColorComponentComputer(
				new GameOfLifeMappingOperatorClassicColorComponentComputer(),
			),
		);
	}
	function handleFuzzyColorComponentComputerInputChange(event: Event): void {
		onSetOperatorRequest(
			operator.withNewColorComponentComputer(
				new GameOfLifeMappingOperatorFuzzyColorComponentComputer(),
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
						instanceof GameOfLifeMappingOperatorClassicColorComponentComputer}
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
						instanceof GameOfLifeMappingOperatorFuzzyColorComponentComputer}
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
