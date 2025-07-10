import {DiscreteWithAlphaColor} from "../../../../../operating/color/DiscreteWithAlphaColor.ts";
import {mapEachPixelYielding} from "../../../../../operating/operator/mapping-each-pixel-yielding/mapEachPixelYielding.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import ColorReductionMapperOperatorDisplayer from "./displayer/ColorReductionMapperOperatorDisplayer.svelte";
import {quantize} from "./quantizing/quantize.ts";
export class ColorReductionMapperOperator extends MapperOperator {
	public constructor(
		redComponentLevelCount: number,
		greenComponentLevelCount: number,
		blueComponentLevelCount: number,
		alphaComponentLevelCount: number,
	) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return ColorReductionMapperOperatorDisplayer(...newParameters);
			},
			"color-reduction",
			"Color Reduction",
		);
		this.redComponentLevelCount = redComponentLevelCount;
		this.greenComponentLevelCount = greenComponentLevelCount;
		this.blueComponentLevelCount = blueComponentLevelCount;
		this.alphaComponentLevelCount = alphaComponentLevelCount;
	}
	public readonly alphaComponentLevelCount: number;
	public readonly blueComponentLevelCount: number;
	public readonly greenComponentLevelCount: number;
	public *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			inputImages[0].width,
			inputImages[0].height,
		);
		yield* mapEachPixelYielding(outputImage, (originalColor, position) => {
			return new DiscreteWithAlphaColor(
				quantize(originalColor.redComponent, this.redComponentLevelCount),
				quantize(originalColor.greenComponent, this.greenComponentLevelCount),
				quantize(originalColor.blueComponent, this.blueComponentLevelCount),
				quantize(originalColor.alphaComponent, this.alphaComponentLevelCount),
			);
		});
		return outputImage;
	}
	public readonly redComponentLevelCount: number;
	public replaceAlphaComponentLevelCount(
		newAlphaComponentLevelCount: number,
	): ColorReductionMapperOperator {
		return new ColorReductionMapperOperator(
			this.redComponentLevelCount,
			this.greenComponentLevelCount,
			this.blueComponentLevelCount,
			newAlphaComponentLevelCount,
		);
	}
	public replaceBlueComponentLevelCount(
		newBlueComponentLevelCount: number,
	): ColorReductionMapperOperator {
		return new ColorReductionMapperOperator(
			this.redComponentLevelCount,
			this.greenComponentLevelCount,
			newBlueComponentLevelCount,
			this.alphaComponentLevelCount,
		);
	}
	public replaceGreenComponentLevelCount(
		newGreenComponentLevelCount: number,
	): ColorReductionMapperOperator {
		return new ColorReductionMapperOperator(
			this.redComponentLevelCount,
			newGreenComponentLevelCount,
			this.blueComponentLevelCount,
			this.alphaComponentLevelCount,
		);
	}
	public replaceRedComponentLevelCount(
		newRedComponentLevelCount: number,
	): ColorReductionMapperOperator {
		return new ColorReductionMapperOperator(
			newRedComponentLevelCount,
			this.greenComponentLevelCount,
			this.blueComponentLevelCount,
			this.alphaComponentLevelCount,
		);
	}
}
