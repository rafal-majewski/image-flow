import type {ColorComponentValue} from "./ColorComponentValue";
export type Color = Readonly<{
	red: ColorComponentValue;
	green: ColorComponentValue;
	blue: ColorComponentValue;
	alpha: ColorComponentValue;
}>;
