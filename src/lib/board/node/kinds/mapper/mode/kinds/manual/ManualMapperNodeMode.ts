import type {MapperNodeMode} from "../../MapperNodeMode.ts";
export type ManualMapperNodeMode = MapperNodeMode<
	"manual",
	Readonly<{stepCount: number}>
>;
