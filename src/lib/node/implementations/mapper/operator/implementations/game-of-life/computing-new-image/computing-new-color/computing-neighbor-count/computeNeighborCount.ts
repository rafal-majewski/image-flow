import {Coordinates} from "../../../../../../../../../coordinates/Coordinates.ts";
import {ContinuousWithoutAlphaColorBuilder} from "../../../../../../../../operating/color/ContinuousWithoutAlphaColorBuilder.ts";
import {readWithoutAlphaColorFromImageAtPosition} from "../../../../../../../../operating/color/readWithoutAlphaColorFromImageAtPosition.ts";
import {computeModuloKeepingDivisorSign} from "../../../computing-modulo-keeping-divisor-sign/computeModuloKeepingDivisorSign.ts";
export function computeNeighborCount(
	image: ImageData,
	position: Coordinates,
): ContinuousWithoutAlphaColorBuilder {
	let neighborCount = new ContinuousWithoutAlphaColorBuilder(0, 0, 0);
	for (let deltaY = -1; deltaY <= 1; deltaY = deltaY + 1) {
		for (let deltaX = -1; deltaX <= 1; deltaX = deltaX + 1) {
			if (deltaX === 0 && deltaY === 0) {
				continue;
			}
			const neighborPosition = new Coordinates(
				computeModuloKeepingDivisorSign(position.x + deltaX, image.width),
				computeModuloKeepingDivisorSign(position.y + deltaY, image.height),
			);
			const neighborColor = readWithoutAlphaColorFromImageAtPosition(
				image,
				neighborPosition,
			).convertToContinuous();
			neighborCount = neighborCount.addColor(neighborColor);
		}
	}
	return neighborCount;
}
