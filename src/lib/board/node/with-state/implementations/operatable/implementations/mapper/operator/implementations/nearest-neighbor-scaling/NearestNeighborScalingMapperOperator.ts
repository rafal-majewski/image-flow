import type {Coordinates} from "../../../../../../../../../coordinates/Coordinates.ts";
import type {Dimensions} from "../../../../../../../../../dimensions/Dimensions.ts";
import {readRgbaColorFromImageAtPosition} from "../../../../../reading-rgba-color-from-image-at-position/readRgbaColorFromImageAtPosition.ts";
import {applyToEachPixel} from "../../applying-to-each-pixel/applyToEachPixel.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import NearestNeighborScalingMapperOperatorDisplayer from "./displayer/NearestNeighborScalingMapperOperatorDisplayer.svelte";
export class NearestNeighborScalingMapperOperator extends MapperOperator {
	public constructor(outputImageDimensions: Dimensions) {
		super(
			// @ts-expect-error
			NearestNeighborScalingMapperOperatorDisplayer,
			"nearest-neighbor-scaling",
			"Nearest neighbor scaling",
		);
		this.outputImageDimensions = outputImageDimensions;
	}
	public override *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			this.outputImageDimensions.width,
			this.outputImageDimensions.height,
		);
		yield* applyToEachPixel(outputImage, (positionInOutputImage) => {
			const positionInInputImage: Coordinates = {
				x: Math.floor(
					(positionInOutputImage.x * inputImages[0].width)
						/ this.outputImageDimensions.width,
				),
				y: Math.floor(
					(positionInOutputImage.y * inputImages[0].height)
						/ this.outputImageDimensions.height,
				),
			};
			return readRgbaColorFromImageAtPosition(
				inputImages[0],
				positionInInputImage,
			);
		});
		return outputImage;
	}
	public withNewOutputImageDimensions(
		newDimensions: Dimensions,
	): NearestNeighborScalingMapperOperator {
		return new NearestNeighborScalingMapperOperator(newDimensions);
	}
	public readonly outputImageDimensions: Dimensions;
}
