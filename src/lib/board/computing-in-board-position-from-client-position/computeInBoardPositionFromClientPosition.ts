import type {Coordinates} from "../coordinates/Coordinates.ts";
export function computeInBoardPositionFromClientPosition(
	clientPosition: Coordinates,
	boardBoundingBox: DOMRect,
	cameraPosition: Coordinates,
): Coordinates {
	return {
		x:
			clientPosition.x
			- boardBoundingBox.x
			- boardBoundingBox.width / 2
			+ cameraPosition.x,
		y:
			clientPosition.y
			- boardBoundingBox.y
			- boardBoundingBox.height / 2
			+ cameraPosition.y,
	};
}
