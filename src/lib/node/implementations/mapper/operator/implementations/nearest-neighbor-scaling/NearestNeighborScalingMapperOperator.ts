import {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {Dimensions} from "../../../../../../dimensions/Dimensions.ts";
import {readWithAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithAlphaColorFromImageAtPosition.ts";
import {setEachPixelYielding} from "../../../../../operating/operator/setting-each-pixel-yielding/setEachPixelYielding.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import NearestNeighborScalingMapperOperatorDisplayer from "./displayer/NearestNeighborScalingMapperOperatorDisplayer.svelte";
export class NearestNeighborScalingMapperOperator extends MapperOperator {
	public constructor(outputImageDimensions: Dimensions) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return NearestNeighborScalingMapperOperatorDisplayer(...newParameters);
			},
			"nearest-neighbor-scaling",
			"Nearest Neighbor Scaling",
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
		const stepSize = new Dimensions(inputImages[0].width, inputImages[0].height)
			.convertToCoordinates()
			.divideByCoordinatesComponentWise(
				this.outputImageDimensions.convertToCoordinates(),
			);
		const offsetSize = stepSize
			.divideByScalar(2)
			.addCoordinates(new Coordinates(0.5, 0.5).negate());
		yield* setEachPixelYielding(outputImage, (positionInOutputImage) => {
			const positionInInputImage = offsetSize
				.addCoordinates(
					stepSize.multiplyByCoordinatesComponentWise(positionInOutputImage),
				)
				.round();
			return readWithAlphaColorFromImageAtPosition(
				inputImages[0],
				positionInInputImage,
			);
		});
		return outputImage;
	}
	public readonly outputImageDimensions: Dimensions;
	public replaceOutputImageDimensions(
		newDimensions: Dimensions,
	): NearestNeighborScalingMapperOperator {
		return new NearestNeighborScalingMapperOperator(newDimensions);
	}
}
