import type {DiscreteColorComponent} from "../../../../../../color/types/discrete/component/DiscreteColorComponent.ts";
import {GameOfLifeMapperColorComponentComputer} from "../../GameOfLifeMapperColorComponentComputer.ts";
export class GameOfLifeMapperClassicColorComponentComputer extends GameOfLifeMapperColorComponentComputer {
	public constructor() {
		super("classic", "Classic");
	}
	public compute(
		selfCount: number,
		neighborCount: number,
	): DiscreteColorComponent {
		if (neighborCount < 2 + (1 - selfCount)) {
			return 0;
		} else if (neighborCount <= 3) {
			return 255;
		} else {
			return 0;
		}
	}
}
