import {AverageBlurringMapperOperator} from "./operator/implementations/average-blurring/AverageBlurringMapperOperator.ts";
import {ConvolutingOrCorrelatingMapperOperator} from "./operator/implementations/convoluting-or-correlating/ConvolutingOrCorrelatingMapperOperator.ts";
import {correlatingRotationApplier} from "./operator/implementations/convoluting-or-correlating/rotation-applier/implementations/correlating/instance/correlatingRotationApplier.ts";
import {GameOfLifeMapperOperatorClassicColorComponentComputer} from "./operator/implementations/game-of-life/color-component-computer/implementations/classic/GameOfLifeMapperOperatorClassicColorComponentComputer.ts";
import {GameOfLifeMapperOperator} from "./operator/implementations/game-of-life/GameOfLifeMapperOperator.ts";
import {GrayscalingMapperOperator} from "./operator/implementations/grayscaling/GrayscalingMapperOperator.ts";
import {NearestNeighborScalingMapperOperator} from "./operator/implementations/nearest-neighbor-scaling/NearestNeighborScalingMapperOperator.ts";
import {DitheringMapperOperator} from "./operator/implementations/dithering/DitheringMapperOperator.ts";
export const mapperOperators = [
	new GrayscalingMapperOperator({red: 0.21, green: 0.72, blue: 0.07}),
	new NearestNeighborScalingMapperOperator({width: 300, height: 300}),
	new GameOfLifeMapperOperator(
		new GameOfLifeMapperOperatorClassicColorComponentComputer(),
		0.5,
	),
	new AverageBlurringMapperOperator(1, 10),
	new ConvolutingOrCorrelatingMapperOperator(
		{x: 0, y: 0},
		[[1]],
		correlatingRotationApplier,
	),
	new DitheringMapperOperator(),
] as const;
