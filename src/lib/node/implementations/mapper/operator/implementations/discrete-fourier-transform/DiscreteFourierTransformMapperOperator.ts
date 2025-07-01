import {MapperOperator} from "../../MapperOperator.ts";
import {setEachPixelYielding} from "../../../../../operator/setting-each-pixel-yielding/setEachPixelYielding.ts";
import DiscreteFourierTransformMapperOperatorDisplayer from "./displayer/DiscreteFourierTransformMapperOperatorDisplayer.svelte";
import {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {readWithoutAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithoutAlphaColorFromImageAtPosition.ts";
import {ComplexNumber} from "./complex-number/ComplexNumber.ts";
import type {Dimensions} from "../../../../../../dimensions/Dimensions.ts";
import {ContinuousWithoutAlphaColorBuilder} from "../../../../../operating/color/ContinuousWithoutAlphaColorBuilder.ts";
export class DiscreteFourierTransformMapperOperator extends MapperOperator {
	public constructor(
		outputImageDimensions: Dimensions,
		magnitudeExponentSign: 1 | -1,
		a_x: number,
		b_x: number,
		a_y: number,
		b_y: number,
		outputComponent: "magnitude" | "real" | "imaginary",
	) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return DiscreteFourierTransformMapperOperatorDisplayer(
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
	}
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
					const colorInInputImage = readWithoutAlphaColorFromImageAtPosition(
						inputImages[0],
						positionInInputImage,
					).convertToContinuous();
					const frequency = positionInOutputImage
						.multiplyCoordinateWise(new Coordinates(this.a_x, this.a_y))
						.add(new Coordinates(this.b_x, this.b_y));
					const angle = frequency.computeDotProduct(positionInInputImage);
					const exponent = 2 * Math.PI * angle * this.magnitudeExponentSign;
					sum = sum.add(
						new ComplexNumber(
							(colorInInputImage.redComponent - 0.5) * Math.cos(exponent),
							(colorInInputImage.redComponent - 0.5) * Math.sin(exponent),
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
					const magnitude = sum.computeMagnitude();
					return new ContinuousWithoutAlphaColorBuilder(
						magnitude,
						magnitude,
						magnitude,
					)
						.multiplyBy(2)
						.build()
						.withAlphaComponent(1)
						.convertToDiscrete();
			}
		});
		return outputImage;
	}
	public readonly magnitudeExponentSign: 1 | -1;
	public readonly outputImageDimensions: Dimensions;
	public readonly a_x: number;
	public readonly b_x: number;
	public readonly a_y: number;
	public readonly b_y: number;
	public readonly outputComponent: "magnitude" | "real" | "imaginary";
	public withNewOutputImageDimensions(
		newDimensions: Dimensions,
	): DiscreteFourierTransformMapperOperator {
		return new DiscreteFourierTransformMapperOperator(
			newDimensions,
			this.magnitudeExponentSign,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
			this.outputComponent,
		);
	}
	public withNewMagnitudeExponentSign(
		newSign: 1 | -1,
	): DiscreteFourierTransformMapperOperator {
		return new DiscreteFourierTransformMapperOperator(
			this.outputImageDimensions,
			newSign,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
			this.outputComponent,
		);
	}
	public withNewPositionCoefficients(
		a_x: number,
		b_x: number,
		a_y: number,
		b_y: number,
	): DiscreteFourierTransformMapperOperator {
		return new DiscreteFourierTransformMapperOperator(
			this.outputImageDimensions,
			this.magnitudeExponentSign,
			a_x,
			b_x,
			a_y,
			b_y,
			this.outputComponent,
		);
	}
	public withNewOutputComponent(
		outputComponent: "magnitude" | "real" | "imaginary",
	): DiscreteFourierTransformMapperOperator {
		return new DiscreteFourierTransformMapperOperator(
			this.outputImageDimensions,
			this.magnitudeExponentSign,
			this.a_x,
			this.b_x,
			this.a_y,
			this.b_y,
			outputComponent,
		);
	}
}
