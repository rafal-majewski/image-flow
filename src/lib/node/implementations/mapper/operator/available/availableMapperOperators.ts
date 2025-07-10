import {Coordinates} from "../../../../../coordinates/Coordinates.ts";
import {Dimensions} from "../../../../../dimensions/Dimensions.ts";
import {ContinuousWithoutAlphaColor} from "../../../../operating/color/ContinuousWithoutAlphaColor.ts";
import {ConvolutionOrCorrelationMapperOperator} from "../implementations/convolution-or-correlation/ConvolutionOrCorrelationMapperOperator.ts";
import {ForwardDiscreteFourierTransformMapperOperator} from "../implementations/forward-discrete-fourier-transform/ForwardDiscreteFourierTransformMapperOperator.ts";
import {ForwardThenInverseDiscreteFourierTransformMapperOperator} from "../implementations/forward-then-inverse-discrete-fourier-transform/ForwardThenInverseDiscreteFourierTransformMapperOperator.ts";
import {GameOfLifeMapperOperatorClassicColorComponentComputer} from "../implementations/game-of-life/color-component-computer/implementations/classic/GameOfLifeMapperOperatorClassicColorComponentComputer.ts";
import {GameOfLifeMapperOperator} from "../implementations/game-of-life/GameOfLifeMapperOperator.ts";
import {GrayscalingMapperOperator} from "../implementations/grayscaling/GrayscalingMapperOperator.ts";
import {NearestNeighborScalingMapperOperator} from "../implementations/nearest-neighbor-scaling/NearestNeighborScalingMapperOperator.ts";
import {SaltAndPepperMapperOperator} from "../implementations/salt-and-pepper/SaltAndPepperMapperOperator.ts";
import {ErosionMapperOperator} from "../implementations/erosion/ErosionMapperOperator.ts";
import {PointillizingMapperOperator} from "../implementations/pointillizing/PointillizingMapperOperator.ts";
import {RadialNeighborhoodMapperOperator} from "../implementations/radial-neighborhood/RadialNeighborhoodMapperOperator.ts";
import {ColorReductionMapperOperator} from "../implementations/color-reduction/ColorReductionMapperOperator.ts";
import {correlationRotationApplier} from "../implementations/convolution-or-correlation/rotation-applier/implementations/correlation/instance/correlationRotationApplier.ts";
import {emptyErosionMapperOperatorKernel} from "../implementations/erosion/kernel/empty-instance/emptyErosionMapperOperatorKernel.ts";
import {ErrorDiffusionDitheringMapperOperator} from "../implementations/error-diffusion-dithering/ErrorDiffusionDitheringMapperOperator.ts";
import {emptyErrorDiffusionDitheringMapperOperatorKernel} from "../implementations/error-diffusion-dithering/kernel/empty-instance/emptyErrorDiffusionDitheringMapperOperatorKernel.ts";
import {ConvolutionOrCorrelationMapperOperatorKernel} from "../implementations/convolution-or-correlation/kernel/ConvolutionOrCorrelationMapperOperatorKernel.ts";
import {emptyConvolutionOrCorrelationMapperOperatorKernel} from "../implementations/convolution-or-correlation/kernel/empty-instance/emptyConvolutionOrCorrelationMapperOperatorKernel.ts";
export const availableMapperOperators = [
	new ColorReductionMapperOperator(2, 2, 2, 2),
	new ConvolutionOrCorrelationMapperOperator(
		emptyConvolutionOrCorrelationMapperOperatorKernel,
		correlationRotationApplier,
	),
	new ErosionMapperOperator("sum", emptyErosionMapperOperatorKernel),
	new ErrorDiffusionDitheringMapperOperator(
		"computeErrorContinuouslyAndSumContinuouslyWithoutClamping",
		emptyErrorDiffusionDitheringMapperOperatorKernel,
	),
	new ForwardDiscreteFourierTransformMapperOperator(
		new Dimensions(31, 31),
		-1,
		31,
		0,
		31,
		0,
		"magnitude",
		0,
		1,
	),
	new ForwardThenInverseDiscreteFourierTransformMapperOperator(
		new Dimensions(31, 31),
		new Dimensions(31, 31),
		31,
		0,
		31,
		0,
		0,
		1,
	),
	new GameOfLifeMapperOperator(
		new GameOfLifeMapperOperatorClassicColorComponentComputer(),
		0.5,
	),
	new GrayscalingMapperOperator(
		new ContinuousWithoutAlphaColor(0.21, 0.72, 0.07),
	),
	new NearestNeighborScalingMapperOperator(new Dimensions(300, 300)),
	new PointillizingMapperOperator(0.9, 100),
	new RadialNeighborhoodMapperOperator(5, "none", 1),
	new SaltAndPepperMapperOperator(1234, 0.05, 0.5),
] as const;
