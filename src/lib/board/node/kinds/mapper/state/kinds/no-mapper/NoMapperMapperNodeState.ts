import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {WorkingMapperNodeState} from "../../../states/mapping-in-progress/MappingInProgressMapperNodeState.ts";
import {NoInputAndNoMapperMapperNodeState} from "../no-input-and-no-mapper/NoInputAndNoMapperMapperNodeState.ts";
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
	public override unsetMapper(): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(this.input);
	}
	public override setInput(input: ImageData): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(input);
	}
}
