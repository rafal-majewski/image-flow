import type {Mapper} from "./Mapper.ts";
import {MapperNodeState} from "./MapperNodeState.ts";
import {NoInputNodeState} from "./NoInputNodeState.ts";
import {NoMapperMapperNodeState} from "./NoMapperMapperNodeState.ts";
export class NoInputAndNoMapperMapperNodeState extends MapperNodeState {
	public constructor() {
		super("unconfigured");
	}
	public override setMapper(mapper: Mapper): NoInputNodeState {
		return new NoInputNodeState(mapper);
	}
	public override unsetInput(): NoInputAndNoMapperMapperNodeState {
		return this;
	}
	public override unsetMapper(): NoInputAndNoMapperMapperNodeState {
		return this;
	}
	public override setInput(input: ImageData): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(input);
	}
}
