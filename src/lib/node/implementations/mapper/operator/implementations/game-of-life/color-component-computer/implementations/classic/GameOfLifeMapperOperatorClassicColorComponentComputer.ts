import type {ContinuousColorComponent} from "../../../../../../../../operating/color/ContinuousColorComponent.ts";
import {GameOfLifeMapperOperatorColorComponentComputer} from "../../GameOfLifeMapperOperatorColorComponentComputer.ts";
export class GameOfLifeMapperOperatorClassicColorComponentComputer extends GameOfLifeMapperOperatorColorComponentComputer {
	public constructor() {
		super("classic", "Classic");
	}
	public override compute(
		selfCount: number,
		neighborCount: number,
	): ContinuousColorComponent {
		if (neighborCount < 2 + (1 - selfCount)) {
			return 0;
		} else if (neighborCount <= 3) {
			return 1;
		} else {
			return 0;
		}
	}
}
