<script lang="ts">
	import {GameOfLifeMapperClassicColorComponentComputer} from "../color-component-computer/implementations/classic/GameOfLifeMapperClassicColorComponentComputer.ts";
	import {GameOfLifeMapperFuzzyColorComponentComputer} from "../color-component-computer/implementations/fuzzy/GameOfLifeMapperFuzzyColorComponentComputer.ts";
	import type {GameOfLifeMapper} from "../GameOfLifeMapper.ts";
	const {
		mapper,
		onSetMapperRequest,
	}: Readonly<{
		mapper: GameOfLifeMapper;
		onSetMapperRequest: (mapper: GameOfLifeMapper) => void;
	}> = $props();
	function handleClassicColorComponentComputerInputChange(event: Event): void {
		onSetMapperRequest(
			mapper.withNewColorComponentComputer(
				new GameOfLifeMapperClassicColorComponentComputer(),
			),
		);
	}
	function handleFuzzyColorComponentComputerInputChange(event: Event): void {
		onSetMapperRequest(
			mapper.withNewColorComponentComputer(
				new GameOfLifeMapperFuzzyColorComponentComputer(),
			),
		);
	}
	function handleMixFactorInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetMapperRequest(
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
						instanceof GameOfLifeMapperClassicColorComponentComputer}
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
						instanceof GameOfLifeMapperFuzzyColorComponentComputer}
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
