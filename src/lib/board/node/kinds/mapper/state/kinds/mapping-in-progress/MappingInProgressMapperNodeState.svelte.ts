import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {MappingSucceededMapperNodeState} from "../mapping-succeeded/MappingSucceededMapperNodeState.svelte.ts";
import {NoInputMapperNodeState} from "../no-input/NoInputMapperNodeState.ts";
import {NoMapperMapperNodeState} from "../no-mapper/NoMapperMapperNodeState.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
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
		outputNodes: readonly MapperNode[],
	): MappingSucceededMapperNodeState | MappingInProgressMapperNodeState {
		const generator = newMapper.map(this.input);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInput(generatorResult.value);
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
		outputNodes: readonly MapperNode[],
	): NoInputMapperNodeState {
		return new NoInputMapperNodeState(this.mapper);
	}
	public override unsetMapper(
		outputNodes: readonly MapperNode[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(this.input);
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
	public override handleNewOutputNode(outputNode: MapperNode): void {}
}
