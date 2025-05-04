import type {ColorComponentValue} from "../color-component-value/ColorComponentValue.ts";
export type RgbColor = Readonly<{
	red: ColorComponentValue;
	green: ColorComponentValue;
	blue: ColorComponentValue;
}>;
