import type {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {createContinuousRgbColorFromComponent} from "../../../../../color/continuous/implementations/rgb/creating-from-component/createContinuousRgbColorFromComponent.ts";
import type {DiscreteColorComponent} from "../../../../../color/discrete/component/DiscreteColorComponent.ts";
import type {DiscreteRgbColor} from "../../../../../color/discrete/implementations/rgb/DiscreteRgbColor.ts";
import {readRgbColorFromImage} from "../../../../../reading-rgb-color-from-image/readRgbColorFromImage.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import type {GameOfLifeMapperOperatorColorComponentComputer} from "./color-component-computer/GameOfLifeMapperOperatorColorComponentComputer.ts";
import {computeModuloKeepingDivisorSign} from "./computing-modulo-keeping-divisor-sign/computeModuloKeepingDivisorSign.ts";
export class GameOfLifeMapperOperator extends MapperOperator {
	public constructor(
		componentComputer: GameOfLifeMapperOperatorColorComponentComputer,
		mixFactor: number,
	) {
		super("game-of-life", "Game of Life");
		this.componentComputer = componentComputer;
		this.mixFactor = mixFactor;
	}
	public readonly componentComputer: GameOfLifeMapperOperatorColorComponentComputer;
	public override *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		let lastImage = new ImageData(
			inputImages[0].data,
			inputImages[0].width,
			inputImages[0].height,
		);
		for (;;) {
			yield lastImage;
			const currentImage = new ImageData(
				inputImages[0].width,
				inputImages[0].height,
			);
			for (
				let byteIndex = 0;
				byteIndex < currentImage.data.length;
				byteIndex += 4
			) {
				const position: Coordinates = {
					x: (byteIndex / 4) % currentImage.width,
					y: Math.floor(byteIndex / 4 / currentImage.width),
				};
				let neighborCount = createContinuousRgbColorFromComponent(0);
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
							(neighborPosition.x + neighborPosition.y * currentImage.width)
							* 4;
						const neighborColor = readRgbColorFromImage(
							lastImage,
							neighborByteIndex,
						);
						neighborCount = {
							red: neighborCount.red + neighborColor.red / 255,
							green: neighborCount.green + neighborColor.green / 255,
							blue: neighborCount.blue + neighborColor.blue / 255,
						};
					}
				}
				const selfColor = readRgbColorFromImage(lastImage, byteIndex);
				const color: DiscreteRgbColor = {
					red: this.componentComputer.compute(
						selfColor.red / 255,
						neighborCount.red,
					),
					green: this.componentComputer.compute(
						selfColor.green / 255,
						neighborCount.green,
					),
					blue: this.componentComputer.compute(
						selfColor.blue / 255,
						neighborCount.blue,
					),
				};
				currentImage.data[byteIndex] =
					(lastImage.data[byteIndex] as DiscreteColorComponent)
						* (1 - this.mixFactor)
					+ color.red * this.mixFactor;
				currentImage.data[byteIndex + 1] =
					(lastImage.data[byteIndex + 1] as DiscreteColorComponent)
						* (1 - this.mixFactor)
					+ color.green * this.mixFactor;
				currentImage.data[byteIndex + 2] =
					(lastImage.data[byteIndex + 2] as DiscreteColorComponent)
						* (1 - this.mixFactor)
					+ color.blue * this.mixFactor;
				currentImage.data[byteIndex + 3] = lastImage.data[
					byteIndex + 3
				] as DiscreteColorComponent;
			}
			lastImage = currentImage;
		}
	}
	public readonly mixFactor: number;
	public withNewColorComponentComputer(
		newColorComponentComputer: GameOfLifeMapperOperatorColorComponentComputer,
	): GameOfLifeMapperOperator {
		return new GameOfLifeMapperOperator(
			newColorComponentComputer,
			this.mixFactor,
		);
	}
	public withNewMixFactor(newMixFactor: number): GameOfLifeMapperOperator {
		return new GameOfLifeMapperOperator(this.componentComputer, newMixFactor);
	}
}
