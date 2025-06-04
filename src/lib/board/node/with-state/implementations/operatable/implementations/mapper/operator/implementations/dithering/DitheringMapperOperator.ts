import type {Coordinates} from "../../../../../../../../../coordinates/Coordinates.ts";
import {writeRgbaColorToImage} from "../../../../../../../writing-rgba-color-to-image/writeRgbaColorToImage.ts";
import {sanitizeDiscreteColorComponent} from "../../../../../color/discrete/component/sanitizing/sanitizeDiscreteColorComponent.ts";
import {createDiscreteRgbaColorFromComponents} from "../../../../../color/discrete/implementations/rgba/creating-from-components/createDiscreteRgbaColorFromComponents.ts";
import type {DiscreteRgbaColor} from "../../../../../color/discrete/implementations/rgba/DiscreteRgbaColor.ts";
import {readRgbaColorFromImage} from "../../../../../reading-rgba-color-from-image/readRgbaColorFromImage.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import {sanitizeDiscreteRgbColor} from "../convoluting-or-correlating/sanitizing-discrete-rgb-color/sanitizeDiscreteRgbColor.ts";
import DitheringMapperOperatorDisplayer from "./displayer/DitheringMapperOperatorDisplayer.svelte";
export class DitheringMapperOperator extends MapperOperator {
	public constructor() {
		super(DitheringMapperOperatorDisplayer, "dithering", "Dithering ");
	}
	public override *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const buffer = new Array(inputImages[0].height)
			.fill(null)
			.map((_, rowIndex) =>
				new Array(inputImages[0].width)
					.fill(null)
					.map((_, colIndex) =>
						readRgbaColorFromImage(
							inputImages[0],
							4 * (rowIndex * inputImages[0].width + colIndex),
						),
					),
			);
		const outputImage = new ImageData(
			inputImages[0].data,
			inputImages[0].width,
			inputImages[0].height,
		);
		const kernel = [
			[0, 0, 7 / 16],
			[3 / 16, 5 / 16, 1 / 16],
		];
		for (let positionY = 0; positionY < inputImages[0].height; positionY += 1) {
			for (
				let positionX = 0;
				positionX < inputImages[0].width;
				positionX += 1
			) {
				yield outputImage;
				const oldColor = (buffer[positionY] as readonly DiscreteRgbaColor[])[
					positionX
				] as DiscreteRgbaColor;
				const newColor = createDiscreteRgbaColorFromComponents(
					Math.round(sanitizeDiscreteColorComponent(oldColor.red) / 255) * 255,
					Math.round(sanitizeDiscreteColorComponent(oldColor.green) / 255)
						* 255,
					Math.round(sanitizeDiscreteColorComponent(oldColor.blue) / 255) * 255,
					sanitizeDiscreteColorComponent(oldColor.alpha),
				);
				const error = createDiscreteRgbaColorFromComponents(
					oldColor.red - newColor.red,
					oldColor.green - newColor.green,
					oldColor.blue - newColor.blue,
					oldColor.alpha - newColor.alpha,
				);
				// set before spreading
				writeRgbaColorToImage(
					outputImage,
					4 * (positionY * inputImages[0].width + positionX),
					newColor,
				);
				(buffer[positionY] as DiscreteRgbaColor[])[positionX] = newColor;
				for (
					let inKernelRelativeCellPositionY = 0;
					inKernelRelativeCellPositionY < kernel.length;
					inKernelRelativeCellPositionY += 1
				) {
					for (
						let inKernelRelativeCellPositionX = -1;
						inKernelRelativeCellPositionX
						< (kernel[inKernelRelativeCellPositionY] as readonly number[])
							.length
							- 1;
						inKernelRelativeCellPositionX += 1
					) {
						const inKernelAbsoluteCellPosition: Coordinates = {
							y: inKernelRelativeCellPositionY,
							x: inKernelRelativeCellPositionX + 1,
						};
						const inImageCellPosition: Coordinates = {
							y: positionY + inKernelRelativeCellPositionY,
							x: positionX + inKernelRelativeCellPositionX,
						};
						if (
							inImageCellPosition.y >= 0
							&& inImageCellPosition.y < inputImages[0].height
							&& inImageCellPosition.x >= 0
							&& inImageCellPosition.x < inputImages[0].width
						) {
							const cellColor = (
								buffer[inImageCellPosition.y] as readonly DiscreteRgbaColor[]
							)[inImageCellPosition.x] as DiscreteRgbaColor;
							const newCellColor = createDiscreteRgbaColorFromComponents(
								cellColor.red
									+ error.red
										* ((
											kernel[
												inKernelAbsoluteCellPosition.y
											] as readonly number[]
										)[inKernelAbsoluteCellPosition.x] as number),
								cellColor.green
									+ error.green
										* ((
											kernel[
												inKernelAbsoluteCellPosition.y
											] as readonly number[]
										)[inKernelAbsoluteCellPosition.x] as number),
								cellColor.blue
									+ error.blue
										* ((
											kernel[
												inKernelAbsoluteCellPosition.y
											] as readonly number[]
										)[inKernelAbsoluteCellPosition.x] as number),
								cellColor.alpha
									+ error.alpha
										* ((
											kernel[
												inKernelAbsoluteCellPosition.y
											] as readonly number[]
										)[inKernelAbsoluteCellPosition.x] as number),
							);
							(buffer[inImageCellPosition.y] as DiscreteRgbaColor[])[
								inImageCellPosition.x
							] = newCellColor;
							writeRgbaColorToImage(
								outputImage,
								4
									* (inImageCellPosition.y * inputImages[0].width
										+ inImageCellPosition.x),
								createDiscreteRgbaColorFromComponents(
									Math.max(0, Math.min(Math.round(newCellColor.red), 255)),
									Math.max(0, Math.min(Math.round(newCellColor.green), 255)),
									Math.max(0, Math.min(Math.round(newCellColor.blue), 255)),
									Math.max(0, Math.min(Math.round(newCellColor.alpha), 255)),
								),
							);
						}
					}
				}
			}
		}
		return outputImage;
	}
}
