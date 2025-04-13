import type {MappingInProgressMapperNodeState} from "./kinds/mapping-in-progress/MappingInProgressMapperNodeState.ts";
import type {MappingSucceededMapperNodeState} from "./kinds/mapping-succeeded/MappingSucceededMapperNodeState.ts";
import type {NoInputImageAndNoMapperMapperNodeState} from "./kinds/no-input-image-and-no-mapper/NoInputImageAndNoMapperMapperNodeState.ts";
import type {NoInputImageMapperNodeState} from "./kinds/no-input-image/NoInputImageMapperNodeState.ts";
import type {NoInputNodeAndNoMapperMapperNodeState} from "./kinds/no-input-node-and-no-mapper/NoInputNodeAndNoMapperMapperNodeState.ts";
import type {NoInputNodeMapperNodeState} from "./kinds/no-input-node/NoInputNodeMapperNodeState.ts";
import type {NoMapperMapperNodeState} from "./kinds/no-mapper/NoMapperMapperNodeState.ts";
export type SupportedMapperNodeState =
	| MappingInProgressMapperNodeState
	| NoInputImageAndNoMapperMapperNodeState
	| NoMapperMapperNodeState
	| NoInputNodeMapperNodeState
	| NoInputImageMapperNodeState
	| NoInputNodeAndNoMapperMapperNodeState
	| MappingSucceededMapperNodeState;
