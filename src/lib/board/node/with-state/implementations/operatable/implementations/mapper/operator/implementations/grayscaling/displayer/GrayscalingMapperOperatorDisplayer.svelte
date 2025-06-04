<script lang="ts">
	import {createContinuousRgbColorFromComponents} from "../../../../../../color/continuous/implementations/rgb/creating-from-components/createContinuousRgbColorFromComponents.ts";
	import type {GrayscalingMapperOperator} from "../GrayscalingMapperOperator.ts";
	const {
		operator,
		onSetOperatorRequest,
	}: Readonly<{
		operator: GrayscalingMapperOperator;
		onSetOperatorRequest: (operator: GrayscalingMapperOperator) => void;
	}> = $props();
	function handleMultiplierRedComponentInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetOperatorRequest(
			operator.withNewMultiplier(
				createContinuousRgbColorFromComponents(
					event.currentTarget.valueAsNumber,
					operator.multiplier.green,
					operator.multiplier.blue,
				),
			),
		);
	}
	function handleMultiplierGreenComponentInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetOperatorRequest(
			operator.withNewMultiplier(
				createContinuousRgbColorFromComponents(
					operator.multiplier.red,
					event.currentTarget.valueAsNumber,
					operator.multiplier.blue,
				),
			),
		);
	}
	function handleMultiplierBlueComponentInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetOperatorRequest(
			operator.withNewMultiplier(
				createContinuousRgbColorFromComponents(
					operator.multiplier.red,
					operator.multiplier.green,
					event.currentTarget.valueAsNumber,
				),
			),
		);
	}
</script>

<section>
	<fieldset>
		<legend>Multiplier components</legend>
		<div>
			<label>
				Red
				<input
					type="number"
					min="0"
					max="1"
					step="0.01"
					value={operator.multiplier.red}
					onchange={handleMultiplierRedComponentInputChange}
				/>
			</label>
			<label>
				Green
				<input
					type="number"
					min="0"
					max="1"
					step="0.01"
					value={operator.multiplier.green}
					onchange={handleMultiplierGreenComponentInputChange}
				/>
			</label>
			<label>
				Blue
				<input
					type="number"
					min="0"
					max="1"
					step="0.01"
					value={operator.multiplier.blue}
					onchange={handleMultiplierBlueComponentInputChange}
				/>
			</label>
		</div>
	</fieldset>
</section>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
	}
</style>
