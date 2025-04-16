import type {AnimatedMapperNodeMode} from "./kinds/animated/AnimatedMapperNodeMode.ts";
import type {InstantMapperNodeMode} from "./kinds/instant/InstantMapperNodeMode.ts";
import type {ManualMapperNodeMode} from "./kinds/manual/ManualMapperNodeMode.ts";
export type SupportedMapperNodeMode =
	| AnimatedMapperNodeMode
	| InstantMapperNodeMode
	| ManualMapperNodeMode;
