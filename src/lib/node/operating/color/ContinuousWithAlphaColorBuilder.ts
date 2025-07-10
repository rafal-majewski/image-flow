import type {ContinuousColorBuilderComponent} from "./ContinuousColorBuilderComponent.ts";
import type {ContinuousColorComponent} from "./ContinuousColorComponent.ts";
import {ContinuousWithAlphaColor} from "./continuous-with-alpha/ContinuousWithAlphaColor.ts";
import {sanitizeContinuousColorComponent} from "./sanitizeContinuousColorComponent.ts";
export class ContinuousWithAlphaColorBuilder {
	public constructor(
		redComponent: ContinuousColorBuilderComponent,
		greenComponent: ContinuousColorBuilderComponent,
		blueComponent: ContinuousColorBuilderComponent,
		alphaComponent: ContinuousColorBuilderComponent,
	) {
		this.redComponent = redComponent;
		this.greenComponent = greenComponent;
		this.blueComponent = blueComponent;
		this.alphaComponent = alphaComponent;
	}
	public addBuilder(
		otherBuilder: ContinuousWithAlphaColorBuilder,
	): ContinuousWithAlphaColorBuilder {
		return this.combineWithBuilderComponentWise(
			otherBuilder,
			(colorComponentFromThisBuilder, colorComponentFromOtherBuilder) => {
				return colorComponentFromThisBuilder + colorComponentFromOtherBuilder;
			},
		);
	}
	public addColor(
		otherColor: ContinuousWithAlphaColor,
	): ContinuousWithAlphaColorBuilder {
		return this.combineWithColorComponentWise(
			otherColor,
			(colorComponentFromThisBuilder, colorComponentFromOtherColor) => {
				return colorComponentFromThisBuilder + colorComponentFromOtherColor;
			},
		);
	}
	public readonly alphaComponent: ContinuousColorComponent;
	public readonly blueComponent: ContinuousColorComponent;
	public build(): ContinuousWithAlphaColor {
		return new ContinuousWithAlphaColor(
			sanitizeContinuousColorComponent(this.redComponent),
			sanitizeContinuousColorComponent(this.greenComponent),
			sanitizeContinuousColorComponent(this.blueComponent),
			sanitizeContinuousColorComponent(this.alphaComponent),
		);
	}
	public combineWithBuilderComponentWise(
		otherBuilder: ContinuousWithAlphaColorBuilder,
		combiner: (
			colorComponentFromThisBuilder: ContinuousColorBuilderComponent,
			colorComponentFromOtherBuilder: ContinuousColorBuilderComponent,
		) => ContinuousColorBuilderComponent,
	): ContinuousWithAlphaColorBuilder {
		return new ContinuousWithAlphaColorBuilder(
			combiner(this.redComponent, otherBuilder.redComponent),
			combiner(this.greenComponent, otherBuilder.greenComponent),
			combiner(this.blueComponent, otherBuilder.blueComponent),
			combiner(this.alphaComponent, otherBuilder.alphaComponent),
		);
	}
	public combineWithColorComponentWise(
		otherColor: ContinuousWithAlphaColor,
		combiner: (
			colorComponentFromThis: ContinuousColorBuilderComponent,
			colorComponentFromOther: ContinuousColorComponent,
		) => ContinuousColorBuilderComponent,
	): ContinuousWithAlphaColorBuilder {
		return new ContinuousWithAlphaColorBuilder(
			combiner(this.redComponent, otherColor.redComponent),
			combiner(this.greenComponent, otherColor.greenComponent),
			combiner(this.blueComponent, otherColor.blueComponent),
			combiner(this.alphaComponent, otherColor.alphaComponent),
		);
	}
	public divideByScalar(scalar: number): ContinuousWithAlphaColorBuilder {
		return this.map((component) => {
			return component / scalar;
		});
	}
	public readonly greenComponent: ContinuousColorComponent;
	public map(
		mapper: (
			component: ContinuousColorBuilderComponent,
		) => ContinuousColorBuilderComponent,
	): ContinuousWithAlphaColorBuilder {
		return new ContinuousWithAlphaColorBuilder(
			mapper(this.redComponent),
			mapper(this.greenComponent),
			mapper(this.blueComponent),
			mapper(this.alphaComponent),
		);
	}
	public multiplyByColorComponentWise(
		color: ContinuousWithAlphaColor,
	): ContinuousWithAlphaColorBuilder {
		return this.combineWithColorComponentWise(
			color,
			(colorComponentFromThis, colorComponentFromOther) => {
				return colorComponentFromThis * colorComponentFromOther;
			},
		);
	}
	public multiplyByScalar(scalar: number): ContinuousWithAlphaColorBuilder {
		return this.map((component) => {
			return component * scalar;
		});
	}
	public readonly redComponent: ContinuousColorComponent;
	public round(): ContinuousWithAlphaColorBuilder {
		return this.map((component) => {
			return Math.round(component);
		});
	}
	public subtractColor(
		color: ContinuousWithAlphaColor,
	): ContinuousWithAlphaColorBuilder {
		return this.combineWithColorComponentWise(
			color,
			(colorComponentFromThis, colorComponentFromOther) => {
				return colorComponentFromThis - colorComponentFromOther;
			},
		);
	}
}
