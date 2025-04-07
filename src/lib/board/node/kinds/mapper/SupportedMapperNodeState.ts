import type {MappingInProgressMapperNodeState} from "./state/kinds/mapping-in-progress/MappingInProgressMapperNodeState.svelte.ts";
import type {MappingSucceededMapperNodeState} from "./state/kinds/mapping-succeeded/MappingSucceededMapperNodeState.svelte.ts";
import type {NoInputAndNoMapperMapperNodeState} from "./state/kinds/no-input-and-no-mapper/NoInputAndNoMapperMapperNodeState.ts";
import type {NoInputMapperNodeState} from "./state/kinds/no-input/NoInputMapperNodeState.ts";
import type {NoMapperMapperNodeState} from "./state/kinds/no-mapper/NoMapperMapperNodeState.ts";
export type SupportedMapperNodeState =
	| NoInputAndNoMapperMapperNodeState
	| NoInputMapperNodeState
	| NoMapperMapperNodeState
	| MappingInProgressMapperNodeState
	| MappingSucceededMapperNodeState;
