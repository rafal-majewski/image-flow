import {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {writeWithAlphaColorToImageAtByteIndex} from "../../../../../operating/color/writeWithAlphaColorToImageAtByteIndex.ts";
import {MappingOperator} from "../../MapperOperator.ts";
import type {RotationApplier} from "./rotation-applier/RotationApplier.ts";
import {sanitizeDiscreteRgbColor} from "./sanitizing-discrete-rgb-color/sanitizeDiscreteRgbColor.ts";
export class ConvolutingOrCorrelatingMappingOperator extends MappingOperator {
	public constructor(
		anchorPosition: Coordinates,
		kernel: readonly [
			readonly [number, ...(readonly number[])],
			...(readonly [number, ...(readonly number[])])[],
		],
		rotationApplier: RotationApplier,
	) {
		super(
			ConvolutingOrCorrelatingMappingOperatorDisplayer,
			"convoluting-or-correlating",
			"Convoluting / Correlating",
		);
		this.anchorPosition = anchorPosition;
		this.kernel = kernel;
		this.rotationApplier = rotationApplier;
	}
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
				const inOutputImagePosition = new Coordinates(
					positionX - this.anchorPosition.x,
					positionY - this.anchorPosition.y,
				);
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
						const inKernelRelativePosition = new Coordinates(
							inKernelRelativePositionX,
							inKernelRelativePositionY,
						);
						const inInputImagePosition = new Coordinates(
							positionX,
							positionY,
						).add(inKernelRelativePosition);
						const inInputImageByteIndex =
							(inInputImagePosition.y * inputImages[0].width
								+ inInputImagePosition.x)
							* 4;
						const color = readRgbColorFromImage(
							inputImages[0],
							inInputImageByteIndex,
						);
						// const inKernelAbsolutePosition: Coordinates = {
						// 	x: inKernelRelativePositionX + this.anchorPosition.x,
						// 	y: inKernelRelativePositionY + this.anchorPosition.y,
						// };
						const inKernelAbsolutePosition = inKernelRelativePosition.add(
							this.anchorPosition,
						);
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
				writeWithAlphaColorToImageAtByteIndex(
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
	public readonly rotationApplier: RotationApplier;
	public withNewAnchorPosition(
		newAnchorPosition: Coordinates,
	): ConvolutingOrCorrelatingMappingOperator {
		return new ConvolutingOrCorrelatingMappingOperator(
			newAnchorPosition,
			this.kernel,
			this.rotationApplier,
		);
	}
	public withNewAnchorPositionAndNewKernel(
		newAnchorPosition: Coordinates,
		newKernel: readonly [
			readonly [number, ...(readonly number[])],
			...(readonly [number, ...(readonly number[])])[],
		],
	): ConvolutingOrCorrelatingMappingOperator {
		return new ConvolutingOrCorrelatingMappingOperator(
			newAnchorPosition,
			newKernel,
			this.rotationApplier,
		);
	}
	public withNewKernel(
		newKernel: readonly [
			readonly [number, ...(readonly number[])],
			...(readonly [number, ...(readonly number[])])[],
		],
	): ConvolutingOrCorrelatingMappingOperator {
		return new ConvolutingOrCorrelatingMappingOperator(
			this.anchorPosition,
			newKernel,
			this.rotationApplier,
		);
	}
	public withNewRotationApplier(
		newRotationApplier: RotationApplier,
	): ConvolutingOrCorrelatingMappingOperator {
		return new ConvolutingOrCorrelatingMappingOperator(
			this.anchorPosition,
			this.kernel,
			newRotationApplier,
		);
	}
}
