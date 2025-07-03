import {Coordinates} from "../../../../../../../../coordinates/Coordinates.ts";
import type {Dimensions} from "../../../../../../../../dimensions/Dimensions.ts";
export function rotateAnchorPositionBy180DegreesClockwise(
	anchorPosition: Coordinates,
	multipliersDimensions: Dimensions,
): Coordinates {
	return multipliersDimensions
		.convertToCoordinates()
		.subtractCoordinates(new Coordinates(1, 1))
		.subtractCoordinates(anchorPosition);
}
