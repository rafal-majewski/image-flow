import {Coordinates} from "../coordinates/Coordinates.ts";
export function computeInBoardPositionFromInViewportPosition(
	inViewportPosition: Coordinates,
	boardBoundingBox: DOMRect,
	cameraPosition: Coordinates,
): Coordinates {
	return inViewportPosition
		.subtract(
			new Coordinates(
				boardBoundingBox.x + boardBoundingBox.width / 2,
				boardBoundingBox.y + boardBoundingBox.height / 2,
			),
		)
		.add(cameraPosition);
}
