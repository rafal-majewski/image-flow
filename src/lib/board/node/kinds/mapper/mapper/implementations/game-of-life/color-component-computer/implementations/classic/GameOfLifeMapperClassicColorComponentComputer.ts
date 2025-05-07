import type {ColorComponentValue} from "../../../../../../../../../../color-component-value/ColorComponentValue.ts";
import {GameOfLifeMapperColorComponentComputer} from "../../GameOfLifeMapperColorComponentComputer.ts";
export class GameOfLifeMapperClassicColorComponentComputer extends GameOfLifeMapperColorComponentComputer {
	public constructor() {
		super("classic", "Classic");
	}
	public compute(neighborCount: number): ColorComponentValue {
		if (neighborCount < 2 || neighborCount > 3) {
			return 0;
		} else {
			return 255;
		}
	}
}
