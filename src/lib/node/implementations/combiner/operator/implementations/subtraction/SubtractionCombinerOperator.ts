import {readWithAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithAlphaColorFromImageAtPosition.ts";
import {setEachPixelYielding} from "../../../../../operating/operator/setting-each-pixel-yielding/setEachPixelYielding.ts";
import {CombinerOperator} from "../../CombinerOperator.ts";
import SubtractCombinerOperatorDisplayer from "./displayer/SubtractionCombinerOperatorDisplayer.svelte";
export class SubtractionCombinerOperator extends CombinerOperator {
	constructor(
		alphaChannelPolicy: "subtract" | "keepFrom1" | "keepFrom2" | "ignore",
	) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return SubtractCombinerOperatorDisplayer(...newParameters);
			},
			"subtraction",
			"Subtraction",
		);
		this.alphaChannelPolicy = alphaChannelPolicy;
	}
	public readonly alphaChannelPolicy:
		| "subtract"
		| "keepFrom1"
		| "keepFrom2"
		| "ignore";
	public override *operate(
		inputImages: readonly [ImageData, ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			Math.min(inputImages[0].width, inputImages[1].width),
			Math.min(inputImages[0].height, inputImages[1].height),
		);
		yield* setEachPixelYielding(outputImage, (position) => {
			const color1 = readWithAlphaColorFromImageAtPosition(
				inputImages[0],
				position,
			);
			const color2 = readWithAlphaColorFromImageAtPosition(
				inputImages[1],
				position,
			);
			switch (this.alphaChannelPolicy) {
				case "subtract": {
					return color1.subtract(color2);
				}
				case "keepFrom1": {
					return color1
						.deleteAlphaComponent()
						.subtract(color2.deleteAlphaComponent())
						.withAlphaComponent(color1.alphaComponent);
				}
				case "keepFrom2": {
					return color1
						.deleteAlphaComponent()
						.subtract(color2.deleteAlphaComponent())
						.withAlphaComponent(color2.alphaComponent);
				}
				case "ignore": {
					return color1
						.deleteAlphaComponent()
						.subtract(color2.deleteAlphaComponent())
						.withAlphaComponent(255);
				}
			}
		});
		return outputImage;
	}
}
