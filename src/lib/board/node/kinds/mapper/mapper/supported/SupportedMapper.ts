import type {AveragingBlurMapper} from "../implementations/averaging-blur/AveragingBlurMapper.ts";
import type {GameOfLifeMapper} from "../implementations/game-of-life/GameOfLifeMapper.ts";
import type {GrayscaleMapper} from "../implementations/grayscale/GrayscaleMapper.ts";
import type {NearestNeighborScalingMapper} from "../implementations/nearest-neighbor-scaling/NearestNeighborScalingMapper.ts";
export type SupportedMapper =
	| GrayscaleMapper
	| NearestNeighborScalingMapper
	| GameOfLifeMapper
	| AveragingBlurMapper;
