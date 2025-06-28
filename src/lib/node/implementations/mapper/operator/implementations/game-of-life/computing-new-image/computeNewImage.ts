import {Coordinates} from "../../../../../../../coordinates/Coordinates.ts";
import type {ContinuousColorComponent} from "../../../../../../operating/color/ContinuousColorComponent.ts";
import type {DiscreteWithAlphaColor} from "../../../../../../operating/color/DiscreteWithAlphaColor.ts";
import {readWithAlphaColorFromImageAtPosition} from "../../../../../../operating/color/readWithAlphaColorFromImageAtPosition.ts";
import {setEachPixelSynchronously} from "../../../../../../operator/setting-each-pixel-synchronously/setEachPixelSynchronously.ts";
import type {GameOfLifeMapperOperatorColorComponentComputer} from "../color-component-computer/GameOfLifeMapperOperatorColorComponentComputer.ts";
import {computeNewColor} from "./computing-new-color/computeNewColor.ts";
export function computeNewImage(
	componentComputer: GameOfLifeMapperOperatorColorComponentComputer,
	oldImage: ImageData,
	weightOfNewImage: ContinuousColorComponent,
): ImageData {
	const newImage = new ImageData(oldImage.width, oldImage.height);
	setEachPixelSynchronously(
		newImage,
		(position: Coordinates): DiscreteWithAlphaColor => {
			const newColor = computeNewColor(componentComputer, oldImage, position);
			const lastColorWithAlphaComponent = readWithAlphaColorFromImageAtPosition(
				oldImage,
				position,
			).convertToContinuous();
			return lastColorWithAlphaComponent
				.withoutAlphaComponent()
				.mixWithColor(weightOfNewImage, newColor)
				.withAlphaComponent(lastColorWithAlphaComponent.alphaComponent)
				.convertToDiscrete();
		},
	);
	return newImage;
}
