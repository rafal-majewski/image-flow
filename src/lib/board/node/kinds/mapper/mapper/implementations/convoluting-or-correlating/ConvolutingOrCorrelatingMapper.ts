import type {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {createDiscreteRgbColorEmpty} from "../../../color/types/discrete/kinds/rgb/creating-empty/createDiscreteRgbColorEmpty.ts";
import {createDiscreteRgbColorFromComponents} from "../../../color/types/discrete/kinds/rgb/creating-from-components/createDiscreteRgbColorFromComponents.ts";
import {createDiscreteRgbaColorFromDiscreteRgbColor} from "../../../color/types/discrete/kinds/rgba/creating-from-rgb-color/createDiscreteRgbaColorFromDiscreteRgbColor.ts";
import {readRgbColorFromImage} from "../../../reading-rgb-color-from-image/readRgbColorFromImage.ts";
import {writeRgbaColorToImage} from "../../../writing-rgba-color-to-image/writeRgbaColorToImage.ts";
import {Mapper} from "../../Mapper.ts";
export class ConvolutingOrCorrelatingMapper extends Mapper {
	public constructor(
		anchorPoint: Coordinates,
		kernel: readonly [
			readonly [number, ...(readonly number[])],
			...(readonly [number, ...(readonly number[])])[],
		],
	) {
		super("convoluting-or-correlating", "Convoluting / Correlating");
		this.anchorPoint = anchorPoint;
		this.kernel = kernel;
	}
	public readonly anchorPoint: Coordinates;
	public readonly kernel: readonly [
		readonly [number, ...(readonly number[])],
		...(readonly [number, ...(readonly number[])])[],
	];
	public *map(inputImage: ImageData): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			inputImage.width - (this.kernel[0].length - 1),
			inputImage.height - (this.kernel.length - 1),
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
							(inInputImagePosition.y * inputImage.width
								+ inInputImagePosition.x)
							* 4;
						const color = readRgbColorFromImage(
							inputImage,
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
	): ConvolutingOrCorrelatingMapper {
		return new ConvolutingOrCorrelatingMapper(newAnchorPoint, newKernel);
	}
}
