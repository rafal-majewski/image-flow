import type {SupportedInputNode} from "../../../../../SupportedInputNode.ts";
import type {SupportedOutputNode} from "../../../../../SupportedOutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {MappingInProgressMapperNodeState} from "../mapping-in-progress/MappingInProgressMapperNodeState.ts";
import {MappingSucceededMapperNodeState} from "../mapping-succeeded/MappingSucceededMapperNodeState.ts";
import {NoInputImageAndNoMapperMapperNodeState} from "../no-input-image-and-no-mapper/NoInputImageAndNoMapperMapperNodeState.ts";
import {NoInputNodeAndNoMapperMapperNodeState} from "../no-input-node-and-no-mapper/NoInputNodeAndNoMapperMapperNodeState.ts";
export class NoMapperMapperNodeState extends MapperNodeState {
	public constructor(inputImage: ImageData, inputNode: SupportedInputNode) {
		super("unconfigured");
		this.inputImage = inputImage;
		this.inputNode = inputNode;
	}
	public readonly inputImage: ImageData;
	public readonly inputNode: SupportedInputNode;
	public override setMapper(
		mapper: Mapper,
		outputNodes: readonly SupportedOutputNode[],
	): MappingSucceededMapperNodeState | MappingInProgressMapperNodeState {
		const generator = mapper.map(this.inputImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputImage(generatorResult.value);
			}
			return new MappingSucceededMapperNodeState(
				this.inputImage,
				this.inputNode,
				mapper,
				generatorResult.value,
			);
		} else {
			return new MappingInProgressMapperNodeState(
				generator,
				this.inputImage,
				this.inputNode,
				mapper,
				generatorResult.value,
			);
		}
	}
	public unsetInputNode(
		outputNodes: readonly SupportedOutputNode[],
	): NoInputNodeAndNoMapperMapperNodeState {
		return new NoInputNodeAndNoMapperMapperNodeState();
	}
	public unsetInputImage(
		outputNodes: readonly SupportedOutputNode[],
	): NoInputImageAndNoMapperMapperNodeState {
		return new NoInputImageAndNoMapperMapperNodeState(this.inputNode);
	}
	public setInputImage(
		newInputImage: ImageData,
		outputNodes: readonly SupportedOutputNode[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(newInputImage, this.inputNode);
	}
	public override setInputNodeWithInputImage(
		inputImage: ImageData,
		inputNode: SupportedInputNode,
		outputNodes: readonly SupportedOutputNode[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(inputImage, inputNode);
	}
	public override setInputNodeWithoutInputImage(
		newInputNode: SupportedInputNode,
		outputNodes: readonly SupportedOutputNode[],
	): NoInputImageAndNoMapperMapperNodeState {
		return new NoInputImageAndNoMapperMapperNodeState(newInputNode);
	}
}
