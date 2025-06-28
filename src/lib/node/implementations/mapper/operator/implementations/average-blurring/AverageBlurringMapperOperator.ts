import {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {readWithAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithAlphaColorFromImageAtPosition.ts";
import {readWithoutAlphaColorFromImageAtByteIndex} from "../../../../../operating/color/readWithoutAlphaColorFromImageAtByteIndex.ts";
import {readWithoutAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithoutAlphaColorFromImageAtPosition.ts";
import {setEachPixel} from "../../../../../operator/setting-each-pixel/setEachPixel.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import {useBlur} from "./using-blur/useBlur.ts";
export class AverageBlurringMapperOperator extends MapperOperator {
	public constructor(mixFactor: number, radius: number) {
		super(
			// @ts-expect-error
			AverageBlurringMapperOperatorDisplayer,
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
