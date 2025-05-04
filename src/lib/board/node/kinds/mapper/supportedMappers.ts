import {ClassicGameOfLifeMapper} from "./mapper/implementations/classic-game-of-life/ClassicGameOfLifeMapper.ts";
import {FuzzyGameOfLifeMapper} from "./mapper/implementations/fuzzy-game-of-life/FuzzyGameOfLifeMapper.ts";
import {GrayscaleMapper} from "./mapper/implementations/grayscale/GrayscaleMapper.ts";
import {NearestNeighborScalingMapper} from "./mapper/implementations/nearest-neighbor-scaling/NearestNeighborScalingMapper.ts";
export const supportedMappers = [
	new GrayscaleMapper(),
	new NearestNeighborScalingMapper({width: 300, height: 300}),
	new ClassicGameOfLifeMapper(0.5),
	new FuzzyGameOfLifeMapper(0.5),
] as const;
