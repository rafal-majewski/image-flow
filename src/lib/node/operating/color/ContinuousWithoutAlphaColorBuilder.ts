import type {ContinuousColorBuilderComponent} from "./ContinuousColorBuilderComponent.ts";
import type {ContinuousColorComponent} from "./ContinuousColorComponent.ts";
import {ContinuousWithoutAlphaColor} from "./ContinuousWithoutAlphaColor.ts";
import {sanitizeContinuousColorComponent} from "./sanitizeContinuousColorComponent.ts";
export class ContinuousWithoutAlphaColorBuilder {
	public constructor(
		redComponent: ContinuousColorBuilderComponent,
		greenComponent: ContinuousColorBuilderComponent,
		blueComponent: ContinuousColorBuilderComponent,
	) {
		this.redComponent = redComponent;
		this.greenComponent = greenComponent;
		this.blueComponent = blueComponent;
	}
	public addBuilder(
		color: ContinuousWithoutAlphaColorBuilder,
	): ContinuousWithoutAlphaColorBuilder {
		return new ContinuousWithoutAlphaColorBuilder(
			this.redComponent + color.redComponent,
			this.greenComponent + color.greenComponent,
			this.blueComponent + color.blueComponent,
		);
	}
	public addColor(
		color: ContinuousWithoutAlphaColor,
	): ContinuousWithoutAlphaColorBuilder {
		return new ContinuousWithoutAlphaColorBuilder(
			this.redComponent + color.redComponent,
			this.greenComponent + color.greenComponent,
			this.blueComponent + color.blueComponent,
		);
	}
	public readonly blueComponent: ContinuousColorComponent;
	public build(): ContinuousWithoutAlphaColor {
		return new ContinuousWithoutAlphaColor(
			sanitizeContinuousColorComponent(this.redComponent),
			sanitizeContinuousColorComponent(this.greenComponent),
			sanitizeContinuousColorComponent(this.blueComponent),
		);
	}
	public combineWith(
		combiner: (
			component1: ContinuousColorBuilderComponent,
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
	public divideByScalar(
		scalar: ContinuousColorBuilderComponent,
	): ContinuousWithoutAlphaColorBuilder {
		return new ContinuousWithoutAlphaColorBuilder(
			this.redComponent / scalar,
			this.greenComponent / scalar,
			this.blueComponent / scalar,
		);
	}
	public readonly greenComponent: ContinuousColorComponent;
	public mixWith(
		weightOfOtherColor: ContinuousColorBuilderComponent,
		otherColor: ContinuousWithoutAlphaColorBuilder,
	): ContinuousWithoutAlphaColorBuilder {
		return this.combineWith((thisColorComponent, otherColorComponent) => {
			return (
				thisColorComponent * (1 - weightOfOtherColor)
				+ otherColorComponent * weightOfOtherColor
			);
		}, otherColor);
	}
	public multiplyByColorComponentWise(
		color: ContinuousWithoutAlphaColor,
	): ContinuousWithoutAlphaColorBuilder {
		return new ContinuousWithoutAlphaColorBuilder(
			this.redComponent * color.redComponent,
			this.greenComponent * color.greenComponent,
			this.blueComponent * color.blueComponent,
		);
	}
	public multiplyByScalar(
		scalar: ContinuousColorBuilderComponent,
	): ContinuousWithoutAlphaColorBuilder {
		return new ContinuousWithoutAlphaColorBuilder(
			this.redComponent * scalar,
			this.greenComponent * scalar,
			this.blueComponent * scalar,
		);
	}
	public readonly redComponent: ContinuousColorComponent;
	public subtractColor(
		color: ContinuousWithoutAlphaColor,
	): ContinuousWithoutAlphaColorBuilder {
		return new ContinuousWithoutAlphaColorBuilder(
			this.redComponent - color.redComponent,
			this.greenComponent - color.greenComponent,
			this.blueComponent - color.blueComponent,
		);
	}
}
