import type {Edge} from "../../../../../../edge/Edge.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {NoInputMapperNodeState} from "../no-input/NoInputMapperNodeState.ts";
import {NoMapperMapperNodeState} from "../no-mapper/NoMapperMapperNodeState.ts";
export class NoInputAndNoMapperMapperNodeState extends MapperNodeState {
	public constructor() {
		super("unconfigured");
	}
	public override setMapper(
		mapper: Mapper,
		outputEdges: readonly Edge[],
	): NoInputMapperNodeState {
		return new NoInputMapperNodeState(mapper);
	}
	public override unsetInput(
		outputEdges: readonly Edge[],
	): NoInputAndNoMapperMapperNodeState {
		return this;
	}
	public override unsetMapper(
		outputEdges: readonly Edge[],
	): NoInputAndNoMapperMapperNodeState {
		return this;
	}
	public override setInput(
		input: ImageData,
		outputEdges: readonly Edge[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(input);
	}
	public override handleNewOutputEdge(edge: Edge): void {}
}
