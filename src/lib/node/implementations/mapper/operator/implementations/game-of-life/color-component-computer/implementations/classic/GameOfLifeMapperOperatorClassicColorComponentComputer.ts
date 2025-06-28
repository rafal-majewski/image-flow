import type {DiscreteColorComponent} from "../../../../../../../../with-state/implementations/operatable/color/DiscreteColorComponent.ts";
import {GameOfLifeMapperOperatorColorComponentComputer} from "../../GameOfLifeMapperOperatorColorComponentComputer.ts";
export class GameOfLifeMapperOperatorClassicColorComponentComputer extends GameOfLifeMapperOperatorColorComponentComputer {
	public constructor() {
		super("classic", "Classic");
	}
	public override compute(
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
