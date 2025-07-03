import {MapperOperator} from "../../MapperOperator.ts";
import {setEachPixelYielding} from "../../../../../operator/setting-each-pixel-yielding/setEachPixelYielding.ts";
import {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {readWithoutAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithoutAlphaColorFromImageAtPosition.ts";
import {ComplexNumber} from "../../../../../complex-number/ComplexNumber.ts";
import type {Dimensions} from "../../../../../../dimensions/Dimensions.ts";
import {ContinuousWithoutAlphaColorBuilder} from "../../../../../operating/color/ContinuousWithoutAlphaColorBuilder.ts";
import ForwardThenInverseDiscreteFourierTransformMapperOperatorDisplayer from "./displayer/ForwardThenInverseDiscreteFourierTransformMapperOperatorDisplayer.svelte";
export class ForwardThenInverseDiscreteFourierTransformMapperOperator extends MapperOperator {
	public constructor(
		afterForwardImageDimensions: Dimensions,
		afterInverseImageDimensions: Dimensions,
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
				return ForwardThenInverseDiscreteFourierTransformMapperOperatorDisplayer(
					...newParameters,
				);
			},
			"forward-then-inverse-discrete-fourier-transform",
			"Forward Then Inverse Discrete Fourier Transform",
		);
		this.afterForwardImageDimensions = afterForwardImageDimensions;
		this.afterInverseImageDimensions = afterInverseImageDimensions;
		this.a_x = a_x;
		this.b_x = b_x;
		this.a_y = a_y;
		this.b_y = b_y;
		this.lowerBound = lowerBound;
		this.upperBound = upperBound;
	}
	public readonly a_x: number;
	public readonly a_y: number;
	public readonly afterForwardImageDimensions: Dimensions;
	public readonly afterInverseImageDimensions: Dimensions;
	public readonly b_x: number;
	public readonly b_y: number;
	public readonly lowerBound: number;
	public *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const coefficients: ComplexNumber[][] = [];
		for (
			let positionInAfterForwardImageY = 0;
			positionInAfterForwardImageY < this.afterForwardImageDimensions.height;
			positionInAfterForwardImageY = positionInAfterForwardImageY + 1
		) {
			const row: ComplexNumber[] = [];
			for (
				let positionInAfterForwardImageX = 0;
				positionInAfterForwardImageX < this.afterForwardImageDimensions.width;
				positionInAfterForwardImageX = positionInAfterForwardImageX + 1
			) {
				const positionInAfterForwardImage = new Coordinates(
					positionInAfterForwardImageX,
					positionInAfterForwardImageY,
				);
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
						const color = readWithoutAlphaColorFromImageAtPosition(
							inputImages[0]!,
							positionInInputImage,
						).convertToContinuous().redComponent;
						const colorInBounds =
							this.lowerBound + (this.upperBound - this.lowerBound) * color;
						const frequency = positionInAfterForwardImage
							.divideByCoordinatesComponentWise(
								new Coordinates(this.a_x, this.a_y),
							)
							.addCoordinates(new Coordinates(this.b_x, this.b_y));
						const angle = frequency.dotProduct(positionInInputImage);
						const exponent = -2 * Math.PI * angle;
						sum = sum.addComplex(
							new ComplexNumber(
								colorInBounds * Math.cos(exponent),
								colorInBounds * Math.sin(exponent),
							),
						);
					}
				}
				sum = sum.divideByReal(inputImages[0].width * inputImages[0].height);
				row.push(sum);
			}
			coefficients.push(row);
		}
		// TODO: FIx
		const outputImage = new ImageData(
			this.afterInverseImageDimensions.width,
			this.afterInverseImageDimensions.height,
		);
		yield* setEachPixelYielding(outputImage, (positionInAfterInverseImage) => {
			let sum = new ComplexNumber(0, 0);
			for (
				let positionInAfterForwardImageY = 0;
				positionInAfterForwardImageY < this.afterForwardImageDimensions.height;
				positionInAfterForwardImageY = positionInAfterForwardImageY + 1
			) {
				for (
					let positionInAfterForwardImageX = 0;
					positionInAfterForwardImageX < this.afterForwardImageDimensions.width;
					positionInAfterForwardImageX = positionInAfterForwardImageX + 1
				) {
					const positionInAfterForwardImage = new Coordinates(
						positionInAfterForwardImageX,
						positionInAfterForwardImageY,
					);
					const frequency = positionInAfterForwardImage
						.divideByCoordinatesComponentWise(
							new Coordinates(this.a_x, this.a_y),
						)
						.addCoordinates(new Coordinates(this.b_x, this.b_y));
					const angle = frequency.dotProduct(positionInAfterInverseImage);
					const exponent = 2 * Math.PI * angle;
					const exp = new ComplexNumber(Math.cos(exponent), Math.sin(exponent));
					sum = sum.addComplex(
						new ComplexNumber(
							positionInAfterForwardImage.x,
							positionInAfterForwardImage.y,
						).multiplyByComplex(exp),
					);
				}
			}
			sum = sum.multiplyByReal(
				this.afterForwardImageDimensions.width
					* this.afterForwardImageDimensions.height,
			);
			const value = sum.realComponent;
			return new ContinuousWithoutAlphaColorBuilder(value, value, value)
				.addBuilder(new ContinuousWithoutAlphaColorBuilder(0.5, 0.5, 0.5))
				.build()
				.withAlphaComponent(1)
				.convertToDiscrete();
		});
		return outputImage;
	}
	public readonly upperBound: number;
	public withNewAfterForwardImageDimensions(
		newDimensions: Dimensions,
	): ForwardThenInverseDiscreteFourierTransformMapperOperator {
		return new ForwardThenInverseDiscreteFourierTransformMapperOperator(
			newDimensions,
			this.afterInverseImageDimensions,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
			this.lowerBound,
			this.upperBound,
		);
	}
	public withNewAfterInverseImageDimensions(
		newDimensions: Dimensions,
	): ForwardThenInverseDiscreteFourierTransformMapperOperator {
		return new ForwardThenInverseDiscreteFourierTransformMapperOperator(
			this.afterForwardImageDimensions,
			newDimensions,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
			this.lowerBound,
			this.upperBound,
		);
	}
	public withNewLowerBound(
		newLowerBound: number,
	): ForwardThenInverseDiscreteFourierTransformMapperOperator {
		return new ForwardThenInverseDiscreteFourierTransformMapperOperator(
			this.afterForwardImageDimensions,
			this.afterInverseImageDimensions,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
			newLowerBound,
			this.upperBound,
		);
	}
	public withNewPositionCoefficients(
		a_x: number,
		b_x: number,
		a_y: number,
		b_y: number,
	): ForwardThenInverseDiscreteFourierTransformMapperOperator {
		return new ForwardThenInverseDiscreteFourierTransformMapperOperator(
			this.afterForwardImageDimensions,
			this.afterInverseImageDimensions,
			a_x,
			b_x,
			a_y,
			b_y,
			this.lowerBound,
			this.upperBound,
		);
	}
	public withNewUpperBound(
		newUpperBound: number,
	): ForwardThenInverseDiscreteFourierTransformMapperOperator {
		return new ForwardThenInverseDiscreteFourierTransformMapperOperator(
			this.afterForwardImageDimensions,
			this.afterInverseImageDimensions,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
			this.lowerBound,
			newUpperBound,
		);
	}
}
