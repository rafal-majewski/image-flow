import type {DiscreteColorComponent} from "../../../../color/types/discrete/component/DiscreteColorComponent.ts";
export abstract class GameOfLifeMapperColorComponentComputer {
	public readonly id: string;
	protected constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
	public readonly name: string;
	public abstract compute(
		selfCount: number,
		neighborCount: number,
	): DiscreteColorComponent;
}
