import type {NoInputAndNoMapperMapperNodeState} from "./NoInputAndNoMapperMapperNodeState";
import type {NoInputMapperNodeState} from "./NoInputMapperNodeState";
import type {NoMapperMapperNodeState} from "./NoMapperMapperNodeState";
import type {WorkingMapperNodeState} from "./WorkingMapperNodeState";
export type SupportedMapperNodeState =
	| NoInputAndNoMapperMapperNodeState
	| NoInputMapperNodeState
	| NoMapperMapperNodeState
	| WorkingMapperNodeState;
