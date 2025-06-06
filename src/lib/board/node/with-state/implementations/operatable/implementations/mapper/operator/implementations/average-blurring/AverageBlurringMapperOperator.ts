import type {Coordinates} from "../../../../../../../../../coordinates/Coordinates.ts";
import {createDiscreteRgbColorFromComponent} from "../../../../../color/discrete/implementations/rgb/creating-from-component/createDiscreteRgbColorFromComponent.ts";
import {readRgbColorFromImage} from "../../../../../reading-rgb-color-from-image/readRgbColorFromImage.ts";
import {readRgbaColorFromImageAtByteIndex} from "../../../../../reading-rgba-color-from-image-at-byte-index/readRgbaColorFromImageAtByteIndex.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import AverageBlurringMapperOperatorDisplayer from "./displayer/AverageBlurringMapperOperatorDisplayer.svelte";
export class AverageBlurringMapperOperator extends MapperOperator {
	public constructor(mixFactor: number, radius: number) {
		super(
			// @ts-expect-error
			AverageBlurringMapperOperatorDisplayer,
			"average-blurring",
			"Average blurring",
		);
		this.mixFactor = mixFactor;
		this.radius = radius;
	}
	public readonly mixFactor: number;
	public override *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			inputImages[0].width,
			inputImages[0].height,
		);
		for (
			let byteIndex = 0;
			byteIndex < inputImages[0].data.length;
			byteIndex += 4
		) {
			yield outputImage;
			const color = readRgbaColorFromImageAtByteIndex(
				inputImages[0],
				byteIndex,
			);
			let blurredColor = createDiscreteRgbColorFromComponent(0);
			const position: Coordinates = {
				x: (byteIndex / 4) % inputImages[0].width,
				y: Math.floor(byteIndex / 4 / inputImages[0].width),
			};
			let neighborCount = 0;
			for (
				let neighborPositionY = Math.floor(position.y - this.radius);
				neighborPositionY <= Math.ceil(position.y + this.radius);
				neighborPositionY += 1
			) {
				if (
					neighborPositionY >= 0
					&& neighborPositionY < inputImages[0].height
				) {
					for (
						let neighborPositionX = Math.floor(position.x - this.radius);
						neighborPositionX <= Math.ceil(position.x + this.radius);
						neighborPositionX += 1
					) {
						if (
							neighborPositionX >= 0
							&& neighborPositionX < inputImages[0].width
							&& ((neighborPositionX - position.x) ** 2
								+ (neighborPositionY - position.y) ** 2)
								** 0.5
								<= this.radius
						) {
							const neighborByteIndex =
								(neighborPositionY * inputImages[0].width + neighborPositionX)
								* 4;
							const neighborColor = readRgbColorFromImage(
								inputImages[0],
								neighborByteIndex,
							);
							blurredColor = {
								red: blurredColor.red + neighborColor.red,
								green: blurredColor.green + neighborColor.green,
								blue: blurredColor.blue + neighborColor.blue,
							};
							neighborCount += 1;
						}
					}
				}
			}
			blurredColor = {
				red: blurredColor.red / neighborCount,
				green: blurredColor.green / neighborCount,
				blue: blurredColor.blue / neighborCount,
			};
			outputImage.data[byteIndex] =
				blurredColor.red * this.mixFactor + color.red * (1 - this.mixFactor);
			outputImage.data[byteIndex + 1] =
				blurredColor.green * this.mixFactor
				+ color.green * (1 - this.mixFactor);
			outputImage.data[byteIndex + 2] =
				blurredColor.blue * this.mixFactor + color.blue * (1 - this.mixFactor);
			outputImage.data[byteIndex + 3] = color.alpha;
		}
		return outputImage;
	}
	public readonly radius: number;
	public withNewMixFactor(newMixFactor: number): AverageBlurringMapperOperator {
		return new AverageBlurringMapperOperator(newMixFactor, this.radius);
	}
	public withNewRadius(newRadius: number): AverageBlurringMapperOperator {
		return new AverageBlurringMapperOperator(this.mixFactor, newRadius);
	}
}
