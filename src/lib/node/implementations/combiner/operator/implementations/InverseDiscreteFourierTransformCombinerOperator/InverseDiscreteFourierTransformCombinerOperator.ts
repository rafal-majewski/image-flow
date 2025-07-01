import {CombinerOperator} from "../../CombinerOperator.ts";
import {setEachPixelYielding} from "../../../../../operator/setting-each-pixel-yielding/setEachPixelYielding.ts";
import type {Dimensions} from "../../../../../../dimensions/Dimensions.ts";
import {ContinuousWithAlphaColor} from "../../../../../operating/color/ContinuousWithAlphaColor.ts";
import InverseDiscreteFourierTransformCombinerOperatorDisplayer from "./displayer/InverseDiscreteFourierTransformCombinerOperatorDisplayer.svelte";
import {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {ComplexNumber} from "../../../../mapper/operator/implementations/discrete-fourier-transform/complex-number/ComplexNumber.ts";
import {readWithoutAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithoutAlphaColorFromImageAtPosition.ts";
import {ContinuousWithAlphaColorBuilder} from "../../../../../operating/color/ContinuousWithAlphaColorBuilder.ts";
import {ContinuousWithoutAlphaColorBuilder} from "../../../../../operating/color/ContinuousWithoutAlphaColorBuilder.ts";
export class InverseDiscreteFourierTransformCombinerOperator extends CombinerOperator {
	public constructor(
		outputImageDimensions: Dimensions,
		magnitudeExponentSign: 1 | -1,
		a_x: number,
		b_x: number,
		a_y: number,
		b_y: number,
	) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return InverseDiscreteFourierTransformCombinerOperatorDisplayer(
					...newParameters,
				);
			},
			"inverse-discrete-fourier-transform",
			"Inverse Discrete Fourier Transform",
		);
		this.outputImageDimensions = outputImageDimensions;
		this.magnitudeExponentSign = magnitudeExponentSign;
		this.a_x = a_x;
		this.b_x = b_x;
		this.a_y = a_y;
		this.b_y = b_y;
	}
	public readonly outputImageDimensions: Dimensions;
	public readonly magnitudeExponentSign: 1 | -1;
	public readonly a_x: number;
	public readonly b_x: number;
	public readonly a_y: number;
	public readonly b_y: number;
	public *operate(
		inputImages: readonly [ImageData, ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			this.outputImageDimensions.width,
			this.outputImageDimensions.height,
		);
		yield* setEachPixelYielding(outputImage, (positionInOutputImage) => {
			let sum = new ComplexNumber(0, 0);
			for (
				let positionInInputImageY = 0;
				positionInInputImageY < inputImages[0].height;
				positionInInputImageY = positionInInputImageY + 1
			) {
				for (
					let positionInInputImageX = 0;
					positionInInputImageX < inputImages[0].width;
					positionInInputImageX = positionInInputImageX + 1
				) {
					const positionInInputImage = new Coordinates(
						positionInInputImageX,
						positionInInputImageY,
					);
					const real =
						readWithoutAlphaColorFromImageAtPosition(
							inputImages[0],
							positionInInputImage,
						).convertToContinuous().redComponent - 0.5;
					const imag =
						readWithoutAlphaColorFromImageAtPosition(
							inputImages[1],
							positionInInputImage,
						).convertToContinuous().redComponent - 0.5;
					const frequency = positionInInputImage
						.multiplyCoordinateWise(new Coordinates(this.a_x, this.a_y))
						.add(new Coordinates(this.b_x, this.b_y));
					const angle = frequency.computeDotProduct(positionInOutputImage);
					const exponent = 2 * Math.PI * angle * this.magnitudeExponentSign;
					const c = new ComplexNumber(real, imag);
					const exp = new ComplexNumber(Math.cos(exponent), Math.sin(exponent));
					sum = sum.add(c.multiply(exp));
				}
			}
			// sum = sum.divideByReal(inputImages[0].width * inputImages[0].height);
			console.log(sum);
			const value = sum.realComponent;
			// return new ContinuousWithAlphaColor(
			// 	value,
			// 	value,
			// 	value,
			// 	1,
			// ).convertToDiscrete();
			return new ContinuousWithoutAlphaColorBuilder(value, value, value)
				.addBuilder(new ContinuousWithoutAlphaColorBuilder(0.5, 0.5, 0.5))
				.build()
				.withAlphaComponent(1)
				.convertToDiscrete();
		});
		return outputImage;
	}
	public withNewOutputImageDimensions(
		newDimensions: Dimensions,
	): InverseDiscreteFourierTransformCombinerOperator {
		return new InverseDiscreteFourierTransformCombinerOperator(
			newDimensions,
			this.magnitudeExponentSign,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
		);
	}
	public withNewMagnitudeExponentSign(
		newSign: 1 | -1,
	): InverseDiscreteFourierTransformCombinerOperator {
		return new InverseDiscreteFourierTransformCombinerOperator(
			this.outputImageDimensions,
			newSign,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
		);
	}
	public withNewPositionCoefficients(
		a_x: number,
		b_x: number,
		a_y: number,
		b_y: number,
	): InverseDiscreteFourierTransformCombinerOperator {
		return new InverseDiscreteFourierTransformCombinerOperator(
			this.outputImageDimensions,
			this.magnitudeExponentSign,
			a_x,
			b_x,
			a_y,
			b_y,
		);
	}
}
