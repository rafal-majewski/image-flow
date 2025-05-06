import type {ManualMappingInProgressMapperNodeState} from "../kinds/manual-mapping-in-progress/ManualMappingInProgressMapperNodeState.ts";
import type {ManualMappingSucceededMapperNodeState} from "../kinds/manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
import type {InstantNoInputNodeAndNoMapperMapperNodeState} from "../kinds/instant-no-input-node-and-no-mapper/InstantNoInputNodeAndNoMapperMapperNodeState.ts";
import type {InstantNoInputNodeMapperNodeState} from "../kinds/instant-no-input-node/InstantNoInputNodeMapperNodeState.ts";
import type {InstantNoMapperMapperNodeState} from "../kinds/instant-no-mapper/InstantNoMapperMapperNodeState.ts";
import type {InstantMappingSucceededMapperNodeState} from "../kinds/instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import type {InstantNoInputNodeImageAndNoMapperMapperNodeState} from "../kinds/instant-no-input-node-image-and-no-mapper/InstantNoInputNodeImageAndNoMapperMapperNodeState.ts";
import type {InstantNoInputNodeImageMapperNodeState} from "../kinds/instant-no-input-node-image/InstantNoInputNodeImageMapperNodeState.ts";
import type {ManualNoInputNodeAndNoMapperMapperNodeState} from "../kinds/manual-no-input-node-and-no-mapper/ManualNoInputNodeAndNoMapperMapperNodeState.ts";
import type {ManualNoInputNodeImageAndNoMapperMapperNodeState} from "../kinds/manual-no-input-node-image-and-no-mapper/ManualNoInputNodeImageAndNoMapperMapperNodeState.ts";
import type {ManualNoInputNodeImageMapperNodeState} from "../kinds/manual-no-input-node-image/ManualNoInputNodeImageMapperNodeState.ts";
import type {ManualNoInputNodeMapperNodeState} from "../kinds/manual-no-input-node/ManualNoInputNodeMapperNodeState.ts";
import type {ManualNoMapperMapperNodeState} from "../kinds/manual-no-mapper/ManualNoMapperMapperNodeState.ts";
export type SupportedMapperNodeState =
	| ManualMappingInProgressMapperNodeState
	| ManualNoInputNodeImageAndNoMapperMapperNodeState
	| ManualNoMapperMapperNodeState
	| ManualNoInputNodeMapperNodeState
	| ManualNoInputNodeImageMapperNodeState
	| ManualNoInputNodeAndNoMapperMapperNodeState
	| ManualMappingSucceededMapperNodeState
	| InstantNoInputNodeImageAndNoMapperMapperNodeState
	| InstantNoMapperMapperNodeState
	| InstantNoInputNodeMapperNodeState
	| InstantNoInputNodeImageMapperNodeState
	| InstantNoInputNodeAndNoMapperMapperNodeState
	| InstantMappingSucceededMapperNodeState;
