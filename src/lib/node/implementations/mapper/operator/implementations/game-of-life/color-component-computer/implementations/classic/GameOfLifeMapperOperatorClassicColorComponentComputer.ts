import type {DiscreteColorComponent} from "../../../../../../../../with-state/implementations/operatable/color/DiscreteColorComponent.ts";
import {GameOfLifeMappingOperatorColorComponentComputer} from "../../GameOfLifeMapperOperatorColorComponentComputer.ts";
export class GameOfLifeMappingOperatorClassicColorComponentComputer extends GameOfLifeMappingOperatorColorComponentComputer {
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
