import type {ContinuousColorComponent} from "../../../../../../../../operating/color/ContinuousColorComponent.ts";
import {GameOfLifeMappingOperatorColorComponentComputer} from "../../GameOfLifeMapperOperatorColorComponentComputer.ts";
export class GameOfLifeMappingOperatorFuzzyColorComponentComputer extends GameOfLifeMappingOperatorColorComponentComputer {
	public constructor() {
		super("fuzzy", "Fuzzy");
	}
	public override compute(
		selfCount: number,
		neighborCount: number,
	): ContinuousColorComponent {
		if (neighborCount < 2 + (1 - selfCount)) {
			return Math.max(0, 1 - (2 + (1 - selfCount) - neighborCount));
		} else if (neighborCount <= 3) {
			return 1;
		} else {
			return Math.max(0, 1 - (neighborCount - 3));
		}
	}
}
