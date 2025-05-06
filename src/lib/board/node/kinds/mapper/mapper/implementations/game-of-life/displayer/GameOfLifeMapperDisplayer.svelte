<script lang="ts">
	import {GameOfLifeMapperClassicComponentComputer} from "../component-computer/implementations/classic/GameOfLifeMapperClassicComponentComputer.ts";
	import {GameOfLifeMapperFuzzyComponentComputer} from "../component-computer/implementations/fuzzy/GameOfLifeMapperFuzzyComponentComputer.ts";
	import type {GameOfLifeMapper} from "../GameOfLifeMapper.ts";
	const {
		mapper,
		onSetMapperRequest,
	}: Readonly<{
		mapper: GameOfLifeMapper;
		onSetMapperRequest: (mapper: GameOfLifeMapper) => void;
	}> = $props();
	function handleClassicComponentComputerInputChange(event: Event): void {
		onSetMapperRequest(
			mapper.withNewComponentComputer(
				new GameOfLifeMapperClassicComponentComputer(),
			),
		);
	}
	function handleFuzzyComponentComputerInputChange(event: Event): void {
		onSetMapperRequest(
			mapper.withNewComponentComputer(
				new GameOfLifeMapperFuzzyComponentComputer(),
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

<div>
	<fieldset>
		<legend>Component computer</legend>
		<div>
			<label>
				<input
					type="radio"
					name="component-computer"
					value="classic"
					checked={mapper.componentComputer
						instanceof GameOfLifeMapperClassicComponentComputer}
					onchange={handleClassicComponentComputerInputChange}
				/>
				Classic
			</label>
			<label>
				<input
					type="radio"
					name="component-computer"
					value="fuzzy"
					checked={mapper.componentComputer
						instanceof GameOfLifeMapperFuzzyComponentComputer}
					onchange={handleFuzzyComponentComputerInputChange}
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
</div>
