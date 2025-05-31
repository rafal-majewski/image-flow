import type {DiscreteColorComponent} from "../../../../../../../../color/discrete/component/DiscreteColorComponent.ts";
import {GameOfLifeMapperOperatorColorComponentComputer} from "../../GameOfLifeMapperOperatorColorComponentComputer.ts";
export class GameOfLifeMapperOperatorFuzzyColorComponentComputer extends GameOfLifeMapperOperatorColorComponentComputer {
	public constructor() {
		super("fuzzy", "Fuzzy");
	}
	public override compute(
		selfCount: number,
		neighborCount: number,
	): DiscreteColorComponent {
		if (neighborCount < 2 + (1 - selfCount)) {
			return 255 * Math.max(0, 1 - (2 + (1 - selfCount) - neighborCount));
		} else if (neighborCount <= 3) {
			return 255;
		} else {
			return 255 * Math.max(0, 1 - (neighborCount - 3));
		}
	}
}
