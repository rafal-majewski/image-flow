import {Coordinates} from "../../../../../../../coordinates/Coordinates.ts";
import type {ContinuousWithAlphaColor} from "../../../../../../operating/color/ContinuousWithAlphaColor.ts";
import {ContinuousWithAlphaColorBuilder} from "../../../../../../operating/color/ContinuousWithAlphaColorBuilder.ts";
import {readWithAlphaColorFromImageAtPosition} from "../../../../../../operating/color/readWithAlphaColorFromImageAtPosition.ts";
import {iterateNeighbors} from "./iterating-neighbors/iterateNeighbors.ts";
export function useBlur(
	position: Coordinates,
	image: ImageData,
	radius: number,
): ContinuousWithAlphaColor {
	let neighborColorSum = new ContinuousWithAlphaColorBuilder(0, 0, 0, 0);
	let neighborCount = 0;
	for (const neighborPosition of iterateNeighbors(position, image, radius)) {
		const neighborColor = readWithAlphaColorFromImageAtPosition(
			image,
			neighborPosition,
		).convertToContinuous();
		neighborColorSum = neighborColorSum.addColor(neighborColor);
		neighborCount = neighborCount + 1;
	}
	return neighborColorSum.divideByNumber(neighborCount).build();
}
