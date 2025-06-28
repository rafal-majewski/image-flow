import type {Coordinates} from "../../../../../../../../coordinates/Coordinates.ts";
import {readWithoutAlphaColorFromImageAtPosition} from "../../../../../../../operating/color/readWithoutAlphaColorFromImageAtPosition.ts";
import type {GameOfLifeMapperOperatorColorComponentComputer} from "../../color-component-computer/GameOfLifeMapperOperatorColorComponentComputer.ts";
import {computeNeighborCount} from "./computing-neighbor-count/computeNeighborCount.ts";
export function computeNewColor(
	componentComputer: GameOfLifeMapperOperatorColorComponentComputer,
	oldImage: ImageData,
	position: Coordinates,
) {
	const neighborCount = computeNeighborCount(oldImage, position);
	const selfColor = readWithoutAlphaColorFromImageAtPosition(
		oldImage,
		position,
	).convertToContinuous();
	return selfColor.combineWithBuilderResultingInColor(
		(component1, component2) => {
			return componentComputer.compute(component1, component2);
		},
		neighborCount,
	);
}
