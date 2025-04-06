import type {ColorComponentValue} from "../color-component-value/ColorComponentValue.ts";
export type Color = Readonly<{
	red: ColorComponentValue;
	green: ColorComponentValue;
	blue: ColorComponentValue;
	alpha: ColorComponentValue;
}>;
