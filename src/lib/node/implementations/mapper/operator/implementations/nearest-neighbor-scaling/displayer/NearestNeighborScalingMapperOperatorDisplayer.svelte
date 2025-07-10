<script lang="ts">
	import {Dimensions} from "../../../../../../../dimensions/Dimensions.ts";
	import type {NearestNeighborScalingMapperOperator} from "../NearestNeighborScalingMapperOperator.ts";
	const {
		operator,
		onSetOperatorRequest,
	}: {
		readonly operator: NearestNeighborScalingMapperOperator;
		readonly onSetOperatorRequest: (
			operator: NearestNeighborScalingMapperOperator,
		) => void;
	} = $props();
	function handleWidthInputChange(
		event: Event & {currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.replaceOutputImageDimensions(
				new Dimensions(
					event.currentTarget.valueAsNumber,
					operator.outputImageDimensions.height,
				),
			),
		);
	}
	function handleHeightInputChange(
		event: Event & {currentTarget: HTMLInputElement},
	) {
		onSetOperatorRequest(
			operator.replaceOutputImageDimensions(
				new Dimensions(
					operator.outputImageDimensions.width,
					event.currentTarget.valueAsNumber,
				),
			),
		);
	}
</script>

<section>
	<fieldset>
		<legend>Output image dimensions</legend>
		<div>
			<label>
				Width
				<input
					type="number"
					min="1"
					step="1"
					value={operator.outputImageDimensions.width}
					onchange={handleWidthInputChange}
				/>
			</label>
			<label>
				Height
				<input
					type="number"
					min="1"
					step="1"
					value={operator.outputImageDimensions.height}
					onchange={handleHeightInputChange}
				/>
			</label>
		</div>
	</fieldset>
</section>
