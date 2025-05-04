import type {ColorComponentValue} from "../color-component-value/ColorComponentValue.ts";
import type {RgbColor} from "./RgbColor.ts";
export type RgbaColor = RgbColor & Readonly<{alpha: ColorComponentValue}>;
