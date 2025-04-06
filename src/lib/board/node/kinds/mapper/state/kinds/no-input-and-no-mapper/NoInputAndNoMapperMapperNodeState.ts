import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {NoInputMapperNodeState} from "../no-input/NoInputMapperNodeState.ts";
import {NoMapperMapperNodeState} from "../no-mapper/NoMapperMapperNodeState.ts";
export class NoInputAndNoMapperMapperNodeState extends MapperNodeState {
	public constructor() {
		super("unconfigured");
	}
	public override setMapper(mapper: Mapper): NoInputMapperNodeState {
		return new NoInputMapperNodeState(mapper);
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
