<script lang="ts">
	import {Dimensions} from "../../../../../../../dimensions/Dimensions.ts";
	import type {NodeId} from "../../../../../../id/NodeId.ts";
	import type {ForwardThenInverseDiscreteFourierTransformMapperOperator} from "../ForwardThenInverseDiscreteFourierTransformMapperOperator.ts";
	const {
		operator,
		onSetOperatorRequest,
		nodeId,
	}: {
		readonly operator: ForwardThenInverseDiscreteFourierTransformMapperOperator;
		readonly onSetOperatorRequest: (
			operator: ForwardThenInverseDiscreteFourierTransformMapperOperator,
		) => void;
		readonly nodeId: NodeId;
	} = $props();
	function handleAfterForwardWidthInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.replaceAfterForwardImageDimensions(
				new Dimensions(
					event.currentTarget.valueAsNumber,
					operator.afterForwardImageDimensions.height,
				),
			),
		);
	}
	function handleAfterForwardHeightInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.replaceAfterForwardImageDimensions(
				new Dimensions(
					operator.afterForwardImageDimensions.width,
					event.currentTarget.valueAsNumber,
				),
			),
		);
	}
	function handleAfterInverseWidthInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.replaceAfterInverseImageDimensions(
				new Dimensions(
					event.currentTarget.valueAsNumber,
					operator.afterInverseImageDimensions.height,
				),
			),
		);
	}
	function handleAfterInverseHeightInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.replaceAfterInverseImageDimensions(
				new Dimensions(
					operator.afterInverseImageDimensions.width,
					event.currentTarget.valueAsNumber,
				),
			),
		);
	}
</script>

<section>
	<fieldset>
		<legend>After Forward DFT image dimensions</legend>
		<div>
			<label>
				Width
				<input
					type="number"
					min="1"
					step="1"
					value={operator.afterForwardImageDimensions.width}
					onchange={handleAfterForwardWidthInputChange}
				/>
			</label>
			<label>
				Height
				<input
					type="number"
					min="1"
					step="1"
					value={operator.afterForwardImageDimensions.height}
					onchange={handleAfterForwardHeightInputChange}
				/>
			</label>
		</div>
	</fieldset>
	<fieldset>
		<legend>After Inverse DFT image dimensions</legend>
		<div>
			<label>
				Width
				<input
					type="number"
					min="1"
					step="1"
					value={operator.afterInverseImageDimensions.width}
					onchange={handleAfterInverseWidthInputChange}
				/>
			</label>
			<label>
				Height
				<input
					type="number"
					min="1"
					step="1"
					value={operator.afterInverseImageDimensions.height}
					onchange={handleAfterInverseHeightInputChange}
				/>
			</label>
		</div>
	</fieldset>
	<fieldset>
		<legend>Position coefficients</legend>
		<div>
			<label>
				a_x
				<input
					type="number"
					min="1"
					step="1"
					value={operator.a_x}
					onchange={(event) => {
						onSetOperatorRequest(
							operator.replacePositionCoefficients(
								event.currentTarget.valueAsNumber,
								operator.b_x,
								operator.a_y,
								operator.b_y,
							),
						);
					}}
				/>
			</label>
			<label>
				b_x
				<input
					type="number"
					step="0.01"
					value={operator.b_x}
					onchange={(event) => {
						onSetOperatorRequest(
							operator.replacePositionCoefficients(
								operator.a_x,
								event.currentTarget.valueAsNumber,
								operator.a_y,
								operator.b_y,
							),
						);
					}}
				/>
			</label>
			<label>
				a_y
				<input
					type="number"
					min="1"
					step="1"
					value={operator.a_y}
					onchange={(event) => {
						onSetOperatorRequest(
							operator.replacePositionCoefficients(
								operator.a_x,
								operator.b_x,
								event.currentTarget.valueAsNumber,
								operator.b_y,
							),
						);
					}}
				/>
			</label>
			<label>
				b_y
				<input
					type="number"
					step="0.01"
					value={operator.b_y}
					onchange={(event) => {
						onSetOperatorRequest(
							operator.replacePositionCoefficients(
								operator.a_x,
								operator.b_x,
								operator.a_y,
								event.currentTarget.valueAsNumber,
							),
						);
					}}
				/>
			</label>
		</div>
		<small>
			These coefficients control the transformation: x / a_x + b_x, y / a_y +
			b_y for input positions.
		</small>
	</fieldset>
	<fieldset>
		<legend>Input value bounds</legend>
		<div style="display: flex; flex-direction: row; gap: 1em;">
			<label>
				Lower bound
				<input
					type="number"
					step="0.01"
					value={operator.lowerBound}
					onchange={(event) => {
						onSetOperatorRequest(
							operator.replaceLowerBound(event.currentTarget.valueAsNumber),
						);
					}}
				/>
			</label>
			<label>
				Upper bound
				<input
					type="number"
					step="0.01"
					value={operator.upperBound}
					onchange={(event) => {
						onSetOperatorRequest(
							operator.replaceUpperBound(event.currentTarget.valueAsNumber),
						);
					}}
				/>
			</label>
		</div>
		<small>
			Input image values will be mapped to the range [lower bound, upper bound].
		</small>
	</fieldset>
</section>

<style lang="scss">
</style>
