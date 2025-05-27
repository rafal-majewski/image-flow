import type {DiscreteColorComponent} from "../../../../color/types/discrete/component/DiscreteColorComponent.ts";
export abstract class GameOfLifeMapperColorComponentComputer {
	protected constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
	public abstract compute(
		selfCount: number,
		neighborCount: number,
	): DiscreteColorComponent;
	public readonly id: string;
	public readonly name: string;
}
