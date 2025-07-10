import {Operator} from "../../../../operating/operator/Operator.ts";
import type {OperatorId} from "../../../../operating/operator/id/OperatorId.ts";
import {DiscreteWithAlphaColor} from "../../../../operating/color/DiscreteWithAlphaColor.ts";
import {setEachPixelYielding} from "../../../../operating/operator/setting-each-pixel-yielding/setEachPixelYielding.ts";
import type {Dimensions} from "../../../../../dimensions/Dimensions.ts";
import SolidColorGeneratorOperatorDisplayer from "./displayer/SolidColorGeneratorOperatorDisplayer.svelte";
export class SolidColorGeneratorOperator extends Operator<0> {
	public readonly color: DiscreteWithAlphaColor;
	public readonly outputImageDimensions: Dimensions;
	public constructor(
		color: DiscreteWithAlphaColor,
		outputImageDimensions: Dimensions,
	) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return SolidColorGeneratorOperatorDisplayer(...newParameters);
			},
			"solid-color-generator" as OperatorId,
			"Solid Color Generator",
		);
		this.color = color;
		this.outputImageDimensions = outputImageDimensions;
	}
	public *operate(
		_inputImages: readonly [],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			this.outputImageDimensions.width,
			this.outputImageDimensions.height,
		);
		yield* setEachPixelYielding(outputImage, () => this.color);
		return outputImage;
	}
	public replaceColor(
		newColor: DiscreteWithAlphaColor,
	): SolidColorGeneratorOperator {
		return new SolidColorGeneratorOperator(
			newColor,
			this.outputImageDimensions,
		);
	}
	public replaceOutputImageDimensions(
		newDimensions: Dimensions,
	): SolidColorGeneratorOperator {
		return new SolidColorGeneratorOperator(this.color, newDimensions);
	}
}
