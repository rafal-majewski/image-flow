import type {ColorComponentValue} from "../../../../../../../color-component-value/ColorComponentValue.ts";
import type {RgbaColor} from "../../../../../../../color/RgbaColor.ts";
import type {RgbColor} from "../../../../../../../color/RgbColor.ts";
import type {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {Mapper} from "../../Mapper.ts";
export class AveragingBlurMapper extends Mapper {
	public readonly mixFactor: number;
	public readonly radius: number;
	public constructor(mixFactor: number, radius: number) {
		super("averaging-blur", "Averaging blur");
		this.mixFactor = mixFactor;
		this.radius = radius;
	}
	public withNewMixFactor(newMixFactor: number): AveragingBlurMapper {
		return new AveragingBlurMapper(newMixFactor, this.radius);
	}
	public withNewRadius(newRadius: number): AveragingBlurMapper {
		return new AveragingBlurMapper(this.mixFactor, newRadius);
	}
	public *map(inputImage: ImageData): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(inputImage.width, inputImage.height);
		for (
			let byteIndex = 0;
			byteIndex < inputImage.data.length;
			byteIndex += 4
		) {
			yield outputImage;
			const color: RgbaColor = {
				red: inputImage.data[byteIndex] as ColorComponentValue,
				green: inputImage.data[byteIndex + 1] as ColorComponentValue,
				blue: inputImage.data[byteIndex + 2] as ColorComponentValue,
				alpha: inputImage.data[byteIndex + 3] as ColorComponentValue,
			};
			let blurredColor: RgbColor = {
				red: 0 as ColorComponentValue,
				green: 0 as ColorComponentValue,
				blue: 0 as ColorComponentValue,
			};
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
							const neighborColor: RgbColor = {
								red: inputImage.data[neighborByteIndex] as ColorComponentValue,
								green: inputImage.data[
									neighborByteIndex + 1
								] as ColorComponentValue,
								blue: inputImage.data[
									neighborByteIndex + 2
								] as ColorComponentValue,
							};
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
}
