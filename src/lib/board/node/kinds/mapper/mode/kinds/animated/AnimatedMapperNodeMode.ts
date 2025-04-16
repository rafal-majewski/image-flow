import type {MapperNodeMode} from "../../MapperNodeMode.ts";
export type AnimatedMapperNodeMode = MapperNodeMode<
	"animated",
	Readonly<{
		intervalIntervalSeconds: number;
		intervalId: ReturnType<typeof setInterval>;
	}>
>;
