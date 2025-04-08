import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {MappingInProgressMapperNodeState} from "../mapping-in-progress/MappingInProgressMapperNodeState.svelte.ts";
import {MappingSucceededMapperNodeState} from "../mapping-succeeded/MappingSucceededMapperNodeState.svelte.ts";
import {NoInputAndNoMapperMapperNodeState} from "../no-input-and-no-mapper/NoInputAndNoMapperMapperNodeState.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
export class NoMapperMapperNodeState extends MapperNodeState {
	public constructor(input: ImageData) {
		super("unconfigured");
		this.input = input;
	}
	public readonly input: ImageData;
	public override setMapper(
		mapper: Mapper,
		outputNodes: readonly MapperNode[],
	): MappingSucceededMapperNodeState | MappingInProgressMapperNodeState {
		const generator = mapper.map(this.input);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInput(generatorResult.value);
			}
			return new MappingSucceededMapperNodeState(
				mapper,
				this.input,
				generatorResult.value,
			);
		} else {
			return new MappingInProgressMapperNodeState(
				mapper,
				this.input,
				generator,
				generatorResult.value,
			);
		}
	}
	public override unsetInput(
		outputNodes: readonly MapperNode[],
	): NoInputAndNoMapperMapperNodeState {
		return new NoInputAndNoMapperMapperNodeState();
	}
	public override unsetMapper(
		outputNodes: readonly MapperNode[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(this.input);
	}
	public override setInput(
		input: ImageData,
		outputNodes: readonly MapperNode[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(input);
	}
	public override handleNewOutputNode(outputNode: MapperNode): void {}
}
