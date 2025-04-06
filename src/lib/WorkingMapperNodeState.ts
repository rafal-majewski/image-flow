import type {Mapper} from "./Mapper.ts";
import {MapperNodeState} from "./MapperNodeState.ts";
import {NoInputMapperNodeState} from "./NoInputMapperNodeState.ts";
import {NoMapperMapperNodeState} from "./NoMapperMapperNodeState.ts";
export class WorkingMapperNodeState extends MapperNodeState {
	public constructor(mapper: Mapper, input: ImageData) {
		super("working");
		this.mapper = mapper;
		this.input = input;
	}
	public readonly mapper: Mapper;
	public readonly input: ImageData;
	public override setMapper(mapper: Mapper): WorkingMapperNodeState {
		return new WorkingMapperNodeState(mapper, this.input);
	}
	public override unsetInput(): NoInputMapperNodeState {
		return new NoInputMapperNodeState(this.mapper);
	}
	public override unsetMapper(): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(this.input);
	}
	public override setInput(input: ImageData): WorkingMapperNodeState {
		return new WorkingMapperNodeState(this.mapper, input);
	}
}
