<script lang="ts">
	import {Dimensions} from "../../../../../../../dimensions/Dimensions.ts";
	import type {NodeId} from "../../../../../../id/NodeId.ts";
	import type {InverseDiscreteFourierTransformCombinerOperator} from "../InverseDiscreteFourierTransformCombinerOperator.ts";
	const {
		operator,
		onSetOperatorRequest,
		nodeId,
	}: {
		readonly operator: InverseDiscreteFourierTransformCombinerOperator;
		readonly onSetOperatorRequest: (
			operator: InverseDiscreteFourierTransformCombinerOperator,
		) => void;
		readonly nodeId: NodeId;
	} = $props();
	function handleWidthInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
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
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
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
	<fieldset>
		<legend>Position coefficients</legend>
		<div>
			<label>
				a_x (divisor)
				<input
					type="number"
					min="1"
					step="1"
					value={operator.a_x}
					onchange={(event) => {
						onSetOperatorRequest(
							operator.replaceA_x(event.currentTarget.valueAsNumber),
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
							operator.replaceB_x(event.currentTarget.valueAsNumber),
						);
					}}
				/>
			</label>
			<label>
				a_y (divisor)
				<input
					type="number"
					min="1"
					step="1"
					value={operator.a_y}
					onchange={(event) => {
						onSetOperatorRequest(
							operator.replaceA_y(event.currentTarget.valueAsNumber),
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
							operator.replaceB_y(event.currentTarget.valueAsNumber),
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
		<legend>Magnitude scaling</legend>
		<div>
			<label>
				<input
					type="radio"
					name="{nodeId}-magnitude-exponent-sign"
					value="1"
					checked={operator.magnitudeExponentSign === 1}
					onchange={() => {
						onSetOperatorRequest(operator.replaceMagnitudeExponentSign(1));
					}}
				/>
				+
			</label>
			<label>
				<input
					type="radio"
					name="{nodeId}-magnitude-exponent-sign"
					value="-1"
					checked={operator.magnitudeExponentSign === -1}
					onchange={() => {
						onSetOperatorRequest(operator.replaceMagnitudeExponentSign(-1));
					}}
				/>
				-
			</label>
		</div>
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
