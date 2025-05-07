import {AveragingBlurMapper} from "./mapper/implementations/averaging-blur/AveragingBlurMapper.ts";
import {GameOfLifeMapperClassicColorComponentComputer} from "./mapper/implementations/game-of-life/color-component-computer/implementations/classic/GameOfLifeMapperClassicColorComponentComputer.ts";
import {GameOfLifeMapper} from "./mapper/implementations/game-of-life/GameOfLifeMapper.ts";
import {GrayscaleMapper} from "./mapper/implementations/grayscale/GrayscaleMapper.ts";
import {NearestNeighborScalingMapper} from "./mapper/implementations/nearest-neighbor-scaling/NearestNeighborScalingMapper.ts";
export const supportedMappers = [
	new GrayscaleMapper(),
	new NearestNeighborScalingMapper({width: 300, height: 300}),
	new GameOfLifeMapper(
		new GameOfLifeMapperClassicColorComponentComputer(),
		0.5,
	),
	new AveragingBlurMapper(1, 10),
] as const;
