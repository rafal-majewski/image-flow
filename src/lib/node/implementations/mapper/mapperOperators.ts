import {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Dimensions} from "../../../dimensions/Dimensions.ts";
import {ContinuousWithoutAlphaColor} from "../../operating/color/ContinuousWithoutAlphaColor.ts";
import {AverageBlurringMapperOperator} from "./operator/implementations/average-blurring/AverageBlurringMapperOperator.ts";
import {ConvolutingOrCorrelatingMapperOperator} from "./operator/implementations/convoluting-or-correlating/ConvolutingOrCorrelatingMapperOperator.ts";
import {Kernel} from "./operator/implementations/convoluting-or-correlating/kernel/Kernel.ts";
import {correlatingRotationApplier} from "./operator/implementations/convoluting-or-correlating/rotation-applier/implementations/correlating/instance/correlatingRotationApplier.ts";
import {DiscreteFourierTransformMapperOperator} from "./operator/implementations/discrete-fourier-transform/DiscreteFourierTransformMapperOperator.ts";
import {GameOfLifeMapperOperatorClassicColorComponentComputer} from "./operator/implementations/game-of-life/color-component-computer/implementations/classic/GameOfLifeMapperOperatorClassicColorComponentComputer.ts";
import {GameOfLifeMapperOperator} from "./operator/implementations/game-of-life/GameOfLifeMapperOperator.ts";
import {GrayscalingMapperOperator} from "./operator/implementations/grayscaling/GrayscalingMapperOperator.ts";
import {NearestNeighborScalingMapperOperator} from "./operator/implementations/nearest-neighbor-scaling/NearestNeighborScalingMapperOperator.ts";
export const mapperOperators = [
	new GrayscalingMapperOperator(
		new ContinuousWithoutAlphaColor(0.21, 0.72, 0.07),
	),
	new NearestNeighborScalingMapperOperator(new Dimensions(300, 300)),
	new DiscreteFourierTransformMapperOperator(
		new Dimensions(31, 31),
		-1,
		1 / 31,
		0,
		1 / 31,
		0,
		"magnitude",
	),
	new GameOfLifeMapperOperator(
		new GameOfLifeMapperOperatorClassicColorComponentComputer(),
		0.5,
	),
	new AverageBlurringMapperOperator(1, 10),
	new ConvolutingOrCorrelatingMapperOperator(
		new Kernel(new Coordinates(0, 0), [[1]]),
		correlatingRotationApplier,
	),
] as const;
