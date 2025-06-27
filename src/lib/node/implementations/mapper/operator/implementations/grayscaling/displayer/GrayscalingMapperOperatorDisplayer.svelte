<script lang="ts">
	import {ContinuousWithoutAlphaColor} from "../../../../../../operating/color/ContinuousWithoutAlphaColor.ts";
	import type {GrayscalingMappingOperator} from "../GrayscalingMapperOperator.ts";
	const {
		operator,
		onSetOperatorRequest,
	}: {
		readonly operator: GrayscalingMappingOperator;
		readonly onSetOperatorRequest: (
			operator: GrayscalingMappingOperator,
		) => void;
	} = $props();
	function handleMultiplierRedComponentInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.withNewMultiplier(
				new ContinuousWithoutAlphaColor(
					event.currentTarget.valueAsNumber,
					operator.multiplier.greenComponent,
					operator.multiplier.blueComponent,
				),
			),
		);
	}
	function handleMultiplierGreenComponentInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.withNewMultiplier(
				new ContinuousWithoutAlphaColor(
					operator.multiplier.redComponent,
					event.currentTarget.valueAsNumber,
					operator.multiplier.blueComponent,
				),
			),
		);
	}
	function handleMultiplierBlueComponentInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.withNewMultiplier(
				new ContinuousWithoutAlphaColor(
					operator.multiplier.redComponent,
					operator.multiplier.greenComponent,
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
					value={operator.multiplier.redComponent}
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
					value={operator.multiplier.greenComponent}
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
					value={operator.multiplier.blueComponent}
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
