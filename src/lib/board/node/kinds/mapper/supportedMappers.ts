import {GameOfLifeMapperClassicComponentComputer} from "./mapper/implementations/game-of-life/component-computer/implementations/classic/GameOfLifeMapperClassicComponentComputer.ts";
import {GameOfLifeMapper} from "./mapper/implementations/game-of-life/GameOfLifeMapper.ts";
import {GrayscaleMapper} from "./mapper/implementations/grayscale/GrayscaleMapper.ts";
import {NearestNeighborScalingMapper} from "./mapper/implementations/nearest-neighbor-scaling/NearestNeighborScalingMapper.ts";
export const supportedMappers = [
	new GrayscaleMapper(),
	new NearestNeighborScalingMapper({width: 300, height: 300}),
	new GameOfLifeMapper(new GameOfLifeMapperClassicComponentComputer(), 0.5),
] as const;
