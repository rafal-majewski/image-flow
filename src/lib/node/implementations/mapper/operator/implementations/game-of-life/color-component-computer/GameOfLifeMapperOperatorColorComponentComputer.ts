import type {ContinuousColorComponent} from "../../../../../../operating/color/ContinuousColorComponent.ts";
export abstract class GameOfLifeMappingOperatorColorComponentComputer {
	public constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
	abstract compute(
		selfCount: number,
		neighborCount: number,
	): ContinuousColorComponent;
	public readonly id: string;
	public readonly name: string;
}
