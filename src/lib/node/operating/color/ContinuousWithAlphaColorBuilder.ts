import type {ContinuousColorBuilderComponent} from "./ContinuousColorBuilderComponent.ts";
import type {ContinuousColorComponent} from "./ContinuousColorComponent.ts";
import {ContinuousWithAlphaColor} from "./ContinuousWithAlphaColor.ts";
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
	public addColor(
		color: ContinuousWithAlphaColor,
	): ContinuousWithAlphaColorBuilder {
		return new ContinuousWithAlphaColorBuilder(
			this.redComponent + color.redComponent,
			this.greenComponent + color.greenComponent,
			this.blueComponent + color.blueComponent,
			this.alphaComponent + color.alphaComponent,
		);
	}
	public readonly alphaComponent: ContinuousColorComponent;
	public readonly blueComponent: ContinuousColorComponent;
	public readonly greenComponent: ContinuousColorComponent;
	public readonly redComponent: ContinuousColorComponent;
	public subtractColor(
		color: ContinuousWithAlphaColor,
	): ContinuousWithAlphaColorBuilder {
		return new ContinuousWithAlphaColorBuilder(
			this.redComponent - color.redComponent,
			this.greenComponent - color.greenComponent,
			this.blueComponent - color.blueComponent,
			this.alphaComponent - color.alphaComponent,
		);
	}
	public divideByFactor(factor: number): ContinuousWithAlphaColorBuilder {
		return new ContinuousWithAlphaColorBuilder(
			this.redComponent / factor,
			this.greenComponent / factor,
			this.blueComponent / factor,
			this.alphaComponent / factor,
		);
	}
	public build(): ContinuousWithAlphaColor {
		return new ContinuousWithAlphaColor(
			sanitizeContinuousColorComponent(this.redComponent),
			sanitizeContinuousColorComponent(this.greenComponent),
			sanitizeContinuousColorComponent(this.blueComponent),
			sanitizeContinuousColorComponent(this.alphaComponent),
		);
	}
}
