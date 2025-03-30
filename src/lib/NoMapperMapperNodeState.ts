import type {Mapper} from "./Mapper.ts";
import {MapperNodeState} from "./MapperNodeState.ts";
import {NoInputAndNoMapperMapperNodeState} from "./NoInputAndNoMapperMapperNodeState.ts";
import {WorkingMapperNodeState} from "./WorkingMapperNodeState.ts";
export class NoMapperMapperNodeState extends MapperNodeState {
	public constructor(input: ImageData) {
		super("unconfigured");
		this.input = input;
	}
	public readonly input: ImageData;
	public override setMapper(mapper: Mapper): WorkingMapperNodeState {
		return new WorkingMapperNodeState(mapper, this.input);
	}
	public override unsetInput(): NoInputAndNoMapperMapperNodeState {
		return new NoInputAndNoMapperMapperNodeState();
	}
	public override unsetMapper(): NoInputAndNoMapperMapperNodeState {
		return new NoInputAndNoMapperMapperNodeState();
	}
	public override setInput(input: ImageData): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(input);
	}
}
