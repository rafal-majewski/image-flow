import type {DiscreteColorComponent} from "../../../../../../color/types/discrete/component/DiscreteColorComponent.ts";
import {GameOfLifeMapperColorComponentComputer} from "../../GameOfLifeMapperColorComponentComputer.ts";
export class GameOfLifeMapperFuzzyColorComponentComputer extends GameOfLifeMapperColorComponentComputer {
	public constructor() {
		super("fuzzy", "Fuzzy");
	}
	public compute(neighborCount: number): DiscreteColorComponent {
		return Math.round(
			(1 - Math.min(1 * Math.abs(neighborCount - 2.5), 1)) * 255,
		);
	}
}
