import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../../MapperNodeState.ts";
import {WorkingMapperNodeState} from "../../../WorkingMapperNodeState.ts";
import {NoInputAndNoMapperMapperNodeState} from "../no-input-and-no-mapper/NoInputAndNoMapperMapperNodeState.ts";
export class NoInputMapperNodeState extends MapperNodeState {
	public constructor(mapper: Mapper) {
		super("idling");
		this.mapper = mapper;
	}
	public readonly mapper: Mapper;
	public override setMapper(mapper: Mapper): NoInputMapperNodeState {
		return new NoInputMapperNodeState(mapper);
	}
	public override unsetInput(): NoInputMapperNodeState {
		return new NoInputMapperNodeState(this.mapper);
	}
	public override unsetMapper(): NoInputAndNoMapperMapperNodeState {
		return new NoInputAndNoMapperMapperNodeState();
	}
	public override setInput(input: ImageData): WorkingMapperNodeState {
		return new WorkingMapperNodeState(this.mapper, input);
	}
}
