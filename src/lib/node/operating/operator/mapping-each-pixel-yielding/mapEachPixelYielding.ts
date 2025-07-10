import {Coordinates} from "../../../../coordinates/Coordinates.ts";
import type {DiscreteWithAlphaColor} from "../../color/DiscreteWithAlphaColor.ts";
import {readWithAlphaColorFromImageAtPosition} from "../../color/readWithAlphaColorFromImageAtPosition.ts";
import {setEachPixelYielding} from "../setting-each-pixel-yielding/setEachPixelYielding.ts";
export function* mapEachPixelYielding(
	image: ImageData,
	mapper: (
		originalColor: DiscreteWithAlphaColor,
		position: Coordinates,
	) => DiscreteWithAlphaColor,
): Generator<ImageData, void, void> {
	yield* setEachPixelYielding(image, (position) => {
		const originalColor = readWithAlphaColorFromImageAtPosition(
			image,
			position,
		);
		const newColor = mapper(originalColor, position);
		return newColor;
	});
}
