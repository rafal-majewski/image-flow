import type {NoInputAndNoMapperMapperNodeState} from "./NoInputAndNoMapperMapperNodeState";
import type {NoInputNodeState} from "./NoInputNodeState";
import type {NoMapperMapperNodeState} from "./NoMapperMapperNodeState";
import type {WorkingMapperNodeState} from "./WorkingMapperNodeState";
export type SupportedMapperNodeState =
	| NoInputAndNoMapperMapperNodeState
	| NoInputNodeState
	| NoMapperMapperNodeState
	| WorkingMapperNodeState;
