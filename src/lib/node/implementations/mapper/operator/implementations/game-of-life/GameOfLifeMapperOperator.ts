import {MapperOperator} from "../../MapperOperator.ts";
import type {GameOfLifeMapperOperatorColorComponentComputer} from "./color-component-computer/GameOfLifeMapperOperatorColorComponentComputer.ts";
import {computeNewImage} from "./computing-new-image/computeNewImage.ts";
import GameOfLifeMapperOperatorDisplayer from "./displayer/GameOfLifeMapperOperatorDisplayer.svelte";
export class GameOfLifeMapperOperator extends MapperOperator {
	public constructor(
		componentComputer: GameOfLifeMapperOperatorColorComponentComputer,
		mixFactor: number,
	) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return GameOfLifeMapperOperatorDisplayer(...newParameters);
			},
			"game-of-life",
			"Game of Life",
		);
		this.componentComputer = componentComputer;
		this.mixFactor = mixFactor;
	}
	public readonly componentComputer: GameOfLifeMapperOperatorColorComponentComputer;
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
			lastImage = computeNewImage(
				this.componentComputer,
				lastImage,
				this.mixFactor,
			);
		}
	}
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
