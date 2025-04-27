import type {ManualMappingInProgressMapperNodeState} from "./kinds/manual-mapping-in-progress/ManualMappingInProgressMapperNodeState.ts";
import type {ManualMappingSucceededMapperNodeState} from "./kinds/manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
import type {ManualNoInputImageAndNoMapperMapperNodeState} from "./kinds/manual-no-input-image-and-no-mapper/ManualNoInputImageAndNoMapperMapperNodeState.ts";
import type {ManualNoInputImageMapperNodeState} from "./kinds/manual-no-input-image/ManualNoInputImageMapperNodeState.ts";
import type {ManualNoInputNodeAndNoMapperMapperNodeState} from "./kinds/manual-no-input-node-and-no-mapper/ManualNoInputNodeAndNoMapperMapperNodeState.ts";
import type {ManualNoInputNodeMapperNodeState} from "./kinds/manual-no-input-node/ManualNoInputNodeMapperNodeState.ts";
import type {ManualNoMapperMapperNodeState} from "./kinds/manual-no-mapper/ManualNoMapperMapperNodeState.ts";
import type {InstantMappingSucceededMapperNodeState} from "./kinds/instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import type {InstantNoInputImageAndNoMapperMapperNodeState} from "./kinds/instant-no-input-image-and-no-mapper/InstantNoInputImageAndNoMapperMapperNodeState.ts";
import type {InstantNoInputImageMapperNodeState} from "./kinds/instant-no-input-image/InstantNoInputImageMapperNodeState.ts";
import type {InstantNoInputNodeAndNoMapperMapperNodeState} from "./kinds/instant-no-input-node-and-no-mapper/InstantNoInputNodeAndNoMapperMapperNodeState.ts";
import type {InstantNoInputNodeMapperNodeState} from "./kinds/instant-no-input-node/InstantNoInputNodeMapperNodeState.ts";
import type {InstantNoMapperMapperNodeState} from "./kinds/instant-no-mapper/InstantNoMapperMapperNodeState.ts";
export type SupportedMapperNodeState =
	| ManualMappingInProgressMapperNodeState
	| ManualNoInputImageAndNoMapperMapperNodeState
	| ManualNoMapperMapperNodeState
	| ManualNoInputNodeMapperNodeState
	| ManualNoInputImageMapperNodeState
	| ManualNoInputNodeAndNoMapperMapperNodeState
	| ManualMappingSucceededMapperNodeState
	| InstantNoInputImageAndNoMapperMapperNodeState
	| InstantNoMapperMapperNodeState
	| InstantNoInputNodeMapperNodeState
	| InstantNoInputImageMapperNodeState
	| InstantNoInputNodeAndNoMapperMapperNodeState
	| InstantMappingSucceededMapperNodeState;
