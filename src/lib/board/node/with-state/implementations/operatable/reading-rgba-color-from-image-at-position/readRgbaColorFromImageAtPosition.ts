import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
import type {DiscreteRgbaColor} from "../color/discrete/implementations/rgba/DiscreteRgbaColor.ts";
import {computePixelByteIndexFromPixelPosition} from "../computing-pixel-byte-index-from-pixel-position/computePixelByteIndexFromPixelPosition.ts";
import {readRgbaColorFromImageAtByteIndex} from "../reading-rgba-color-from-image-at-byte-index/readRgbaColorFromImageAtByteIndex.ts";
export function readRgbaColorFromImageAtPosition(
	inputImage: ImageData,
	position: Coordinates,
): DiscreteRgbaColor {
	const byteIndex = computePixelByteIndexFromPixelPosition(
		position,
		inputImage.width,
	);
	return readRgbaColorFromImageAtByteIndex(inputImage, byteIndex);
}
