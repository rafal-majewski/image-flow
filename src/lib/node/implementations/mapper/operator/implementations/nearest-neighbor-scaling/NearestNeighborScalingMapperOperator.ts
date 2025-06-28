import {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import type {Dimensions} from "../../../../../../dimensions/Dimensions.ts";
import {readWithAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithAlphaColorFromImageAtPosition.ts";
import {setEachPixel} from "../../../../../operator/setting-each-pixel/setEachPixel.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import NearestNeighborScalingMapperOperatorDisplayer from "./displayer/NearestNeighborScalingMapperOperatorDisplayer.svelte";
export class NearestNeighborScalingMapperOperator extends MapperOperator {
	public constructor(outputImageDimensions: Dimensions) {
		super(
			NearestNeighborScalingMapperOperatorDisplayer,
			"nearest-neighbor-scaling",
			"Nearest neighbor scaling",
		);
		this.outputImageDimensions = outputImageDimensions;
	}
	public *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			this.outputImageDimensions.width,
			this.outputImageDimensions.height,
		);
		yield* setEachPixel(outputImage, (positionInOutputImage) => {
			const positionInInputImage = new Coordinates(
				Math.floor(
					(positionInOutputImage.x * inputImages[0].width)
						/ this.outputImageDimensions.width,
				),
				Math.floor(
					(positionInOutputImage.y * inputImages[0].height)
						/ this.outputImageDimensions.height,
				),
			);
			return readWithAlphaColorFromImageAtPosition(
				inputImages[0],
				positionInInputImage,
			);
		});
		return outputImage;
	}
	public readonly outputImageDimensions: Dimensions;
	public withNewOutputImageDimensions(
		newDimensions: Dimensions,
	): NearestNeighborScalingMapperOperator {
		return new NearestNeighborScalingMapperOperator(newDimensions);
	}
}
