import {MapperOperator} from "../../MapperOperator.ts";
import {setEachPixelYielding} from "../../../../../operator/setting-each-pixel-yielding/setEachPixelYielding.ts";
import ForwardDiscreteFourierTransformMapperOperatorDisplayer from "./displayer/ForwardDiscreteFourierTransformMapperOperatorDisplayer.svelte";
import {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {readWithoutAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithoutAlphaColorFromImageAtPosition.ts";
import {ComplexNumber} from "../../../../../complex-number/ComplexNumber.ts";
import type {Dimensions} from "../../../../../../dimensions/Dimensions.ts";
import {ContinuousWithoutAlphaColorBuilder} from "../../../../../operating/color/ContinuousWithoutAlphaColorBuilder.ts";
export class ForwardDiscreteFourierTransformMapperOperator extends MapperOperator {
	public constructor(
		outputImageDimensions: Dimensions,
		magnitudeExponentSign: 1 | -1,
		a_x: number,
		b_x: number,
		a_y: number,
		b_y: number,
		outputComponent: "magnitude" | "real" | "imaginary",
		lowerBound: number,
		upperBound: number,
	) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return ForwardDiscreteFourierTransformMapperOperatorDisplayer(
					...newParameters,
				);
			},
			"discrete-fourier-transform",
			"Discrete Fourier Transform",
		);
		this.outputImageDimensions = outputImageDimensions;
		this.magnitudeExponentSign = magnitudeExponentSign;
		this.a_x = a_x;
		this.b_x = b_x;
		this.a_y = a_y;
		this.b_y = b_y;
		this.outputComponent = outputComponent;
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
		inputImages: readonly [ImageData],
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
					const colorInInputImageRaw = readWithoutAlphaColorFromImageAtPosition(
						inputImages[0],
						positionInInputImage,
					).convertToContinuous().redComponent;
					const colorInInputImage =
						this.lowerBound
						+ (this.upperBound - this.lowerBound) * colorInInputImageRaw;
					const frequency = positionInOutputImage
						.divideByCoordinatesComponentWise(
							new Coordinates(this.a_x, this.a_y),
						)
						.addCoordinates(new Coordinates(this.b_x, this.b_y));
					const angle = frequency.dotProduct(positionInInputImage);
					const exponent = 2 * Math.PI * angle * this.magnitudeExponentSign;
					sum = sum.addComplex(
						new ComplexNumber(
							colorInInputImage * Math.cos(exponent),
							colorInInputImage * Math.sin(exponent),
						),
					);
				}
			}
			sum = sum.divideByReal(inputImages[0].width * inputImages[0].height);
			switch (this.outputComponent) {
				case "real":
					return new ContinuousWithoutAlphaColorBuilder(
						sum.realComponent,
						sum.realComponent,
						sum.realComponent,
					)
						.addBuilder(new ContinuousWithoutAlphaColorBuilder(0.5, 0.5, 0.5))
						.build()
						.withAlphaComponent(1)
						.convertToDiscrete();
				case "imaginary":
					return new ContinuousWithoutAlphaColorBuilder(
						sum.imaginaryComponent,
						sum.imaginaryComponent,
						sum.imaginaryComponent,
					)
						.addBuilder(new ContinuousWithoutAlphaColorBuilder(0.5, 0.5, 0.5))
						.build()
						.withAlphaComponent(1)
						.convertToDiscrete();
				case "magnitude":
					const magnitude = sum.magnitude();
					return new ContinuousWithoutAlphaColorBuilder(
						magnitude,
						magnitude,
						magnitude,
					)
						.multiplyByNumber(2)
						.build()
						.withAlphaComponent(1)
						.convertToDiscrete();
			}
		});
		return outputImage;
	}
	public readonly outputComponent: "magnitude" | "real" | "imaginary";
	public readonly outputImageDimensions: Dimensions;
	public readonly upperBound: number;
	public withNewA_x(
		newA_x: number,
	): ForwardDiscreteFourierTransformMapperOperator {
		return new ForwardDiscreteFourierTransformMapperOperator(
			this.outputImageDimensions,
			this.magnitudeExponentSign,
			newA_x,
			this.b_x,
			this.a_y,
			this.b_y,
			this.outputComponent,
			this.lowerBound,
			this.upperBound,
		);
	}
	public withNewA_y(
		newA_y: number,
	): ForwardDiscreteFourierTransformMapperOperator {
		return new ForwardDiscreteFourierTransformMapperOperator(
			this.outputImageDimensions,
			this.magnitudeExponentSign,
			this.a_x,
			this.b_x,
			newA_y,
			this.b_y,
			this.outputComponent,
			this.lowerBound,
			this.upperBound,
		);
	}
	public withNewB_x(
		newB_x: number,
	): ForwardDiscreteFourierTransformMapperOperator {
		return new ForwardDiscreteFourierTransformMapperOperator(
			this.outputImageDimensions,
			this.magnitudeExponentSign,
			this.a_x,
			newB_x,
			this.a_y,
			this.b_y,
			this.outputComponent,
			this.lowerBound,
			this.upperBound,
		);
	}
	public withNewB_y(
		newB_y: number,
	): ForwardDiscreteFourierTransformMapperOperator {
		return new ForwardDiscreteFourierTransformMapperOperator(
			this.outputImageDimensions,
			this.magnitudeExponentSign,
			this.a_x,
			this.b_x,
			this.a_y,
			newB_y,
			this.outputComponent,
			this.lowerBound,
			this.upperBound,
		);
	}
	public withNewLowerBound(
		newLowerBound: number,
	): ForwardDiscreteFourierTransformMapperOperator {
		return new ForwardDiscreteFourierTransformMapperOperator(
			this.outputImageDimensions,
			this.magnitudeExponentSign,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
			this.outputComponent,
			newLowerBound,
			this.upperBound,
		);
	}
	public withNewMagnitudeExponentSign(
		newSign: 1 | -1,
	): ForwardDiscreteFourierTransformMapperOperator {
		return new ForwardDiscreteFourierTransformMapperOperator(
			this.outputImageDimensions,
			newSign,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
			this.outputComponent,
			this.lowerBound,
			this.upperBound,
		);
	}
	public withNewOutputComponent(
		outputComponent: "magnitude" | "real" | "imaginary",
	): ForwardDiscreteFourierTransformMapperOperator {
		return new ForwardDiscreteFourierTransformMapperOperator(
			this.outputImageDimensions,
			this.magnitudeExponentSign,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
			outputComponent,
			this.lowerBound,
			this.upperBound,
		);
	}
	public withNewOutputImageDimensions(
		newDimensions: Dimensions,
	): ForwardDiscreteFourierTransformMapperOperator {
		return new ForwardDiscreteFourierTransformMapperOperator(
			newDimensions,
			this.magnitudeExponentSign,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
			this.outputComponent,
			this.lowerBound,
			this.upperBound,
		);
	}
	public withNewUpperBound(
		newUpperBound: number,
	): ForwardDiscreteFourierTransformMapperOperator {
		return new ForwardDiscreteFourierTransformMapperOperator(
			this.outputImageDimensions,
			this.magnitudeExponentSign,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
			this.outputComponent,
			this.lowerBound,
			newUpperBound,
		);
	}
}
