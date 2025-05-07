import type {ColorComponent} from "../../../../../../color/types/discrete/component/DiscreteColorComponent.ts";
import {GameOfLifeMapperColorComponentComputer} from "../../GameOfLifeMapperColorComponentComputer.ts";
export class GameOfLifeMapperClassicColorComponentComputer extends GameOfLifeMapperColorComponentComputer {
	public constructor() {
		super("classic", "Classic");
	}
	public compute(neighborCount: number): ColorComponent {
		if (neighborCount < 2 || neighborCount > 3) {
			return 0;
		} else {
			return 255;
		}
	}
}
