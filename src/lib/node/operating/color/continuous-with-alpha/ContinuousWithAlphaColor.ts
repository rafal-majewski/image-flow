import type {ContinuousWithAlphaColorComponentsSum} from "./components-sum/ContinuousWithAlphaColorComponentsSum.ts";
import type {ContinuousColorComponent} from "../ContinuousColorComponent.ts";
import {ContinuousWithAlphaColorBuilder} from "../ContinuousWithAlphaColorBuilder.ts";
import {ContinuousWithoutAlphaColor} from "../ContinuousWithoutAlphaColor.ts";
import {convertContinuousColorComponentToDiscreteColorComponent} from "../convertContinuousColorComponentToDiscreteColorComponent.ts";
import {DiscreteWithAlphaColor} from "../DiscreteWithAlphaColor.ts";
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
	public addColor(color: ContinuousWithAlphaColor): ContinuousWithAlphaColor {
		return this.convertToBuilder().addColor(color).build();
	}
	public readonly alphaComponent: ContinuousColorComponent;
	public readonly blueComponent: ContinuousColorComponent;
	public combineWithColor(
		combiner: (
			componentFromThisColor: ContinuousColorComponent,
			componentFromOtherColor: ContinuousColorComponent,
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
	public computeComponentsSum(): ContinuousWithAlphaColorComponentsSum {
		return (
			this.redComponent
			+ this.greenComponent
			+ this.blueComponent
			+ this.alphaComponent
		);
	}
	public convertToBuilder(): ContinuousWithAlphaColorBuilder {
		return new ContinuousWithAlphaColorBuilder(
			this.redComponent,
			this.greenComponent,
			this.blueComponent,
			this.alphaComponent,
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
	public deleteAlphaComponent(): ContinuousWithoutAlphaColor {
		return new ContinuousWithoutAlphaColor(
			this.redComponent,
			this.greenComponent,
			this.blueComponent,
		);
	}
	public divideByScalar(scalar: number): ContinuousWithAlphaColor {
		return this.convertToBuilder().divideByScalar(scalar).build();
	}
	public readonly greenComponent: ContinuousColorComponent;
	public map(
		mapper: (component: ContinuousColorComponent) => ContinuousColorComponent,
	): ContinuousWithAlphaColor {
		return new ContinuousWithAlphaColor(
			mapper(this.redComponent),
			mapper(this.greenComponent),
			mapper(this.blueComponent),
			mapper(this.alphaComponent),
		);
	}
	public mixWithColor(
		weightOfOtherColor: ContinuousColorComponent,
		otherColor: ContinuousWithAlphaColor,
	): ContinuousWithAlphaColor {
		return this.combineWithColor(
			(colorComponentFromThisColor, colorComponentFromOtherColor) => {
				return (
					colorComponentFromThisColor * (1 - weightOfOtherColor)
					+ colorComponentFromOtherColor * weightOfOtherColor
				);
			},
			otherColor,
		);
	}
	public multiplyByColorComponentWise(
		color: ContinuousWithAlphaColor,
	): ContinuousWithAlphaColor {
		return this.convertToBuilder().multiplyByColorComponentWise(color).build();
	}
	public multiplyByScalar(scalar: number): ContinuousWithAlphaColor {
		return this.convertToBuilder().multiplyByScalar(scalar).build();
	}
	public readonly redComponent: ContinuousColorComponent;
	public replaceAlphaComponent(
		newAlphaComponent: ContinuousColorComponent,
	): ContinuousWithAlphaColor {
		return new ContinuousWithAlphaColor(
			this.redComponent,
			this.greenComponent,
			this.blueComponent,
			newAlphaComponent,
		);
	}
	public replaceBlueComponent(
		newBlueComponent: ContinuousColorComponent,
	): ContinuousWithAlphaColor {
		return new ContinuousWithAlphaColor(
			this.redComponent,
			this.greenComponent,
			newBlueComponent,
			this.alphaComponent,
		);
	}
	public replaceGreenComponent(
		newGreenComponent: ContinuousColorComponent,
	): ContinuousWithAlphaColor {
		return new ContinuousWithAlphaColor(
			this.redComponent,
			newGreenComponent,
			this.blueComponent,
			this.alphaComponent,
		);
	}
	public replaceRedComponent(
		newRedComponent: ContinuousColorComponent,
	): ContinuousWithAlphaColor {
		return new ContinuousWithAlphaColor(
			newRedComponent,
			this.greenComponent,
			this.blueComponent,
			this.alphaComponent,
		);
	}
	public round(): ContinuousWithAlphaColor {
		return this.map((component) => {
			return Math.round(component);
		});
	}
	public subtract(color: ContinuousWithAlphaColor): ContinuousWithAlphaColor {
		return this.convertToBuilder().subtractColor(color).build();
	}
}
