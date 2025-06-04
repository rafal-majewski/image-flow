import type {DiscreteColorComponent} from "../../../../../../color/discrete/component/DiscreteColorComponent.ts";
export abstract class GameOfLifeMapperOperatorColorComponentComputer {
	public constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
	abstract compute(
		selfCount: number,
		neighborCount: number,
	): DiscreteColorComponent;
	public readonly id: string;
	public readonly name: string;
}
