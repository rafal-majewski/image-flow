import type {ColorComponentValue} from "../../../../../../../../../../color-component-value/ColorComponentValue.ts";
import {GameOfLifeMapperComponentComputer} from "../../GameOfLifeMapperComponentComputer.ts";
export class GameOfLifeMapperFuzzyComponentComputer extends GameOfLifeMapperComponentComputer {
	public constructor() {
		super("fuzzy", "Fuzzy");
	}
	public compute(neighborCount: number): ColorComponentValue {
		return (1 - Math.min(1 * Math.abs(neighborCount - 2.5), 1)) * 255;
	}
}
