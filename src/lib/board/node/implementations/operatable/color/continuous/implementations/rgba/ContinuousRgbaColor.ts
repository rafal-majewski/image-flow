import type {ContinuousColorComponent} from "../../component/ContinuousColorComponent.ts";
import type {ContinuousRgbColor} from "../rgb/ContinuousRgbColor.ts";
export type ContinuousRgbaColor = ContinuousRgbColor
	& Readonly<{alpha: ContinuousColorComponent}>;
