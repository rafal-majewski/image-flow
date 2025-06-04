import type {Coordinates} from "../../../../../../../../../coordinates/Coordinates.ts";
import {createDiscreteRgbColorEmpty} from "../../../../../color/discrete/implementations/rgb/creating-empty/createDiscreteRgbColorEmpty.ts";
import {createDiscreteRgbColorFromComponents} from "../../../../../color/discrete/implementations/rgb/creating-from-components/createDiscreteRgbColorFromComponents.ts";
import {createDiscreteRgbaColorFromDiscreteRgbColor} from "../../../../../color/discrete/implementations/rgba/creating-from-rgb-color/createDiscreteRgbaColorFromDiscreteRgbColor.ts";
import {readRgbColorFromImage} from "../../../../../reading-rgb-color-from-image/readRgbColorFromImage.ts";
import {writeRgbaColorToImage} from "../../../../../../../writing-rgba-color-to-image/writeRgbaColorToImage.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import ConvolutingOrCorrelatingMapperOperatorDisplayer from "./displayer/ConvolutingOrCorrelatingMapperOperatorDisplayer.svelte";
import type {DiscreteColorComponent} from "../../../../../color/discrete/component/DiscreteColorComponent.ts";
import type {DiscreteRgbColor} from "../../../../../color/discrete/implementations/rgb/DiscreteRgbColor.ts";
import {sanitizeDiscreteRgbColor} from "./sanitizing-discrete-rgb-color/sanitizeDiscreteRgbColor.ts";
import type {RotationApplier} from "./rotation-applier/RotationApplier.ts";
export class ConvolutingOrCorrelatingMapperOperator extends MapperOperator {
	public constructor(
		anchorPosition: Coordinates,
		kernel: readonly [
			readonly [number, ...(readonly number[])],
			...(readonly [number, ...(readonly number[])])[],
		],
		rotationApplier: RotationApplier,
	) {
		super(
			// @ts-expect-error
			ConvolutingOrCorrelatingMapperOperatorDisplayer,
			"convoluting-or-correlating",
			"Convoluting / Correlating",
		);
		this.anchorPosition = anchorPosition;
		this.kernel = kernel;
		this.rotationApplier = rotationApplier;
	}
	public readonly rotationApplier: RotationApplier;
	public readonly anchorPosition: Coordinates;
	public readonly kernel: readonly [
		readonly [number, ...(readonly number[])],
		...(readonly [number, ...(readonly number[])])[],
	];
	public override *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const rotatedkernel = this.rotationApplier.applyRotation(this.kernel);
		const outputImage = new ImageData(
			inputImages[0].width - (rotatedkernel[0].length - 1),
			inputImages[0].height - (rotatedkernel.length - 1),
		);
		for (
			let positionY = this.anchorPosition.y;
			positionY
			< inputImages[0].height
				+ 1
				- rotatedkernel.length
				+ this.anchorPosition.y;
			positionY += 1
		) {
			for (
				let positionX = this.anchorPosition.x;
				positionX
				< inputImages[0].width
					+ 1
					- rotatedkernel[0].length
					+ this.anchorPosition.x;
				positionX += 1
			) {
				yield outputImage;
				let sum = createDiscreteRgbColorEmpty();
				const inOutputImagePosition: Coordinates = {
					x: positionX - this.anchorPosition.x,
					y: positionY - this.anchorPosition.y,
				};
				for (
					let inKernelRelativePositionY = -this.anchorPosition.y;
					inKernelRelativePositionY
					< rotatedkernel.length - this.anchorPosition.y;
					inKernelRelativePositionY += 1
				) {
					for (
						let inKernelRelativePositionX = -this.anchorPosition.x;
						inKernelRelativePositionX
						< rotatedkernel[0].length - this.anchorPosition.x;
						inKernelRelativePositionX += 1
					) {
						const inInputImagePosition: Coordinates = {
							x: positionX + inKernelRelativePositionX,
							y: positionY + inKernelRelativePositionY,
						};
						const inInputImageByteIndex =
							(inInputImagePosition.y * inputImages[0].width
								+ inInputImagePosition.x)
							* 4;
						const color = readRgbColorFromImage(
							inputImages[0],
							inInputImageByteIndex,
						);
						const inKernelAbsolutePosition: Coordinates = {
							x: inKernelRelativePositionX + this.anchorPosition.x,
							y: inKernelRelativePositionY + this.anchorPosition.y,
						};
						sum = createDiscreteRgbColorFromComponents(
							sum.red
								+ color.red
									* ((
										rotatedkernel[
											inKernelAbsolutePosition.y
										] as readonly number[]
									)[inKernelAbsolutePosition.x] as number),
							sum.green
								+ color.green
									* ((
										rotatedkernel[
											inKernelAbsolutePosition.y
										] as readonly number[]
									)[inKernelAbsolutePosition.x] as number),
							sum.blue
								+ color.blue
									* ((
										rotatedkernel[
											inKernelAbsolutePosition.y
										] as readonly number[]
									)[inKernelAbsolutePosition.x] as number),
						);
					}
				}
				const outputImageByteIndex =
					(inOutputImagePosition.y * outputImage.width
						+ inOutputImagePosition.x)
					* 4;
				writeRgbaColorToImage(
					outputImage,
					outputImageByteIndex,
					createDiscreteRgbaColorFromDiscreteRgbColor(
						sanitizeDiscreteRgbColor(sum),
						255,
					),
				);
			}
		}
		return outputImage;
	}
	public withNewAnchorPositionAndNewKernel(
		newAnchorPosition: Coordinates,
		newKernel: readonly [
			readonly [number, ...(readonly number[])],
			...(readonly [number, ...(readonly number[])])[],
		],
	): ConvolutingOrCorrelatingMapperOperator {
		return new ConvolutingOrCorrelatingMapperOperator(
			newAnchorPosition,
			newKernel,
			this.rotationApplier,
		);
	}
	public withNewAnchorPosition(
		newAnchorPosition: Coordinates,
	): ConvolutingOrCorrelatingMapperOperator {
		return new ConvolutingOrCorrelatingMapperOperator(
			newAnchorPosition,
			this.kernel,
			this.rotationApplier,
		);
	}
	public withNewKernel(
		newKernel: readonly [
			readonly [number, ...(readonly number[])],
			...(readonly [number, ...(readonly number[])])[],
		],
	): ConvolutingOrCorrelatingMapperOperator {
		return new ConvolutingOrCorrelatingMapperOperator(
			this.anchorPosition,
			newKernel,
			this.rotationApplier,
		);
	}
	public withNewRotationApplier(
		newRotationApplier: RotationApplier,
	): ConvolutingOrCorrelatingMapperOperator {
		return new ConvolutingOrCorrelatingMapperOperator(
			this.anchorPosition,
			this.kernel,
			newRotationApplier,
		);
	}
}
