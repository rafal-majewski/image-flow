import {readWithAlphaColorFromImageAtByteIndex} from "../../../../../operating/color/readWithAlphaColorFromImageAtByteIndex.ts";
import {readWithAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithAlphaColorFromImageAtPosition.ts";
import {setEachPixel} from "../../../../../operator/setting-each-pixel/setEachPixel.ts";
import {CombinerOperator} from "../../CombinerOperator.ts";
import AddCombinerOperatorDisplayer from "./displayer/AddCombinerOperatorDisplayer.svelte";
export class AddCombinerOperator extends CombinerOperator {
	constructor() {
		super(
			// @ts-expect-error
			AddCombinerOperatorDisplayer,
			"add",
			"Add",
		);
	}
	public override *operate(
		inputImages: readonly [ImageData, ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			Math.min(inputImages[0].width, inputImages[1].width),
			Math.min(inputImages[0].height, inputImages[1].height),
		);
		yield* setEachPixel(outputImage, (position) => {
			return readWithAlphaColorFromImageAtPosition(
				inputImages[0],
				position,
			).add(readWithAlphaColorFromImageAtPosition(inputImages[1], position));
		});
		return outputImage;
	}
}
