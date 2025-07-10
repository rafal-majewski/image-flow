import {readWithAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithAlphaColorFromImageAtPosition.ts";
import {setEachPixelYielding} from "../../../../../operating/operator/setting-each-pixel-yielding/setEachPixelYielding.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import SaltAndPepperMapperOperatorDisplayer from "./displayer/SaltAndPepperMapperOperatorDisplayer.svelte";
import {RandomNumberGenerator} from "./random-number-generator/RandomNumberGenerator.ts";
import {saltColor} from "./salt-color/saltColor.ts";
import {pepperColor} from "./pepper-color/pepperColor.ts";
export class SaltAndPepperMapperOperator extends MapperOperator {
	public constructor(
		pixelChanceProbability: number,
		saltProportion: number,
		seed: number,
	) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return SaltAndPepperMapperOperatorDisplayer(...newParameters);
			},
			"salt-and-pepper",
			"Salt and Pepper",
		);
		this.pixelChanceProbability = pixelChanceProbability;
		this.saltProportion = saltProportion;
		this.seed = seed;
	}
	public *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			inputImages[0].width,
			inputImages[0].height,
		);
		let randomNumberGenerator = new RandomNumberGenerator(this.seed);
		yield* setEachPixelYielding(outputImage, (position) => {
			const originalColor = readWithAlphaColorFromImageAtPosition(
				inputImages[0],
				position,
			);
			const {
				number: desireToChangePixel,
				newGenerator:
					newRandomNumberGeneratorAfterGeneratingDesireToChangePixel,
			} = randomNumberGenerator.generate();
			randomNumberGenerator =
				newRandomNumberGeneratorAfterGeneratingDesireToChangePixel;
			if (desireToChangePixel < this.pixelChanceProbability) {
				const {
					number: desireToBeSalt,
					newGenerator: newRandomNumberGeneratorAfterGeneratingDesireToBeSalt,
				} =
					newRandomNumberGeneratorAfterGeneratingDesireToChangePixel.generate();
				randomNumberGenerator =
					newRandomNumberGeneratorAfterGeneratingDesireToBeSalt;
				if (desireToBeSalt < this.saltProportion) {
					return saltColor
						.convertToDiscrete()
						.withAlphaComponent(originalColor.alphaComponent);
				} else {
					return pepperColor
						.convertToDiscrete()
						.withAlphaComponent(originalColor.alphaComponent);
				}
			} else {
				return originalColor;
			}
		});
		return outputImage;
	}
	/**
	 * Between 0 and 1.
	 */
	public readonly pixelChanceProbability: number;
	public replacePixelChanceProbability(
		newPixelChanceProbability: number,
	): SaltAndPepperMapperOperator {
		return new SaltAndPepperMapperOperator(
			this.seed,
			newPixelChanceProbability,
			this.saltProportion,
		);
	}
	public replaceSaltProportion(
		newSaltProportion: number,
	): SaltAndPepperMapperOperator {
		return new SaltAndPepperMapperOperator(
			this.seed,
			this.pixelChanceProbability,
			newSaltProportion,
		);
	}
	public replaceSeed(newSeed: number): SaltAndPepperMapperOperator {
		return new SaltAndPepperMapperOperator(
			newSeed,
			this.pixelChanceProbability,
			this.saltProportion,
		);
	}
	/**
	 * Between 0 and 1
	 */
	public readonly saltProportion: number;
	public readonly seed: number;
}
