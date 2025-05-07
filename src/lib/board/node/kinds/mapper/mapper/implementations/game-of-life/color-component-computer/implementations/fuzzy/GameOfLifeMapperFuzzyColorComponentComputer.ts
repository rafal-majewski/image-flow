import type {ColorComponentValue} from "../../../../../../../../../../color-component-value/ColorComponentValue.ts";
import {GameOfLifeMapperColorComponentComputer} from "../../GameOfLifeMapperColorComponentComputer.ts";
export class GameOfLifeMapperFuzzyColorComponentComputer extends GameOfLifeMapperColorComponentComputer {
	public constructor() {
		super("fuzzy", "Fuzzy");
	}
	public compute(neighborCount: number): ColorComponentValue {
		return (1 - Math.min(1 * Math.abs(neighborCount - 2.5), 1)) * 255;
	}
}
