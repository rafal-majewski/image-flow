import {AverageBlurringMapper} from "./mapper/implementations/average-blurring/AverageBlurringMapper.ts";
import {ConvolutingMapper} from "./mapper/implementations/convoluting/ConvolutingMapper.ts";
import {GameOfLifeMapperClassicColorComponentComputer} from "./mapper/implementations/game-of-life/color-component-computer/implementations/classic/GameOfLifeMapperClassicColorComponentComputer.ts";
import {GameOfLifeMapper} from "./mapper/implementations/game-of-life/GameOfLifeMapper.ts";
import {GrayscalingMapper} from "./mapper/implementations/grayscaling/GrayscalingMapper.ts";
import {NearestNeighborScalingMapper} from "./mapper/implementations/nearest-neighbor-scaling/NearestNeighborScalingMapper.ts";
export const supportedMappers = [
	new GrayscalingMapper({red: 0.21, green: 0.72, blue: 0.07}),
	new NearestNeighborScalingMapper({width: 300, height: 300}),
	new GameOfLifeMapper(
		new GameOfLifeMapperClassicColorComponentComputer(),
		0.5,
	),
	new AverageBlurringMapper(1, 10),
	new ConvolutingMapper({x: 0, y: 0}, [[1, -1]]),
] as const;
