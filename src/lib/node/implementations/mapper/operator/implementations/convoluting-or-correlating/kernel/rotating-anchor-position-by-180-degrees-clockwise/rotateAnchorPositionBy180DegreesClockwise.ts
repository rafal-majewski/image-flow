import {Coordinates} from "../../../../../../../../coordinates/Coordinates.ts";
import type {Dimensions} from "../../../../../../../../dimensions/Dimensions.ts";
export function rotateAnchorPositionBy180DegreesClockwise(
	anchorPosition: Coordinates,
	multipliersDimensions: Dimensions,
): Coordinates {
	return multipliersDimensions
		.convertToCoordinates()
		.subtract(new Coordinates(1, 1))
		.subtract(anchorPosition);
}
