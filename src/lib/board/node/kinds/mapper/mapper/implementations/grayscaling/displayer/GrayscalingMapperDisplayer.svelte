<script lang="ts">
	import {createContinuousRgbColorFromComponents} from "../../../../color/types/continuous/kinds/rgb/creating-from-components/createContinuousRgbColorFromComponents.ts";
	import type {GrayscalingMapper} from "../GrayscalingMapper.ts";
	const {
		mapper,
		onSetMapperRequest,
	}: Readonly<{
		mapper: GrayscalingMapper;
		onSetMapperRequest: (mapper: GrayscalingMapper) => void;
	}> = $props();
	function handleMultiplierRedComponentInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetMapperRequest(
			mapper.withNewMultiplier(
				createContinuousRgbColorFromComponents(
					event.currentTarget.valueAsNumber,
					mapper.multiplier.green,
					mapper.multiplier.blue,
				),
			),
		);
	}
	function handleMultiplierGreenComponentInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetMapperRequest(
			mapper.withNewMultiplier(
				createContinuousRgbColorFromComponents(
					mapper.multiplier.red,
					event.currentTarget.valueAsNumber,
					mapper.multiplier.blue,
				),
			),
		);
	}
	function handleMultiplierBlueComponentInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetMapperRequest(
			mapper.withNewMultiplier(
				createContinuousRgbColorFromComponents(
					mapper.multiplier.red,
					mapper.multiplier.green,
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
					value={mapper.multiplier.red}
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
					value={mapper.multiplier.green}
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
					value={mapper.multiplier.blue}
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
