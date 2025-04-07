import type {Edge} from "../../../../../../edge/Edge.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {MappingInProgressMapperNodeState} from "../mapping-in-progress/MappingInProgressMapperNodeState.svelte.ts";
import {NoInputMapperNodeState} from "../no-input/NoInputMapperNodeState.ts";
import {NoMapperMapperNodeState} from "../no-mapper/NoMapperMapperNodeState.ts";
export class MappingSucceededMapperNodeState extends MapperNodeState {
	public constructor(mapper: Mapper, input: ImageData, output: ImageData) {
		super("done");
		this.mapper = mapper;
		this.input = input;
		this.output = output;
	}
	public readonly mapper: Mapper;
	private readonly input: ImageData;
	public readonly output: ImageData = $state() as ImageData;
	public override setMapper(
		newMapper: Mapper,
		outputEdges: readonly Edge[],
	): MappingSucceededMapperNodeState | MappingInProgressMapperNodeState {
		const generator = newMapper.map(this.input);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.targetNode.setInput(generatorResult.value);
			}
			return new MappingSucceededMapperNodeState(
				newMapper,
				this.input,
				generatorResult.value,
			);
		} else {
			return new MappingInProgressMapperNodeState(
				newMapper,
				this.input,
				generator,
				generatorResult.value,
			);
		}
	}
	public override unsetInput(
		outputEdges: readonly Edge[],
	): NoInputMapperNodeState {
		return new NoInputMapperNodeState(this.mapper);
	}
	public override unsetMapper(
		outputEdges: readonly Edge[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(this.input);
	}
	public override setInput(
		input: ImageData,
		outputEdges: readonly Edge[],
	): MappingSucceededMapperNodeState | MappingInProgressMapperNodeState {
		const generator = this.mapper.map(input);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.targetNode.setInput(generatorResult.value);
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
	public override handleNewOutputEdge(edge: Edge): void {
		edge.targetNode.setInput(this.output);
	}
}
