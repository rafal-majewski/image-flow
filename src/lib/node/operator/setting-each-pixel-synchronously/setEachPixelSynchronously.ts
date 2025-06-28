import {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {DiscreteWithAlphaColor} from "../../operating/color/DiscreteWithAlphaColor.ts";
import {writeWithAlphaColorToImageAtPosition} from "../../operating/color/writeWithAlphaColorToImageAtPosition.ts";
export function setEachPixelSynchronously(
	image: ImageData,
	setter: (position: Coordinates) => DiscreteWithAlphaColor,
): void {
	for (let positionY = 0; positionY < image.height; positionY = positionY + 1) {
		for (
			let positionX = 0;
			positionX < image.width;
			positionX = positionX + 1
		) {
			const position = new Coordinates(positionX, positionY);
			writeWithAlphaColorToImageAtPosition(image, position, setter(position));
		}
	}
}
