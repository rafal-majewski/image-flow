import type {ColorComponentValue} from "../../../../../../../color-component-value/ColorComponentValue.ts";
import type {RgbColor} from "../../../../../../../color/RgbColor.ts";
import type {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {Mapper} from "../../Mapper.ts";
export class ClassicGameOfLifeMapper extends Mapper {
	private readonly mixFactor: number;
	public constructor(mixFactor: number) {
		super("classic-game-of-life", "Game of Life (classic)");
		this.mixFactor = mixFactor;
	}
	public *map(inputImage: ImageData): Generator<ImageData, ImageData, void> {
		let lastImage = new ImageData(
			inputImage.data,
			inputImage.width,
			inputImage.height,
		);
		for (;;) {
			yield lastImage;
			const currentImage = new ImageData(inputImage.width, inputImage.height);
			for (
				let byteIndex = 0;
				byteIndex < currentImage.data.length;
				byteIndex += 4
			) {
				const position: Coordinates = {
					x: (byteIndex / 4) % currentImage.width,
					y: Math.floor(byteIndex / 4 / currentImage.width),
				};
				function computeModuloKeepingDivisorSign(
					dividend: number,
					divisor: number,
				): number {
					return ((dividend % divisor) + divisor) % divisor;
				}
				let neighborCount: RgbColor = {red: 0, green: 0, blue: 0};
				for (let deltaY = -1; deltaY <= 1; deltaY += 1) {
					for (let deltaX = -1; deltaX <= 1; deltaX += 1) {
						if (deltaX === 0 && deltaY === 0) {
							continue;
						}
						const neighborPosition: Coordinates = {
							x: computeModuloKeepingDivisorSign(
								position.x + deltaX,
								currentImage.width,
							),
							y: computeModuloKeepingDivisorSign(
								position.y + deltaY,
								currentImage.height,
							),
						};
						const neighborByteIndex =
							neighborPosition.x + neighborPosition.y * currentImage.width;
						const neighborColor: RgbColor = {
							red: lastImage.data[neighborByteIndex * 4] as ColorComponentValue,
							green: lastImage.data[
								neighborByteIndex * 4 + 1
							] as ColorComponentValue,
							blue: lastImage.data[
								neighborByteIndex * 4 + 2
							] as ColorComponentValue,
						};
						neighborCount = {
							red: neighborCount.red + neighborColor.red / 255,
							green: neighborCount.green + neighborColor.green / 255,
							blue: neighborCount.blue + neighborColor.blue / 255,
						};
					}
				}
				const color: RgbColor = {
					red: neighborCount.red >= 2 && neighborCount.red <= 3 ? 255 : 0,
					green: neighborCount.green >= 2 && neighborCount.green <= 3 ? 255 : 0,
					blue: neighborCount.blue >= 2 && neighborCount.blue <= 3 ? 255 : 0,
				};
				currentImage.data[byteIndex] =
					(lastImage.data[byteIndex] as ColorComponentValue)
						* (1 - this.mixFactor)
					+ color.red * this.mixFactor;
				currentImage.data[byteIndex + 1] =
					(lastImage.data[byteIndex + 1] as ColorComponentValue)
						* (1 - this.mixFactor)
					+ color.green * this.mixFactor;
				currentImage.data[byteIndex + 2] =
					(lastImage.data[byteIndex + 2] as ColorComponentValue)
						* (1 - this.mixFactor)
					+ color.blue * this.mixFactor;
				currentImage.data[byteIndex + 3] = lastImage.data[
					byteIndex + 3
				] as ColorComponentValue;
			}
			lastImage = currentImage;
		}
	}
}
