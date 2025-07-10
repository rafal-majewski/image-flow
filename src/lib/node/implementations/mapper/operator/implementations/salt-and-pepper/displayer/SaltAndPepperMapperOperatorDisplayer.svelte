<script lang="ts">
	import type {SaltAndPepperMapperOperator} from "../SaltAndPepperMapperOperator.ts";
	const {
		operator,
		onSetOperatorRequest,
	}: {
		readonly operator: SaltAndPepperMapperOperator;
		readonly onSetOperatorRequest: (
			operator: SaltAndPepperMapperOperator,
		) => void;
	} = $props();
	function handleSeedInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	) {
		onSetOperatorRequest(
			operator.replaceSeed(event.currentTarget.valueAsNumber),
		);
	}
	function handlePixelChanceProbabilityInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	) {
		onSetOperatorRequest(
			operator.replacePixelChanceProbability(event.currentTarget.valueAsNumber),
		);
	}
	function handleSaltProportionInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	) {
		onSetOperatorRequest(
			operator.replaceSaltProportion(event.currentTarget.valueAsNumber),
		);
	}
</script>

<section>
	<label>
		Seed
		<input
			type="number"
			value={operator.seed}
			onchange={handleSeedInputChange}
			step="1"
		/>
	</label>
	<label>
		Pixel change probability
		<input
			type="number"
			min="0"
			max="1"
			step="0.01"
			value={operator.pixelChanceProbability}
			onchange={handlePixelChanceProbabilityInputChange}
		/>
	</label>
	<label>
		Proportions:
		<div>
			Salt
			<input
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={operator.saltProportion}
				oninput={handleSaltProportionInputChange}
			/>
			Pepper
		</div>
	</label>
</section>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
	}
</style>
