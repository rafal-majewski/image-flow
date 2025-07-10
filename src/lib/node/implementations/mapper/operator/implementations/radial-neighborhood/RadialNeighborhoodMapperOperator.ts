import {readWithAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithAlphaColorFromImageAtPosition.ts";
import {setEachPixelYielding} from "../../../../../operating/operator/setting-each-pixel-yielding/setEachPixelYielding.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import {DiscreteWithAlphaColor} from "../../../../../operating/color/DiscreteWithAlphaColor.ts";
import RadialNeighborhoodMapperOperatorDisplayer from "./displayer/RadialNeighborhoodMapperOperatorDisplayer.svelte";
import {iterateNeighborPositions} from "./iterating-neighbors-positions/iterateNeighborPositions.ts";
export type RadialNeighborhoodMode =
	| "none"
	| "blur"
	| "min"
	| "max"
	| "minmax-avg";
export class RadialNeighborhoodMapperOperator extends MapperOperator {
	public constructor(
		radius: number,
		mode: RadialNeighborhoodMode = "none",
		mixFactor: number = 1,
	) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return RadialNeighborhoodMapperOperatorDisplayer(...newParameters);
			},
			"radial-neighborhood",
			"Radial Neighborhood",
		);
		this.radius = radius;
		this.mode = mode;
		this.mixFactor = mixFactor;
	}
	public readonly mixFactor: number;
	public readonly mode: RadialNeighborhoodMode;
	public *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			inputImages[0].width,
			inputImages[0].height,
		);
		yield* setEachPixelYielding(outputImage, (position) => {
			if (this.mode === "none") {
				return readWithAlphaColorFromImageAtPosition(inputImages[0], position);
			}
			if (this.mode === "blur") {
				// Average all neighbors, mix with original pixel
				let sumR = 0,
					sumG = 0,
					sumB = 0,
					sumA = 0,
					count = 0;
				for (const neighborPosition of iterateNeighborPositions(
					inputImages[0],
					position,
					this.radius,
				)) {
					const c = readWithAlphaColorFromImageAtPosition(
						inputImages[0],
						neighborPosition,
					);
					sumR += c.redComponent;
					sumG += c.greenComponent;
					sumB += c.blueComponent;
					sumA += c.alphaComponent;
					count++;
				}
				const avg = new DiscreteWithAlphaColor(
					Math.round(sumR / count),
					Math.round(sumG / count),
					Math.round(sumB / count),
					Math.round(sumA / count),
				);
				const orig = readWithAlphaColorFromImageAtPosition(
					inputImages[0],
					position,
				).convertToContinuous();
				const avgCont = avg.convertToContinuous();
				return orig.mixWithColor(this.mixFactor, avgCont).convertToDiscrete();
			}
			// min, max, minmax-avg
			let minR = 255,
				minG = 255,
				minB = 255,
				minA = 255;
			let maxR = 0,
				maxG = 0,
				maxB = 0,
				maxA = 0;
			for (const neighborPosition of iterateNeighborPositions(
				inputImages[0],
				position,
				this.radius,
			)) {
				const c = readWithAlphaColorFromImageAtPosition(
					inputImages[0],
					neighborPosition,
				);
				minR = Math.min(minR, c.redComponent);
				minG = Math.min(minG, c.greenComponent);
				minB = Math.min(minB, c.blueComponent);
				minA = Math.min(minA, c.alphaComponent);
				maxR = Math.max(maxR, c.redComponent);
				maxG = Math.max(maxG, c.greenComponent);
				maxB = Math.max(maxB, c.blueComponent);
				maxA = Math.max(maxA, c.alphaComponent);
			}
			if (this.mode === "min") {
				return new DiscreteWithAlphaColor(minR, minG, minB, minA);
			} else if (this.mode === "max") {
				return new DiscreteWithAlphaColor(maxR, maxG, maxB, maxA);
			} else if (this.mode === "minmax-avg") {
				return new DiscreteWithAlphaColor(
					Math.round((minR + maxR) / 2),
					Math.round((minG + maxG) / 2),
					Math.round((minB + maxB) / 2),
					Math.round((minA + maxA) / 2),
				);
			}
			// fallback: original
			return readWithAlphaColorFromImageAtPosition(inputImages[0], position);
		});
		return outputImage;
	}
	public readonly radius: number;
	public replaceMixFactor(
		newMixFactor: number,
	): RadialNeighborhoodMapperOperator {
		return new RadialNeighborhoodMapperOperator(
			this.radius,
			this.mode,
			newMixFactor,
		);
	}
	public replaceMode(
		newMode: RadialNeighborhoodMode,
	): RadialNeighborhoodMapperOperator {
		return new RadialNeighborhoodMapperOperator(
			this.radius,
			newMode,
			this.mixFactor,
		);
	}
	public replaceRadius(newRadius: number): RadialNeighborhoodMapperOperator {
		return new RadialNeighborhoodMapperOperator(
			newRadius,
			this.mode,
			this.mixFactor,
		);
	}
}
