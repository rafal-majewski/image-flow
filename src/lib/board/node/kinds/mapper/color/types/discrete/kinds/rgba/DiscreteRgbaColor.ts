import type {DiscreteColorComponent} from "../../component/DiscreteColorComponent.ts";
import type {DiscreteRgbColor} from "../rgb/DiscreteRgbColor.ts";
export type DiscreteRgbaColor = DiscreteRgbColor
	& Readonly<{alpha: DiscreteColorComponent}>;
