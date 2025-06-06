import type {Coordinates} from "../../../../../../../../coordinates/Coordinates.ts";
import {writeRgbaColorToImageAtPosition} from "../../../../../../writing-rgba-color-to-image-at-position/writeRgbaColorToImageAtPosition.ts";
import type {DiscreteRgbaColor} from "../../../../color/discrete/implementations/rgba/DiscreteRgbaColor.ts";
export function* applyToEachPixel(
	image: ImageData,
	applier: (position: Coordinates) => DiscreteRgbaColor,
): Generator<ImageData, void, void> {
	for (let positionY = 0; positionY < image.height; positionY += 1) {
		for (let positionX = 0; positionX < image.width; positionX += 1) {
			yield image;
			const position: Coordinates = {x: positionX, y: positionY};
			writeRgbaColorToImageAtPosition(image, position, applier(position));
		}
	}
}
