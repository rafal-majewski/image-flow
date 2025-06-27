import {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {ContinuousWithoutAlphaColorBuilder} from "../../../../../operating/color/ContinuousWithoutAlphaColorBuilder.ts";
import type {DiscreteColorComponent} from "../../../../../operating/color/DiscreteColorComponent.ts";
import {readWithoutAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithoutAlphaColorFromImageAtPosition.ts";
import {writeWithoutAlphaColorToImageAtPosition} from "../../../../../operating/color/writeWithoutAlphaColorToImageAtPosition.ts";
import {setEachPixel} from "../../../../../operator/setting-each-pixel/setEachPixel.ts";
import {MappingOperator} from "../../MapperOperator.ts";
import type {GameOfLifeMappingOperatorColorComponentComputer} from "./color-component-computer/GameOfLifeMapperOperatorColorComponentComputer.ts";
import {computeModuloKeepingDivisorSign} from "./computing-modulo-keeping-divisor-sign/computeModuloKeepingDivisorSign.ts";
export class GameOfLifeMappingOperator extends MappingOperator {
	public constructor(
		componentComputer: GameOfLifeMapperOperatorColorComponentComputer,
		mixFactor: number,
	) {
		super(GameOfLifeMapperOperatorDisplayer, "game-of-life", "Game of Life");
		this.componentComputer = componentComputer;
		this.mixFactor = mixFactor;
	}
	public readonly componentComputer: GameOfLifeMappingOperatorColorComponentComputer;
	public readonly mixFactor: number;
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
			setEachPixel(
				currentImage,
				(position: Coordinates): DiscreteColorComponent => {
					let neighborCount = new ContinuousWithoutAlphaColorBuilder(0, 0, 0);
					for (let deltaY = -1; deltaY <= 1; deltaY += 1) {
						for (let deltaX = -1; deltaX <= 1; deltaX += 1) {
							if (deltaX === 0 && deltaY === 0) {
								continue;
							}
							const neighborPosition = new Coordinates(
								computeModuloKeepingDivisorSign(
									position.x + deltaX,
									currentImage.width,
								),
								computeModuloKeepingDivisorSign(
									position.y + deltaY,
									currentImage.height,
								),
							);
							const neighborColor = readWithoutAlphaColorFromImageAtPosition(
								lastImage,
								neighborPosition,
							).convertToContinuous();
							neighborCount = neighborCount.addColor(neighborColor);
						}
					}
					const selfColor = readWithoutAlphaColorFromImageAtPosition(
						lastImage,
						position,
					)
						.convertToContinuous()
						.convertToBuilder();
					const color = selfColor.combineWith((component1, compponent2) => {
						return this.componentComputer.compute(component1, compponent2);
					}, neighborCount);
					const lastColor = readWithoutAlphaColorFromImageAtPosition(
						lastImage,
						position,
					).convertToContinuous();
					writeWithoutAlphaColorToImageAtPosition(
						currentImage,
						position,
						lastColor
							.mixWith(this.mixFactor, color.build())
							.convertToDiscrete(),
					);
				},
			);
			lastImage = currentImage;
		}
	}
	public withNewColorComponentComputer(
		newColorComponentComputer: GameOfLifeMappingOperatorColorComponentComputer,
	): GameOfLifeMappingOperator {
		return new GameOfLifeMappingOperator(
			newColorComponentComputer,
			this.mixFactor,
		);
	}
	public withNewMixFactor(newMixFactor: number): GameOfLifeMappingOperator {
		return new GameOfLifeMappingOperator(this.componentComputer, newMixFactor);
	}
}
