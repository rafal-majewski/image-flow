import type {ContinuousColorBuilderComponent} from "./ContinuousColorBuilderComponent.ts";
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
	public combineWithBuilderResultingInBuilder(
		combiner: (
			component1: ContinuousColorComponent,
			component2: ContinuousColorBuilderComponent,
		) => ContinuousColorBuilderComponent,
		color: ContinuousWithoutAlphaColorBuilder,
	): ContinuousWithoutAlphaColorBuilder {
		return new ContinuousWithoutAlphaColorBuilder(
			combiner(this.redComponent, color.redComponent),
			combiner(this.greenComponent, color.greenComponent),
			combiner(this.blueComponent, color.blueComponent),
		);
	}
	public combineWithBuilderResultingInColor(
		combiner: (
			component1: ContinuousColorComponent,
			component2: ContinuousColorBuilderComponent,
		) => ContinuousColorComponent,
		color: ContinuousWithoutAlphaColorBuilder,
	): ContinuousWithoutAlphaColor {
		return new ContinuousWithoutAlphaColor(
			combiner(this.redComponent, color.redComponent),
			combiner(this.greenComponent, color.greenComponent),
			combiner(this.blueComponent, color.blueComponent),
		);
	}
	public combineWithColor(
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
	public computeDotProduct(
		color: ContinuousWithoutAlphaColor,
	): ContinuousColorComponent {
		return (
			this.redComponent * color.redComponent
			+ this.greenComponent * color.greenComponent
			+ this.blueComponent * color.blueComponent
		);
	}
	public convertToBuilder(): ContinuousWithoutAlphaColorBuilder {
		return new ContinuousWithoutAlphaColorBuilder(
			this.redComponent,
			this.greenComponent,
			this.blueComponent,
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
	public divideByNumber(number_: number): ContinuousWithoutAlphaColor {
		return new ContinuousWithoutAlphaColor(
			sanitizeContinuousColorComponent(this.redComponent / number_),
			sanitizeContinuousColorComponent(this.greenComponent / number_),
			sanitizeContinuousColorComponent(this.blueComponent / number_),
		);
	}
	public readonly greenComponent: ContinuousColorComponent;
	public mixWithColor(
		weightOfOtherColor: ContinuousColorComponent,
		otherColor: ContinuousWithoutAlphaColor,
	): ContinuousWithoutAlphaColor {
		return this.combineWithColor((thisColorComponent, otherColorComponent) => {
			return (
				thisColorComponent * (1 - weightOfOtherColor)
				+ otherColorComponent * weightOfOtherColor
			);
		}, otherColor);
	}
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
	public multiplyByNumber(number_: number): ContinuousWithoutAlphaColor {
		return new ContinuousWithoutAlphaColor(
			sanitizeContinuousColorComponent(this.redComponent * number_),
			sanitizeContinuousColorComponent(this.greenComponent * number_),
			sanitizeContinuousColorComponent(this.blueComponent * number_),
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
}
