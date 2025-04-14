import type {FromFileLoaderNode} from "./kinds/from-file-loader/FromFileLoaderNode.svelte.ts";
import type {FromUrlLoaderNode} from "./kinds/from-url-loader/FromUrlLoaderNode.svelte.ts";
import type {MapperNode} from "./kinds/mapper/MapperNode.svelte.ts";
export type SupportedInputNode =
	| FromUrlLoaderNode
	| MapperNode
	| FromFileLoaderNode;
