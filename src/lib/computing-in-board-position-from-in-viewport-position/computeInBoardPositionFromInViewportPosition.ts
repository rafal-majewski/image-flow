import {Coordinates} from "../coordinates/Coordinates.ts";
export function computeInBoardPositionFromInViewportPosition(
	inViewportPosition: Coordinates,
	boardBoundingBox: DOMRect,
	cameraPosition: Coordinates,
): Coordinates {
	return inViewportPosition
		.subtractCoordinates(
			new Coordinates(boardBoundingBox.x, boardBoundingBox.y).addCoordinates(
				new Coordinates(
					boardBoundingBox.width,
					boardBoundingBox.height,
				).divideByNumber(2),
			),
		)
		.addCoordinates(cameraPosition);
}
