import {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {DiscreteWithAlphaColor} from "../../operating/color/DiscreteWithAlphaColor.ts";
import {writeWithAlphaColorToImageAtPosition} from "../../operating/color/writeWithAlphaColorToImageAtPosition.ts";
export function* setEachPixelYielding(
	image: ImageData,
	setter: (position: Coordinates) => DiscreteWithAlphaColor,
): Generator<ImageData, void, void> {
	for (let positionY = 0; positionY < image.height; positionY = positionY + 1) {
		for (
			let positionX = 0;
			positionX < image.width;
			positionX = positionX + 1
		) {
			yield image;
			const position = new Coordinates(positionX, positionY);
			writeWithAlphaColorToImageAtPosition(image, position, setter(position));
		}
	}
}
