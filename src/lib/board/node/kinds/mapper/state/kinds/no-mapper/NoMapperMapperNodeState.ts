import type {Edge} from "../../../../../../edge/Edge.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {MappingInProgressMapperNodeState} from "../mapping-in-progress/MappingInProgressMapperNodeState.svelte.ts";
import {MappingSucceededMapperNodeState} from "../mapping-succeeded/MappingSucceededMapperNodeState.svelte.ts";
import {NoInputAndNoMapperMapperNodeState} from "../no-input-and-no-mapper/NoInputAndNoMapperMapperNodeState.ts";
export class NoMapperMapperNodeState extends MapperNodeState {
	public constructor(input: ImageData) {
		super("unconfigured");
		this.input = input;
	}
	public readonly input: ImageData;
	public override setMapper(
		mapper: Mapper,
		outputEdges: readonly Edge[],
	): MappingSucceededMapperNodeState | MappingInProgressMapperNodeState {
		const generator = mapper.map(this.input);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.targetNode.setInput(generatorResult.value);
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
		outputEdges: readonly Edge[],
	): NoInputAndNoMapperMapperNodeState {
		return new NoInputAndNoMapperMapperNodeState();
	}
	public override unsetMapper(
		outputEdges: readonly Edge[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(this.input);
	}
	public override setInput(
		input: ImageData,
		outputEdges: readonly Edge[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(input);
	}
	public override handleNewOutputEdge(edge: Edge): void {}
}
