import {Coordinates} from "../../../../../../../coordinates/Coordinates.ts";
export function* iterateNeighborPositions(
	image: ImageData,
	position: Coordinates,
	radius: number,
): Generator<Coordinates> {
	for (
		let neighborPositionY = Math.floor(position.y - radius);
		neighborPositionY <= Math.ceil(position.y + radius);
		neighborPositionY = neighborPositionY + 1
	) {
		if (neighborPositionY >= 0 && neighborPositionY < image.height) {
			for (
				let neighborPositionX = Math.floor(position.x - radius);
				neighborPositionX <= Math.ceil(position.x + radius);
				neighborPositionX = neighborPositionX + 1
			) {
				if (neighborPositionX >= 0 && neighborPositionX < image.width) {
					const neighborPosition = new Coordinates(
						neighborPositionX,
						neighborPositionY,
					);
					if (neighborPosition.computeDistanceTo(position) <= radius) {
						yield neighborPosition;
					}
				}
			}
		}
	}
}
