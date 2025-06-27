import type {ContinuousColorBuilderComponent} from "./ContinuousColorBuilderComponent.ts";
import type {ContinuousColorComponent} from "./ContinuousColorComponent.ts";
import type {ContinuousWithAlphaColor} from "./ContinuousWithAlphaColor.ts";
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
	public readonly alphaComponent: ContinuousColorComponent;
	public readonly blueComponent: ContinuousColorComponent;

	public readonly greenComponent: ContinuousColorComponent;

	public readonly redComponent: ContinuousColorComponent;
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
}
