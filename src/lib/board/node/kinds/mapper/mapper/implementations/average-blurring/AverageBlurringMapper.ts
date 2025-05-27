import type {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {createDiscreteRgbColorFromComponent} from "../../../color/types/discrete/kinds/rgb/creating-from-component/createDiscreteRgbColorFromComponent.ts";
import {readRgbColorFromImage} from "../../../reading-rgb-color-from-image/readRgbColorFromImage.ts";
import {readRgbaColorFromImage} from "../../../reading-rgba-color-from-image/readRgbaColorFromImage.ts";
import {Mapper} from "../../Mapper.ts";
export class AverageBlurringMapper extends Mapper {
	public constructor(mixFactor: number, radius: number) {
		super("average-blurring", "Average blurring");
		this.mixFactor = mixFactor;
		this.radius = radius;
	}
	public *map(inputImage: ImageData): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(inputImage.width, inputImage.height);
		for (
			let byteIndex = 0;
			byteIndex < inputImage.data.length;
			byteIndex += 4
		) {
			yield outputImage;
			const color = readRgbaColorFromImage(inputImage, byteIndex);
			let blurredColor = createDiscreteRgbColorFromComponent(0);
			const position: Coordinates = {
				x: (byteIndex / 4) % inputImage.width,
				y: Math.floor(byteIndex / 4 / inputImage.width),
			};
			let neighborCount = 0;
			for (
				let neighborPositionY = Math.floor(position.y - this.radius);
				neighborPositionY <= Math.ceil(position.y + this.radius);
				neighborPositionY += 1
			) {
				if (neighborPositionY >= 0 && neighborPositionY < inputImage.height) {
					for (
						let neighborPositionX = Math.floor(position.x - this.radius);
						neighborPositionX <= Math.ceil(position.x + this.radius);
						neighborPositionX += 1
					) {
						if (
							neighborPositionX >= 0
							&& neighborPositionX < inputImage.width
							&& ((neighborPositionX - position.x) ** 2
								+ (neighborPositionY - position.y) ** 2)
								** 0.5
								<= this.radius
						) {
							const neighborByteIndex =
								(neighborPositionY * inputImage.width + neighborPositionX) * 4;
							const neighborColor = readRgbColorFromImage(
								inputImage,
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
	public readonly mixFactor: number;
	public readonly radius: number;
	public withNewMixFactor(newMixFactor: number): AverageBlurringMapper {
		return new AverageBlurringMapper(newMixFactor, this.radius);
	}
	public withNewRadius(newRadius: number): AverageBlurringMapper {
		return new AverageBlurringMapper(this.mixFactor, newRadius);
	}
}
