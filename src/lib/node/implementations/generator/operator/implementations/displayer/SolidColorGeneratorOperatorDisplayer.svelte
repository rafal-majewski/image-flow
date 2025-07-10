<script lang="ts">
	import {Dimensions} from "../../../../../../dimensions/Dimensions.ts";
	import {DiscreteWithAlphaColor} from "../../../../../operating/color/DiscreteWithAlphaColor.ts";
	import type {SolidColorGeneratorOperator} from "../SolidColorGeneratorOperator.ts";
	const {
		operator,
		onSetOperatorRequest,
	}: {
		readonly operator: SolidColorGeneratorOperator;
		readonly onSetOperatorRequest: (
			operator: SolidColorGeneratorOperator,
		) => void;
	} = $props();
	function handleWidthInputChange(
		event: Event & {currentTarget: HTMLInputElement},
	) {
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
	function handleColorInputChange(
		component: "red" | "green" | "blue" | "alpha",
		value: number,
	) {
		const {redComponent, greenComponent, blueComponent, alphaComponent} =
			operator.color;
		const newColor = new DiscreteWithAlphaColor(
			component === "red" ? value : redComponent,
			component === "green" ? value : greenComponent,
			component === "blue" ? value : blueComponent,
			component === "alpha" ? value : alphaComponent,
		);
		onSetOperatorRequest(operator.replaceColor(newColor));
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
		<legend>Color (RGBA)</legend>
		<div>
			<label>
				R
				<input
					type="number"
					min="0"
					max="255"
					value={operator.color.redComponent}
					onchange={(e) =>
						handleColorInputChange("red", e.currentTarget.valueAsNumber)}
				/>
			</label>
			<label>
				G
				<input
					type="number"
					min="0"
					max="255"
					value={operator.color.greenComponent}
					onchange={(e) =>
						handleColorInputChange("green", e.currentTarget.valueAsNumber)}
				/>
			</label>
			<label>
				B
				<input
					type="number"
					min="0"
					max="255"
					value={operator.color.blueComponent}
					onchange={(e) =>
						handleColorInputChange("blue", e.currentTarget.valueAsNumber)}
				/>
			</label>
			<label>
				A
				<input
					type="number"
					min="0"
					max="255"
					value={operator.color.alphaComponent}
					onchange={(e) =>
						handleColorInputChange("alpha", e.currentTarget.valueAsNumber)}
				/>
			</label>
		</div>
	</fieldset>
</section>
