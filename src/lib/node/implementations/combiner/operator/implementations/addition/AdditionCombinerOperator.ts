import {readWithAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithAlphaColorFromImageAtPosition.ts";
import {setEachPixelYielding} from "../../../../../operating/operator/setting-each-pixel-yielding/setEachPixelYielding.ts";
import {CombinerOperator} from "../../CombinerOperator.ts";
import AddCombinerOperatorDisplayer from "./displayer/AdditionCombinerOperatorDisplayer.svelte";
export class AdditionCombinerOperator extends CombinerOperator {
	constructor() {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return AddCombinerOperatorDisplayer(...newParameters);
			},
			"addition",
			"Addition",
		);
	}
	public override *operate(
		inputImages: readonly [ImageData, ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			Math.min(inputImages[0].width, inputImages[1].width),
			Math.min(inputImages[0].height, inputImages[1].height),
		);
		yield* setEachPixelYielding(outputImage, (position) => {
			return readWithAlphaColorFromImageAtPosition(
				inputImages[0],
				position,
			).add(readWithAlphaColorFromImageAtPosition(inputImages[1], position));
		});
		return outputImage;
	}
}
