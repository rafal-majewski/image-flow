import {readWithAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithAlphaColorFromImageAtPosition.ts";
import {setEachPixel} from "../../../../../operator/setting-each-pixel/setEachPixel.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import {useBlur} from "./using-blur/useBlur.ts";
import AverageBlurringMapperOperatorDisplayer from "./displayer/AverageBlurringMapperOperatorDisplayer.svelte";
export class AverageBlurringMapperOperator extends MapperOperator {
	public constructor(mixFactor: number, radius: number) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return AverageBlurringMapperOperatorDisplayer(...newParameters);
			},
			"average-blurring",
			"Average blurring",
		);
		this.mixFactor = mixFactor;
		this.radius = radius;
	}
	public readonly mixFactor: number;
	public override *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			inputImages[0].width,
			inputImages[0].height,
		);
		yield* setEachPixel(outputImage, (position) => {
			const blurredColor = useBlur(position, inputImages[0], this.radius);
			return readWithAlphaColorFromImageAtPosition(inputImages[0], position)
				.convertToContinuous()
				.mixWithColor(this.mixFactor, blurredColor)
				.convertToDiscrete();
		});
		return outputImage;
	}
	public readonly radius: number;
	public withNewMixFactor(newMixFactor: number): AverageBlurringMapperOperator {
		return new AverageBlurringMapperOperator(newMixFactor, this.radius);
	}
	public withNewRadius(newRadius: number): AverageBlurringMapperOperator {
		return new AverageBlurringMapperOperator(this.mixFactor, newRadius);
	}
}
