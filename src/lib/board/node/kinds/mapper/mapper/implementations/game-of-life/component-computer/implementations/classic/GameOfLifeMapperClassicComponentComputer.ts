import type {ColorComponentValue} from "../../../../../../../../../../color-component-value/ColorComponentValue.ts";
import {GameOfLifeMapperComponentComputer} from "../../GameOfLifeMapperComponentComputer.ts";
export class GameOfLifeMapperClassicComponentComputer extends GameOfLifeMapperComponentComputer {
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
