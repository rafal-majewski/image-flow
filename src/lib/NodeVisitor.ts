import type {FromUrlLoaderNode} from "./FromUrlLoaderNode.svelte.ts";
import type {MapperNode} from "./MapperNode.svelte.ts";
export interface NodeVisitor<Result> {
	visitFromUrlLoader(node: FromUrlLoaderNode): Result;
	visitMapper(node: MapperNode): Result;
}
