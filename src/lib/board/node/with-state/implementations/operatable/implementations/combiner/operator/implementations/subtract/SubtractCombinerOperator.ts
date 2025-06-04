import {CombinerOperator} from "../../CombinerOperator.ts";
import SubtractCombinerOperatorDisplayer from "./displayer/SubtractCombinerOperatorDisplayer.svelte";
export class SubtractCombinerOperator extends CombinerOperator {
	constructor() {
		super(
			// @ts-expect-error
			SubtractCombinerOperatorDisplayer,
			"subtract",
			"Subtract",
		);
	}
	public override *operate(
		inputImages: readonly [ImageData, ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			Math.max(inputImages[0].width, inputImages[1].width),
			Math.max(inputImages[0].height, inputImages[1].height),
		);
		for (let positionY = 0; positionY < outputImage.height; positionY += 1) {
			for (let positionX = 0; positionX < outputImage.width; positionX += 1) {
				const inBounds0 =
					positionX < inputImages[0].width && positionY < inputImages[0].height;
				const inBounds1 =
					positionX < inputImages[1].width && positionY < inputImages[1].height;
				const index0 = 4 * (positionY * inputImages[0].width + positionX);
				const index1 = 4 * (positionY * inputImages[1].width + positionX);
				const outputIndex = 4 * (positionY * outputImage.width + positionX);
				const color1Red =
					inBounds0 ? (inputImages[0].data[index0] as number) : 0;
				const color1Green =
					inBounds0 ? (inputImages[0].data[index0 + 1] as number) : 0;
				const color1Blue =
					inBounds0 ? (inputImages[0].data[index0 + 2] as number) : 0;
				const color1Alpha =
					inBounds0 ? (inputImages[0].data[index0 + 3] as number) : 0;
				const color2Red =
					inBounds1 ? (inputImages[1].data[index1] as number) : 0;
				const color2Green =
					inBounds1 ? (inputImages[1].data[index1 + 1] as number) : 0;
				const color2Blue =
					inBounds1 ? (inputImages[1].data[index1 + 2] as number) : 0;
				const color2Alpha =
					inBounds1 ? (inputImages[1].data[index1 + 3] as number) : 0;
				outputImage.data[outputIndex] = Math.max(0, color1Red - color2Red);
				outputImage.data[outputIndex + 1] = Math.max(
					0,
					color1Green - color2Green,
				);
				outputImage.data[outputIndex + 2] = Math.max(
					0,
					color1Blue - color2Blue,
				);
				outputImage.data[outputIndex + 3] = Math.max(
					0,
					color1Alpha - color2Alpha,
				);
			}
		}
		return outputImage;
	}
}
