import type {ContinuousColorComponent} from "./ContinuousColorComponent.ts";
import {ContinuousWithoutAlphaColor} from "./ContinuousWithoutAlphaColor.ts";
import {convertContinuousColorComponentToDiscreteColorComponent} from "./convertContinuousColorComponentToDiscreteColorComponent.ts";
import {DiscreteWithAlphaColor} from "./DiscreteWithAlphaColor.ts";
import {sanitizeContinuousColorComponent} from "./sanitizeContinuousColorComponent.ts";
export class ContinuousWithAlphaColor {
	public constructor(
		redComponent: ContinuousColorComponent,
		greenComponent: ContinuousColorComponent,
		blueComponent: ContinuousColorComponent,
		alphaComponent: ContinuousColorComponent,
	) {
		this.redComponent = redComponent;
		this.greenComponent = greenComponent;
		this.blueComponent = blueComponent;
		this.alphaComponent = alphaComponent;
	}
	public add(color: ContinuousWithAlphaColor): ContinuousWithAlphaColor {
		return new ContinuousWithAlphaColor(
			sanitizeContinuousColorComponent(this.redComponent + color.redComponent),
			sanitizeContinuousColorComponent(
				this.greenComponent + color.greenComponent,
			),
			sanitizeContinuousColorComponent(
				this.blueComponent + color.blueComponent,
			),
			sanitizeContinuousColorComponent(
				this.alphaComponent + color.alphaComponent,
			),
		);
	}
	public readonly alphaComponent: ContinuousColorComponent;
	public readonly blueComponent: ContinuousColorComponent;
	public combineWithColor(
		combiner: (
			component1: ContinuousColorComponent,
			component2: ContinuousColorComponent,
		) => ContinuousColorComponent,
		color: ContinuousWithAlphaColor,
	): ContinuousWithAlphaColor {
		return new ContinuousWithAlphaColor(
			combiner(this.redComponent, color.redComponent),
			combiner(this.greenComponent, color.greenComponent),
			combiner(this.blueComponent, color.blueComponent),
			combiner(this.alphaComponent, color.alphaComponent),
		);
	}
	public convertToDiscrete(): DiscreteWithAlphaColor {
		return new DiscreteWithAlphaColor(
			convertContinuousColorComponentToDiscreteColorComponent(
				this.redComponent,
			),
			convertContinuousColorComponentToDiscreteColorComponent(
				this.greenComponent,
			),
			convertContinuousColorComponentToDiscreteColorComponent(
				this.blueComponent,
			),
			convertContinuousColorComponentToDiscreteColorComponent(
				this.alphaComponent,
			),
		);
	}
	public divideByScalar(scalar: number): ContinuousWithAlphaColor {
		return new ContinuousWithAlphaColor(
			sanitizeContinuousColorComponent(this.redComponent / scalar),
			sanitizeContinuousColorComponent(this.greenComponent / scalar),
			sanitizeContinuousColorComponent(this.blueComponent / scalar),
			sanitizeContinuousColorComponent(this.alphaComponent / scalar),
		);
	}
	public readonly greenComponent: ContinuousColorComponent;
	public mixWithColor(
		weightOfOtherColor: ContinuousColorComponent,
		otherColor: ContinuousWithAlphaColor,
	): ContinuousWithAlphaColor {
		return this.combineWithColor((thisColorComponent, otherColorComponent) => {
			return (
				thisColorComponent * (1 - weightOfOtherColor)
				+ otherColorComponent * weightOfOtherColor
			);
		}, otherColor);
	}
	public multiplyByColor(
		color: ContinuousWithAlphaColor,
	): ContinuousWithAlphaColor {
		return new ContinuousWithAlphaColor(
			sanitizeContinuousColorComponent(this.redComponent * color.redComponent),
			sanitizeContinuousColorComponent(
				this.greenComponent * color.greenComponent,
			),
			sanitizeContinuousColorComponent(
				this.blueComponent * color.blueComponent,
			),
			sanitizeContinuousColorComponent(
				this.alphaComponent * color.alphaComponent,
			),
		);
	}
	public multiplyByScalar(scalar: number): ContinuousWithAlphaColor {
		return new ContinuousWithAlphaColor(
			sanitizeContinuousColorComponent(this.redComponent * scalar),
			sanitizeContinuousColorComponent(this.greenComponent * scalar),
			sanitizeContinuousColorComponent(this.blueComponent * scalar),
			sanitizeContinuousColorComponent(this.alphaComponent * scalar),
		);
	}
	public readonly redComponent: ContinuousColorComponent;
	public subtract(color: ContinuousWithAlphaColor): ContinuousWithAlphaColor {
		return new ContinuousWithAlphaColor(
			sanitizeContinuousColorComponent(this.redComponent - color.redComponent),
			sanitizeContinuousColorComponent(
				this.greenComponent - color.greenComponent,
			),
			sanitizeContinuousColorComponent(
				this.blueComponent - color.blueComponent,
			),
			sanitizeContinuousColorComponent(
				this.alphaComponent - color.alphaComponent,
			),
		);
	}
	public withoutAlphaComponent(): ContinuousWithoutAlphaColor {
		return new ContinuousWithoutAlphaColor(
			this.redComponent,
			this.greenComponent,
			this.blueComponent,
		);
	}
}
