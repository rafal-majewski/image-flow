import {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Dimensions} from "../../../dimensions/Dimensions.ts";
import {ContinuousWithoutAlphaColor} from "../../operating/color/ContinuousWithoutAlphaColor.ts";
import {AverageBlurringMappingOperator} from "./operator/implementations/average-blurring/AverageBlurringMapperOperator.ts";
import {ConvolutingOrCorrelatingMappingOperator} from "./operator/implementations/convoluting-or-correlating/ConvolutingOrCorrelatingMapperOperator.ts";
import {correlatingRotationApplier} from "./operator/implementations/convoluting-or-correlating/rotation-applier/implementations/correlating/instance/correlatingRotationApplier.ts";
import {GameOfLifeMappingOperatorClassicColorComponentComputer} from "./operator/implementations/game-of-life/color-component-computer/implementations/classic/GameOfLifeMapperOperatorClassicColorComponentComputer.ts";
import {GameOfLifeMappingOperator} from "./operator/implementations/game-of-life/GameOfLifeMapperOperator.ts";
import {GrayscalingMappingOperator} from "./operator/implementations/grayscaling/GrayscalingMapperOperator.ts";
import {NearestNeighborScalingMappingOperator} from "./operator/implementations/nearest-neighbor-scaling/NearestNeighborScalingMapperOperator.ts";
export const mapperOperators = [
	new GrayscalingMappingOperator(
		new ContinuousWithoutAlphaColor(0.21, 0.72, 0.07),
	),
	new NearestNeighborScalingMappingOperator(new Dimensions(300, 300)),
	new GameOfLifeMappingOperator(
		new GameOfLifeMappingOperatorClassicColorComponentComputer(),
		0.5,
	),
	new AverageBlurringMappingOperator(1, 10),
	new ConvolutingOrCorrelatingMappingOperator(
		new Coordinates(0, 0),
		[[1]],
		correlatingRotationApplier,
	),
] as const;
