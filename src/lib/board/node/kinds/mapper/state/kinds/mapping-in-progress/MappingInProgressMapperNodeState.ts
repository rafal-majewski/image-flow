import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {NoInputMapperNodeState} from "../no-input/NoInputMapperNodeState.ts";
import {NoMapperMapperNodeState} from "../no-mapper/NoMapperMapperNodeState.ts";
export class MappingInProgressMapperNodeState extends MapperNodeState {
	public constructor(mapper: Mapper, input: ImageData) {
		super("working");
		this.mapper = mapper;
		this.input = input;
	}
	public readonly mapper: Mapper;
	public readonly input: ImageData;
	public override setMapper(mapper: Mapper): MappingInProgressMapperNodeState {
		return new MappingInProgressMapperNodeState(mapper, this.input);
	}
	public override unsetInput(): NoInputMapperNodeState {
		return new NoInputMapperNodeState(this.mapper);
	}
	public override unsetMapper(): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(this.input);
	}
	public override setInput(input: ImageData): MappingInProgressMapperNodeState {
		return new MappingInProgressMapperNodeState(this.mapper, input);
	}
}
