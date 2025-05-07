import type {ColorComponentValue} from "../../../../../../../../color-component-value/ColorComponentValue.ts";
export abstract class GameOfLifeMapperColorComponentComputer {
	public readonly id: string;
	protected constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
	public readonly name: string;
	public abstract compute(neighborCount: number): ColorComponentValue;
}
