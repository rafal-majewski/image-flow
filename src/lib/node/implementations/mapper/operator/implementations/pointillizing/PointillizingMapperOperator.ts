import {MapperOperator} from "../../MapperOperator.ts";
import {readWithAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithAlphaColorFromImageAtPosition.ts";
import PointillizingMapperOperatorDisplayer from "./displayer/PointillizingMapperOperatorDisplayer.svelte";
import {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {drawCircle} from "./drawing-circle/drawCircle.ts";
export class PointillizingMapperOperator extends MapperOperator {
	public constructor(
		circleRadiusMultiplier: number,
		initialCircleRadius: number,
	) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return PointillizingMapperOperatorDisplayer(...newParameters);
			},
			"pointillizing",
			"Pointillizing",
		);
		this.circleRadiusMultiplier = circleRadiusMultiplier;
		this.initialCircleRadius = initialCircleRadius;
	}
	public readonly circleRadiusMultiplier: number;
	public readonly initialCircleRadius: number;
	public *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		let currentCircleRadius = this.initialCircleRadius;
		const outputImage = new ImageData(
			inputImages[0].width,
			inputImages[0].height,
		);
		for (;;) {
			yield outputImage;
			const circlePosition = new Coordinates(
				Math.random() * (outputImage.width - 1),
				Math.random() * (outputImage.height - 1),
			);
			const circleColor = readWithAlphaColorFromImageAtPosition(
				inputImages[0],
				circlePosition.round(),
			);
			drawCircle(outputImage, circlePosition, currentCircleRadius, circleColor);
			currentCircleRadius = currentCircleRadius * this.circleRadiusMultiplier;
		}
	}
	public replaceCircleRadiusMultiplier(
		newCircleRadiusMultiplier: number,
	): PointillizingMapperOperator {
		return new PointillizingMapperOperator(
			newCircleRadiusMultiplier,
			this.initialCircleRadius,
		);
	}
	public replaceInitialCircleRadius(
		newInitialCircleRadius: number,
	): PointillizingMapperOperator {
		return new PointillizingMapperOperator(
			this.circleRadiusMultiplier,
			newInitialCircleRadius,
		);
	}
}
