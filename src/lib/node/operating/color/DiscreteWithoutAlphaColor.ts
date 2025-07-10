import {ContinuousWithoutAlphaColor} from "./ContinuousWithoutAlphaColor.ts";
import {convertDiscreteColorComponentToContinuousColorComponent} from "./convertDiscreteColorComponentToContinuousColorComponent.ts";
import type {DiscreteColorComponent} from "./DiscreteColorComponent.ts";
import {DiscreteWithAlphaColor} from "./DiscreteWithAlphaColor.ts";
import {sanitizeDiscreteColorComponent} from "./sanitizeDiscreteColorComponent.ts";
export class DiscreteWithoutAlphaColor {
	public constructor(
		redComponent: DiscreteColorComponent,
		greenComponent: DiscreteColorComponent,
		blueComponent: DiscreteColorComponent,
	) {
		this.redComponent = redComponent;
		this.greenComponent = greenComponent;
		this.blueComponent = blueComponent;
	}
	public add(color: DiscreteWithoutAlphaColor): DiscreteWithoutAlphaColor {
		return new DiscreteWithoutAlphaColor(
			sanitizeDiscreteColorComponent(this.redComponent + color.redComponent),
			sanitizeDiscreteColorComponent(
				this.greenComponent + color.greenComponent,
			),
			sanitizeDiscreteColorComponent(this.blueComponent + color.blueComponent),
		);
	}
	public readonly blueComponent: DiscreteColorComponent;
	public convertToContinuous(): ContinuousWithoutAlphaColor {
		return new ContinuousWithoutAlphaColor(
			convertDiscreteColorComponentToContinuousColorComponent(
				this.redComponent,
			),
			convertDiscreteColorComponentToContinuousColorComponent(
				this.greenComponent,
			),
			convertDiscreteColorComponentToContinuousColorComponent(
				this.blueComponent,
			),
		);
	}
	public readonly greenComponent: DiscreteColorComponent;
	public readonly redComponent: DiscreteColorComponent;
	public subtract(color: DiscreteWithoutAlphaColor): DiscreteWithoutAlphaColor {
		return new DiscreteWithoutAlphaColor(
			sanitizeDiscreteColorComponent(this.redComponent - color.redComponent),
			sanitizeDiscreteColorComponent(
				this.greenComponent - color.greenComponent,
			),
			sanitizeDiscreteColorComponent(this.blueComponent - color.blueComponent),
		);
	}
	public withAlphaComponent(alphaComponent: number): DiscreteWithAlphaColor {
		return new DiscreteWithAlphaColor(
			this.redComponent,
			this.greenComponent,
			this.blueComponent,
			alphaComponent,
		);
	}
}
