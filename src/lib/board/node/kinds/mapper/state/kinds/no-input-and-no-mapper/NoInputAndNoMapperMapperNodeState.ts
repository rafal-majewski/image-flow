import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {NoInputMapperNodeState} from "../no-input/NoInputMapperNodeState.ts";
import {NoMapperMapperNodeState} from "../no-mapper/NoMapperMapperNodeState.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
export class NoInputAndNoMapperMapperNodeState extends MapperNodeState {
	public constructor() {
		super("unconfigured");
	}
	public override setMapper(
		mapper: Mapper,
		outputNodes: readonly MapperNode[],
	): NoInputMapperNodeState {
		return new NoInputMapperNodeState(mapper);
	}
	public override unsetInput(
		outputNodes: readonly MapperNode[],
	): NoInputAndNoMapperMapperNodeState {
		return this;
	}
	public override unsetMapper(
		outputNodes: readonly MapperNode[],
	): NoInputAndNoMapperMapperNodeState {
		return this;
	}
	public override setInput(
		input: ImageData,
		outputNodes: readonly MapperNode[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(input);
	}
	public override handleNewOutputNode(outputNode: MapperNode): void {}
}
