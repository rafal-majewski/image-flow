import {ContinuousWithAlphaColor} from "./continuous-with-alpha/ContinuousWithAlphaColor.ts";
import {convertDiscreteColorComponentToContinuousColorComponent} from "./convertDiscreteColorComponentToContinuousColorComponent.ts";
import type {DiscreteColorComponent} from "./DiscreteColorComponent.ts";
import {DiscreteWithoutAlphaColor} from "./DiscreteWithoutAlphaColor.ts";
import {sanitizeDiscreteColorComponent} from "./sanitizeDiscreteColorComponent.ts";
export class DiscreteWithAlphaColor {
	public constructor(
		redComponent: DiscreteColorComponent,
		greenComponent: DiscreteColorComponent,
		blueComponent: DiscreteColorComponent,
		alphaComponent: DiscreteColorComponent,
	) {
		this.redComponent = redComponent;
		this.greenComponent = greenComponent;
		this.blueComponent = blueComponent;
		this.alphaComponent = alphaComponent;
	}
	public add(color: DiscreteWithAlphaColor): DiscreteWithAlphaColor {
		return new DiscreteWithAlphaColor(
			sanitizeDiscreteColorComponent(this.redComponent + color.redComponent),
			sanitizeDiscreteColorComponent(
				this.greenComponent + color.greenComponent,
			),
			sanitizeDiscreteColorComponent(this.blueComponent + color.blueComponent),
			sanitizeDiscreteColorComponent(
				this.alphaComponent + color.alphaComponent,
			),
		);
	}
	public readonly alphaComponent: DiscreteColorComponent;
	public readonly blueComponent: DiscreteColorComponent;
	public convertToContinuous(): ContinuousWithAlphaColor {
		return new ContinuousWithAlphaColor(
			convertDiscreteColorComponentToContinuousColorComponent(
				this.redComponent,
			),
			convertDiscreteColorComponentToContinuousColorComponent(
				this.greenComponent,
			),
			convertDiscreteColorComponentToContinuousColorComponent(
				this.blueComponent,
			),
			convertDiscreteColorComponentToContinuousColorComponent(
				this.alphaComponent,
			),
		);
	}
	public deleteAlphaComponent(): DiscreteWithoutAlphaColor {
		return new DiscreteWithoutAlphaColor(
			this.redComponent,
			this.greenComponent,
			this.blueComponent,
		);
	}
	public readonly greenComponent: DiscreteColorComponent;
	public readonly redComponent: DiscreteColorComponent;
	public subtract(color: DiscreteWithAlphaColor): DiscreteWithAlphaColor {
		return new DiscreteWithAlphaColor(
			sanitizeDiscreteColorComponent(this.redComponent - color.redComponent),
			sanitizeDiscreteColorComponent(
				this.greenComponent - color.greenComponent,
			),
			sanitizeDiscreteColorComponent(this.blueComponent - color.blueComponent),
			sanitizeDiscreteColorComponent(
				this.alphaComponent - color.alphaComponent,
			),
		);
	}
}
