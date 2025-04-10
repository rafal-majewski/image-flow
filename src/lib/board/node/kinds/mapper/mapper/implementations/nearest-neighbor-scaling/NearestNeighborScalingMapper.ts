import type {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import type {Dimensions} from "../../../../../../dimensions/Dimensions.ts";
import {Mapper} from "../../Mapper.ts";
export class NearestNeighborScalingMapper extends Mapper {
	private readonly outputImageDimensions: Dimensions;
	public constructor(outputImageDimensions: Dimensions) {
		super("nearest-neighbor-scaling", "Nearest Neighbor Scaling");
		this.outputImageDimensions = outputImageDimensions;
	}
	public *map(inputImage: ImageData): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			this.outputImageDimensions.width,
			this.outputImageDimensions.height,
		);
		const scale: Coordinates = {
			x: this.outputImageDimensions.width / inputImage.width,
			y: this.outputImageDimensions.height / inputImage.height,
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
				pixelPositionInOriginalImage.y * inputImage.width
				+ pixelPositionInOriginalImage.x;
			const byteIndexInOriginalImage = pixelIndexInOriginalImage * 4;
			outputImage.data[byteIndexInOutputImage] = inputImage.data[
				byteIndexInOriginalImage
			] as number;
			outputImage.data[byteIndexInOutputImage + 1] = inputImage.data[
				byteIndexInOriginalImage + 1
			] as number;
			outputImage.data[byteIndexInOutputImage + 2] = inputImage.data[
				byteIndexInOriginalImage + 2
			] as number;
			outputImage.data[byteIndexInOutputImage + 3] = inputImage.data[
				byteIndexInOriginalImage + 3
			] as number;
		}
		return outputImage;
	}
}
