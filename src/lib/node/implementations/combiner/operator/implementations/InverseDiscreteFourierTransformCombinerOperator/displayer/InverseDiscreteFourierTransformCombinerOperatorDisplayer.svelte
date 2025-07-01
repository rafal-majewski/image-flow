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
		event: Event & {currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.withNewOutputImageDimensions(
				new Dimensions(
					event.currentTarget.valueAsNumber,
					operator.outputImageDimensions.height,
				),
			),
		);
	}
	function handleHeightInputChange(
		event: Event & {currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.withNewOutputImageDimensions(
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
		<div style="display: flex; flex-direction: column; gap: 0.5em;">
			<label>
				a_x
				<input
					type="number"
					step="0.01"
					value={operator.a_x}
					onchange={(event) => {
						onSetOperatorRequest(
							operator.withNewPositionCoefficients(
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
							operator.withNewPositionCoefficients(
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
					step="0.01"
					value={operator.a_y}
					onchange={(event) => {
						onSetOperatorRequest(
							operator.withNewPositionCoefficients(
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
							operator.withNewPositionCoefficients(
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
			These coefficients control the transformation: a_x * x + b_x, a_y * y +
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
						onSetOperatorRequest(operator.withNewMagnitudeExponentSign(1));
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
						onSetOperatorRequest(operator.withNewMagnitudeExponentSign(-1));
					}}
				/>
				-
			</label>
		</div>
	</fieldset>
</section>
