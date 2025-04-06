import type {NoInputAndNoMapperMapperNodeState} from "./state/kinds/no-input-and-no-mapper/NoInputAndNoMapperMapperNodeState.ts";
import type {NoInputMapperNodeState} from "./state/kinds/no-input/NoInputMapperNodeState.ts";
import type {NoMapperMapperNodeState} from "./state/kinds/no-mapper/NoMapperMapperNodeState.ts";
import type {WorkingMapperNodeState} from "./states/mapping-in-progress/MappingInProgressMapperNodeState.ts";
export type SupportedMapperNodeState =
	| NoInputAndNoMapperMapperNodeState
	| NoInputMapperNodeState
	| NoMapperMapperNodeState
	| WorkingMapperNodeState;
