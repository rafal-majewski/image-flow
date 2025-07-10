import {CombinerOperator} from "../../CombinerOperator.ts";
import {setEachPixelYielding} from "../../../../../operating/operator/setting-each-pixel-yielding/setEachPixelYielding.ts";
import type {Dimensions} from "../../../../../../dimensions/Dimensions.ts";
import InverseDiscreteFourierTransformCombinerOperatorDisplayer from "./displayer/InverseDiscreteFourierTransformCombinerOperatorDisplayer.svelte";
import {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {ComplexNumber} from "../../../../../complex-number/ComplexNumber.ts";
import {readWithoutAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithoutAlphaColorFromImageAtPosition.ts";
import {ContinuousWithoutAlphaColorBuilder} from "../../../../../operating/color/ContinuousWithoutAlphaColorBuilder.ts";
export class InverseDiscreteFourierTransformCombinerOperator extends CombinerOperator {
	public constructor(
		outputImageDimensions: Dimensions,
		magnitudeExponentSign: 1 | -1,
		a_x: number,
		b_x: number,
		a_y: number,
		b_y: number,
		lowerBound: number,
		upperBound: number,
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
		this.lowerBound = lowerBound;
		this.upperBound = upperBound;
	}
	public readonly a_x: number;
	public readonly a_y: number;
	public readonly b_x: number;
	public readonly b_y: number;
	public readonly lowerBound: number;
	public readonly magnitudeExponentSign: 1 | -1;
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
					const realRaw = readWithoutAlphaColorFromImageAtPosition(
						inputImages[0],
						positionInInputImage,
					).convertToContinuous().redComponent;
					const imagRaw = readWithoutAlphaColorFromImageAtPosition(
						inputImages[1],
						positionInInputImage,
					).convertToContinuous().redComponent;
					const real =
						this.lowerBound + (this.upperBound - this.lowerBound) * realRaw;
					const imag =
						this.lowerBound + (this.upperBound - this.lowerBound) * imagRaw;
					const frequency = positionInInputImage
						.divideByCoordinatesComponentWise(
							new Coordinates(this.a_x, this.a_y),
						)
						.addCoordinates(new Coordinates(this.b_x, this.b_y));
					const angle = frequency.computeDotProduct(positionInOutputImage);
					const exponent = 2 * Math.PI * angle * this.magnitudeExponentSign;
					const c = new ComplexNumber(real, imag);
					const exp = new ComplexNumber(Math.cos(exponent), Math.sin(exponent));
					sum = sum.addComplex(c.multiplyByComplex(exp));
				}
			}
			const value = sum.realComponent;
			return new ContinuousWithoutAlphaColorBuilder(value, value, value)
				.addBuilder(new ContinuousWithoutAlphaColorBuilder(0.5, 0.5, 0.5))
				.build()
				.withAlphaComponent(1)
				.convertToDiscrete();
		});
		return outputImage;
	}
	public readonly outputImageDimensions: Dimensions;
	public replaceA_x(
		newA_x: number,
	): InverseDiscreteFourierTransformCombinerOperator {
		return new InverseDiscreteFourierTransformCombinerOperator(
			this.outputImageDimensions,
			this.magnitudeExponentSign,
			newA_x,
			this.b_x,
			this.a_y,
			this.b_y,
			this.lowerBound,
			this.upperBound,
		);
	}
	public replaceA_y(
		newA_y: number,
	): InverseDiscreteFourierTransformCombinerOperator {
		return new InverseDiscreteFourierTransformCombinerOperator(
			this.outputImageDimensions,
			this.magnitudeExponentSign,
			this.a_x,
			this.b_x,
			newA_y,
			this.b_y,
			this.lowerBound,
			this.upperBound,
		);
	}
	public replaceB_x(
		newB_x: number,
	): InverseDiscreteFourierTransformCombinerOperator {
		return new InverseDiscreteFourierTransformCombinerOperator(
			this.outputImageDimensions,
			this.magnitudeExponentSign,
			this.a_x,
			newB_x,
			this.a_y,
			this.b_y,
			this.lowerBound,
			this.upperBound,
		);
	}
	public replaceB_y(
		newB_y: number,
	): InverseDiscreteFourierTransformCombinerOperator {
		return new InverseDiscreteFourierTransformCombinerOperator(
			this.outputImageDimensions,
			this.magnitudeExponentSign,
			this.a_x,
			this.b_x,
			this.a_y,
			newB_y,
			this.lowerBound,
			this.upperBound,
		);
	}
	public replaceLowerBound(
		newLowerBound: number,
	): InverseDiscreteFourierTransformCombinerOperator {
		return new InverseDiscreteFourierTransformCombinerOperator(
			this.outputImageDimensions,
			this.magnitudeExponentSign,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
			newLowerBound,
			this.upperBound,
		);
	}
	public replaceMagnitudeExponentSign(
		newSign: 1 | -1,
	): InverseDiscreteFourierTransformCombinerOperator {
		return new InverseDiscreteFourierTransformCombinerOperator(
			this.outputImageDimensions,
			newSign,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
			this.lowerBound,
			this.upperBound,
		);
	}
	public replaceOutputImageDimensions(
		newDimensions: Dimensions,
	): InverseDiscreteFourierTransformCombinerOperator {
		return new InverseDiscreteFourierTransformCombinerOperator(
			newDimensions,
			this.magnitudeExponentSign,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
			this.lowerBound,
			this.upperBound,
		);
	}
	public replaceUpperBound(
		newUpperBound: number,
	): InverseDiscreteFourierTransformCombinerOperator {
		return new InverseDiscreteFourierTransformCombinerOperator(
			this.outputImageDimensions,
			this.magnitudeExponentSign,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
			this.lowerBound,
			newUpperBound,
		);
	}
	public readonly upperBound: number;
}
