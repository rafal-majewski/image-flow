import type {ContinuousColorComponent} from "./ContinuousColorComponent.ts";
import {ContinuousWithAlphaColor} from "./ContinuousWithAlphaColor.ts";
import {ContinuousWithoutAlphaColorBuilder} from "./ContinuousWithoutAlphaColorBuilder.ts";
import {convertContinuousColorComponentToDiscreteColorComponent} from "./convertContinuousColorComponentToDiscreteColorComponent.ts";
import {DiscreteWithoutAlphaColor} from "./DiscreteWithoutAlphaColor.ts";
import {sanitizeContinuousColorComponent} from "./sanitizeContinuousColorComponent.ts";
export class ContinuousWithoutAlphaColor {
	public constructor(
		redComponent: ContinuousColorComponent,
		greenComponent: ContinuousColorComponent,
		blueComponent: ContinuousColorComponent,
	) {
		this.redComponent = redComponent;
		this.greenComponent = greenComponent;
		this.blueComponent = blueComponent;
	}
	public add(color: ContinuousWithoutAlphaColor): ContinuousWithoutAlphaColor {
		return new ContinuousWithoutAlphaColor(
			sanitizeContinuousColorComponent(this.redComponent + color.redComponent),
			sanitizeContinuousColorComponent(
				this.greenComponent + color.greenComponent,
			),
			sanitizeContinuousColorComponent(
				this.blueComponent + color.blueComponent,
			),
		);
	}
	public readonly blueComponent: ContinuousColorComponent;
	public computeDotProduct(
		color: ContinuousWithoutAlphaColor,
	): ContinuousColorComponent {
		return (
			this.redComponent * color.redComponent
			+ this.greenComponent * color.greenComponent
			+ this.blueComponent * color.blueComponent
		);
	}
	public convertToDiscrete(): DiscreteWithoutAlphaColor {
		return new DiscreteWithoutAlphaColor(
			convertContinuousColorComponentToDiscreteColorComponent(
				this.redComponent,
			),
			convertContinuousColorComponentToDiscreteColorComponent(
				this.greenComponent,
			),
			convertContinuousColorComponentToDiscreteColorComponent(
				this.blueComponent,
			),
		);
	}
	public divideByScalar(scalar: number): ContinuousWithoutAlphaColor {
		return new ContinuousWithoutAlphaColor(
			sanitizeContinuousColorComponent(this.redComponent / scalar),
			sanitizeContinuousColorComponent(this.greenComponent / scalar),
			sanitizeContinuousColorComponent(this.blueComponent / scalar),
		);
	}
	public readonly greenComponent: ContinuousColorComponent;
	public multiplyByColor(
		color: ContinuousWithoutAlphaColor,
	): ContinuousWithoutAlphaColor {
		return new ContinuousWithoutAlphaColor(
			sanitizeContinuousColorComponent(this.redComponent * color.redComponent),
			sanitizeContinuousColorComponent(
				this.greenComponent * color.greenComponent,
			),
			sanitizeContinuousColorComponent(
				this.blueComponent * color.blueComponent,
			),
		);
	}
	public multiplyByScalar(scalar: number): ContinuousWithoutAlphaColor {
		return new ContinuousWithoutAlphaColor(
			sanitizeContinuousColorComponent(this.redComponent * scalar),
			sanitizeContinuousColorComponent(this.greenComponent * scalar),
			sanitizeContinuousColorComponent(this.blueComponent * scalar),
		);
	}
	public readonly redComponent: ContinuousColorComponent;
	public subtract(
		color: ContinuousWithoutAlphaColor,
	): ContinuousWithoutAlphaColor {
		return new ContinuousWithoutAlphaColor(
			sanitizeContinuousColorComponent(this.redComponent - color.redComponent),
			sanitizeContinuousColorComponent(
				this.greenComponent - color.greenComponent,
			),
			sanitizeContinuousColorComponent(
				this.blueComponent - color.blueComponent,
			),
		);
	}
	public withAlphaComponent(
		alphaComponent: ContinuousColorComponent,
	): ContinuousWithAlphaColor {
		return new ContinuousWithAlphaColor(
			this.redComponent,
			this.greenComponent,
			this.blueComponent,
			alphaComponent,
		);
	}
	public convertToBuilder(): ContinuousWithoutAlphaColorBuilder {
		return new ContinuousWithoutAlphaColorBuilder(
			this.redComponent,
			this.greenComponent,
			this.blueComponent,
		);
	}
	public combineWith(
		combiner: (
			component1: ContinuousColorComponent,
			component2: ContinuousColorComponent,
		) => ContinuousColorComponent,
		color: ContinuousWithoutAlphaColor,
	): ContinuousWithoutAlphaColor {
		return new ContinuousWithoutAlphaColor(
			combiner(this.redComponent, color.redComponent),
			combiner(this.greenComponent, color.greenComponent),
			combiner(this.blueComponent, color.blueComponent),
		);
	}
	public mixWith(
		weightOfOtherColor: ContinuousColorComponent,
		otherColor: ContinuousWithoutAlphaColor,
	): ContinuousWithoutAlphaColor {
		return this.combineWith((thisColorComponent, otherColorComponent) => {
			return (
				thisColorComponent * (1 - weightOfOtherColor)
				+ otherColorComponent * weightOfOtherColor
			);
		}, otherColor);
	}
}
