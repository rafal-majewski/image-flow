import type {Coordinates} from "../../../../../../../../../coordinates/Coordinates.ts";
import type {Dimensions} from "../../../../../../../../../dimensions/Dimensions.ts";
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
		const scale: Coordinates = {
			x: this.outputImageDimensions.width / inputImages[0].width,
			y: this.outputImageDimensions.height / inputImages[0].height,
		};
		for (
			let byteIndexInOutputImage = 0;
			byteIndexInOutputImage < outputImage.data.length;
			byteIndexInOutputImage += 4
		) {
			yield outputImage;
			const pixelIndexInOutputImage = byteIndexInOutputImage / 4;
			const pixelPositionInOutputImage: Coordinates = {
				x: pixelIndexInOutputImage % outputImage.width,
				y: Math.floor(pixelIndexInOutputImage / outputImage.width),
			};
			const pixelPositionInOriginalImage: Coordinates = {
				x: Math.round(
					(pixelPositionInOutputImage.x - (scale.x - 1) / 2) / scale.x,
				),
				y: Math.round(
					(pixelPositionInOutputImage.y - (scale.y - 1) / 2) / scale.y,
				),
			};
			const pixelIndexInOriginalImage =
				pixelPositionInOriginalImage.y * inputImages[0].width
				+ pixelPositionInOriginalImage.x;
			const byteIndexInOriginalImage = pixelIndexInOriginalImage * 4;
			outputImage.data[byteIndexInOutputImage] = inputImages[0].data[
				byteIndexInOriginalImage
			] as number;
			outputImage.data[byteIndexInOutputImage + 1] = inputImages[0].data[
				byteIndexInOriginalImage + 1
			] as number;
			outputImage.data[byteIndexInOutputImage + 2] = inputImages[0].data[
				byteIndexInOriginalImage + 2
			] as number;
			outputImage.data[byteIndexInOutputImage + 3] = inputImages[0].data[
				byteIndexInOriginalImage + 3
			] as number;
		}
		return outputImage;
	}
	public withNewOutputImageDimensions(
		newDimensions: Dimensions,
	): NearestNeighborScalingMapperOperator {
		return new NearestNeighborScalingMapperOperator(newDimensions);
	}
	public readonly outputImageDimensions: Dimensions;
}
