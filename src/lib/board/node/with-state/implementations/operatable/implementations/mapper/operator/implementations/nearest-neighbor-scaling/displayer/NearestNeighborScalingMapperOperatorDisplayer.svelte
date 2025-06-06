<script lang="ts">
	import type {NearestNeighborScalingMapperOperator} from "../NearestNeighborScalingMapperOperator.ts";
	const {
		operator,
		onSetOperatorRequest,
	}: Readonly<{
		operator: NearestNeighborScalingMapperOperator;
		onSetOperatorRequest: (
			operator: NearestNeighborScalingMapperOperator,
		) => void;
	}> = $props();
	function handleWidthInputChange(
		event: Event & {currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.withNewOutputImageDimensions({
				width: event.currentTarget.valueAsNumber,
				height: operator.outputImageDimensions.height,
			}),
		);
	}
	function handleHeightInputChange(
		event: Event & {currentTarget: HTMLInputElement},
	) {
		onSetOperatorRequest(
			operator.withNewOutputImageDimensions({
				width: operator.outputImageDimensions.width,
				height: event.currentTarget.valueAsNumber,
			}),
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
