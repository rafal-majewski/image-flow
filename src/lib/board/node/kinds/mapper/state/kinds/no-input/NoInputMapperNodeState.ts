import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {MappingInProgressMapperNodeState} from "../mapping-in-progress/MappingInProgressMapperNodeState.svelte.ts";
import {MappingSucceededMapperNodeState} from "../mapping-succeeded/MappingSucceededMapperNodeState.svelte.ts";
import {NoInputAndNoMapperMapperNodeState} from "../no-input-and-no-mapper/NoInputAndNoMapperMapperNodeState.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
export class NoInputMapperNodeState extends MapperNodeState {
	public constructor(mapper: Mapper) {
		super("unconfigured");
		this.mapper = mapper;
	}
	public readonly mapper: Mapper;
	public override setMapper(
		mapper: Mapper,
		outputNodes: readonly MapperNode[],
	): NoInputMapperNodeState {
		return new NoInputMapperNodeState(mapper);
	}
	public override unsetInput(
		outputNodes: readonly MapperNode[],
	): NoInputMapperNodeState {
		return new NoInputMapperNodeState(this.mapper);
	}
	public override unsetMapper(
		outputNodes: readonly MapperNode[],
	): NoInputAndNoMapperMapperNodeState {
		return new NoInputAndNoMapperMapperNodeState();
	}
	public override setInput(
		input: ImageData,
		outputNodes: readonly MapperNode[],
	): MappingSucceededMapperNodeState | MappingInProgressMapperNodeState {
		const generator = this.mapper.map(input);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInput(generatorResult.value);
			}
			return new MappingSucceededMapperNodeState(
				this.mapper,
				input,
				generatorResult.value,
			);
		} else {
			return new MappingInProgressMapperNodeState(
				this.mapper,
				input,
				generator,
				generatorResult.value,
			);
		}
	}
	public override handleNewOutputNode(outputNode: MapperNode): void {}
}
