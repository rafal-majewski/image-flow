import type {MappingInProgressMapperNode} from "./kinds/mapping-in-progress/MappingInProgressMapperNode.ts";
import type {MappingSucceededMapperNode} from "./kinds/mapping-succeeded/MappingSucceededMapperNode.ts";
import type {NoInputImageAndNoMapperMapperNode} from "./kinds/no-input-image-and-no-mapper/NoInputImageAndNoMapperMapperNode.ts";
import type {NoInputImageMapperNode} from "./kinds/no-input-image/NoInputImageMapperNode.ts";
import type {NoInputNodeAndNoMapperMapperNode} from "./kinds/no-input-node-and-no-mapper/NoInputNodeAndNoMapperMapperNode.ts";
import type {NoInputNodeMapperNode} from "./kinds/no-input-node/NoInputNodeMapperNode.ts";
import type {NoMapperMapperNode} from "./kinds/no-mapper/NoMapperMapperNode.ts";
export type SupportedMapperNode =
	| MappingInProgressMapperNode
	| MappingSucceededMapperNode
	| NoInputImageMapperNode
	| NoInputImageAndNoMapperMapperNode
	| NoInputNodeMapperNode
	| NoInputNodeAndNoMapperMapperNode
	| NoMapperMapperNode;
