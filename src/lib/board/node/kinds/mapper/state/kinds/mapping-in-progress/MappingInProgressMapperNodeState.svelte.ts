import type {Edge} from "../../../../../../edge/Edge.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {MappingSucceededMapperNodeState} from "../mapping-succeeded/MappingSucceededMapperNodeState.svelte.ts";
import {NoInputMapperNodeState} from "../no-input/NoInputMapperNodeState.ts";
import {NoMapperMapperNodeState} from "../no-mapper/NoMapperMapperNodeState.ts";
export class MappingInProgressMapperNodeState extends MapperNodeState {
	public constructor(
		mapper: Mapper,
		input: ImageData,
		generator: Generator<ImageData, ImageData, void>,
		output: ImageData,
	) {
		super("working");
		this.mapper = mapper;
		this.input = input;
		this.generator = generator;
		this.output = output;
	}
	public readonly mapper: Mapper;
	private readonly input: ImageData;
	private readonly generator: Generator<ImageData, ImageData, void>;
	public readonly output: ImageData = $state() as ImageData;
	public override setMapper(
		newMapper: Mapper,
		outputEdges: readonly Edge[],
	): MappingSucceededMapperNodeState | MappingInProgressMapperNodeState {
		const newGenerator = newMapper.map(this.input);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const edge of outputEdges) {
				edge.targetNode.setInput(newGeneratorResult.value);
			}
			return new MappingSucceededMapperNodeState(
				newMapper,
				this.input,
				newGeneratorResult.value,
			);
		} else {
			return new MappingInProgressMapperNodeState(
				newMapper,
				this.input,
				newGenerator,
				newGeneratorResult.value,
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
		const newGenerator = this.mapper.map(input);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const edge of outputEdges) {
				edge.targetNode.setInput(newGeneratorResult.value);
			}
			return new MappingSucceededMapperNodeState(
				this.mapper,
				input,
				newGeneratorResult.value,
			);
		} else {
			return new MappingInProgressMapperNodeState(
				this.mapper,
				input,
				newGenerator,
				newGeneratorResult.value,
			);
		}
	}
	public doStep():
		| MappingInProgressMapperNodeState
		| MappingSucceededMapperNodeState {
		const generatorResult = this.generator.next();
		if (generatorResult.done) {
			return new MappingSucceededMapperNodeState(
				this.mapper,
				this.input,
				generatorResult.value,
			);
		} else {
			return new MappingInProgressMapperNodeState(
				this.mapper,
				this.input,
				this.generator,
				generatorResult.value,
			);
		}
	}
	public override handleNewOutputEdge(edge: Edge): void {}
}
