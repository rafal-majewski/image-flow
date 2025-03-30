import type {Mapper} from "./Mapper.ts";
import {MapperNodeState} from "./MapperNodeState.ts";
import {NoInputAndNoMapperMapperNodeState} from "./NoInputAndNoMapperMapperNodeState.ts";
import {WorkingMapperNodeState} from "./WorkingMapperNodeState.ts";
export class NoInputNodeState extends MapperNodeState {
	public constructor(mapper: Mapper) {
		super("idling");
		this.mapper = mapper;
	}
	public readonly mapper: Mapper;
	public override setMapper(mapper: Mapper): NoInputNodeState {
		return new NoInputNodeState(mapper);
	}
	public override unsetInput(): NoInputNodeState {
		return new NoInputNodeState(this.mapper);
	}
	public override unsetMapper(): NoInputAndNoMapperMapperNodeState {
		return new NoInputAndNoMapperMapperNodeState();
	}
	public override setInput(input: ImageData): WorkingMapperNodeState {
		return new WorkingMapperNodeState(this.mapper, input);
	}
}
