import {Coordinates} from "../../../../../../../coordinates/Coordinates.ts";
import type {DiscreteWithAlphaColor} from "../../../../../../operating/color/DiscreteWithAlphaColor.ts";
import {writeWithAlphaColorToImageAtPosition} from "../../../../../../operating/color/writeWithAlphaColorToImageAtPosition.ts";
export function drawCircle(
	image: ImageData,
	centerPosition: Coordinates,
	radius: number,
	color: DiscreteWithAlphaColor,
): void {
	for (
		let pixelPositionY = Math.floor(centerPosition.y - radius);
		pixelPositionY <= Math.ceil(centerPosition.y + radius);
		pixelPositionY = pixelPositionY + 1
	) {
		if (pixelPositionY >= 0 && pixelPositionY < image.height) {
			for (
				let pixelPositionX = Math.floor(centerPosition.x - radius);
				pixelPositionX <= Math.ceil(centerPosition.x + radius);
				pixelPositionX = pixelPositionX + 1
			) {
				if (pixelPositionX >= 0 && pixelPositionX < image.width) {
					const pixelPosition = new Coordinates(pixelPositionX, pixelPositionY);
					const pixelPositionDistanceToCenterPosition =
						pixelPosition.computeDistanceTo(centerPosition);
					if (pixelPositionDistanceToCenterPosition <= radius) {
						writeWithAlphaColorToImageAtPosition(image, pixelPosition, color);
					}
				}
			}
		}
	}
}
