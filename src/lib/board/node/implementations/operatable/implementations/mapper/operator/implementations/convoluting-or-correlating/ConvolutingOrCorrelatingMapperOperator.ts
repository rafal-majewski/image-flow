import type {Coordinates} from "../../../../../../../../coordinates/Coordinates.ts";
import {createDiscreteRgbColorEmpty} from "../../../../../color/discrete/implementations/rgb/creating-empty/createDiscreteRgbColorEmpty.ts";
import {createDiscreteRgbColorFromComponents} from "../../../../../color/discrete/implementations/rgb/creating-from-components/createDiscreteRgbColorFromComponents.ts";
import {createDiscreteRgbaColorFromDiscreteRgbColor} from "../../../../../color/discrete/implementations/rgba/creating-from-rgb-color/createDiscreteRgbaColorFromDiscreteRgbColor.ts";
import {readRgbColorFromImage} from "../../../../../reading-rgb-color-from-image/readRgbColorFromImage.ts";
import {writeRgbaColorToImage} from "../../../../../../../writing-rgba-color-to-image/writeRgbaColorToImage.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import ConvolutingOrCorrelatingMapperOperatorDisplayer from "./displayer/ConvolutingOrCorrelatingMapperOperatorDisplayer.svelte";
export class ConvolutingOrCorrelatingMapperOperator extends MapperOperator {
	public constructor(
		anchorPoint: Coordinates,
		kernel: readonly [
			readonly [number, ...(readonly number[])],
			...(readonly [number, ...(readonly number[])])[],
		],
	) {
		super(
			// @ts-expect-error
			ConvolutingOrCorrelatingMapperOperatorDisplayer,
			"convoluting-or-correlating",
			"Convoluting / Correlating",
		);
		this.anchorPoint = anchorPoint;
		this.kernel = kernel;
	}
	public readonly anchorPoint: Coordinates;
	public readonly kernel: readonly [
		readonly [number, ...(readonly number[])],
		...(readonly [number, ...(readonly number[])])[],
	];
	public override *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			inputImages[0].width - (this.kernel[0].length - 1),
			inputImages[0].height - (this.kernel.length - 1),
		);
		for (
			let positionY = this.anchorPoint.y;
			positionY
			< outputImage.height + 1 - this.kernel.length + this.anchorPoint.y;
			positionY += 1
		) {
			for (
				let positionX = this.anchorPoint.x;
				positionX
				< outputImage.width + 1 - this.kernel[0].length + this.anchorPoint.x;
				positionX += 1
			) {
				yield outputImage;
				let sum = createDiscreteRgbColorEmpty();
				for (
					let kernelCellPositionY = 0;
					kernelCellPositionY < this.kernel.length;
					kernelCellPositionY += 1
				) {
					for (
						let kernelCellPositionX = 0;
						kernelCellPositionX < this.kernel[0].length;
						kernelCellPositionX += 1
					) {
						const inInputImagePosition: Coordinates = {
							x: positionX + kernelCellPositionX,
							y: positionY + kernelCellPositionY,
						};
						const inInputImageByteIndex =
							(inInputImagePosition.y * inputImages[0].width
								+ inInputImagePosition.x)
							* 4;
						const color = readRgbColorFromImage(
							inputImages[0],
							inInputImageByteIndex,
						);
						sum = createDiscreteRgbColorFromComponents(
							sum.red
								+ color.red
									* ((this.kernel[kernelCellPositionY] as readonly number[])[
										kernelCellPositionX
									] as number),
							sum.green
								+ color.green
									* ((this.kernel[kernelCellPositionY] as readonly number[])[
										kernelCellPositionX
									] as number),
							sum.blue
								+ color.blue
									* ((this.kernel[kernelCellPositionY] as readonly number[])[
										kernelCellPositionX
									] as number),
						);
					}
				}
				const outputImageByteIndex =
					(positionY * outputImage.width + positionX) * 4;
				writeRgbaColorToImage(
					outputImage,
					outputImageByteIndex,
					createDiscreteRgbaColorFromDiscreteRgbColor(sum, 255),
				);
			}
		}
		return outputImage;
	}
	public withNewAnchorPointAndNewKernel(
		newAnchorPoint: Coordinates,
		newKernel: readonly [
			readonly [number, ...(readonly number[])],
			...(readonly [number, ...(readonly number[])])[],
		],
	): ConvolutingOrCorrelatingMapperOperator {
		return new ConvolutingOrCorrelatingMapperOperator(
			newAnchorPoint,
			newKernel,
		);
	}
}
