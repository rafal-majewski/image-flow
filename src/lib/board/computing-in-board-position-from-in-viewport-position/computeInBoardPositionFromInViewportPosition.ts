import type {Coordinates} from "../coordinates/Coordinates.ts";
export function computeInBoardPositionFromInViewportPosition(
	inViewportPosition: Coordinates,
	boardBoundingBox: DOMRect,
	cameraPosition: Coordinates,
): Coordinates {
	return {
		x:
			inViewportPosition.x
			- boardBoundingBox.x
			- boardBoundingBox.width / 2
			+ cameraPosition.x,
		y:
			inViewportPosition.y
			- boardBoundingBox.y
			- boardBoundingBox.height / 2
			+ cameraPosition.y,
	};
}
