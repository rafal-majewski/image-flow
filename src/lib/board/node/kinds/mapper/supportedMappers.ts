import {GrayscaleMapper} from "./mapper/implementations/grayscale/GrayscaleMapper.ts";
import {NearestNeighborScalingMapper} from "./mapper/implementations/nearest-neighbor-scaling/NearestNeighborScalingMapper.ts";
export const supportedMappers = [
	new GrayscaleMapper(),
	new NearestNeighborScalingMapper({width: 300, height: 300}),
] as const;
