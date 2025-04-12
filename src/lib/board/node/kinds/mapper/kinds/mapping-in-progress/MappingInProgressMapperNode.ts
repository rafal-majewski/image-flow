import type {LoadingSucceededFromUrlLoaderNode} from "../../../from-url-loader/kinds/loading-succeeded/LoadingSucceededFromUrlLoaderNode.ts";
import type {NodeId} from "../../../../id/NodeId.ts";
import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
import {NoInputImageMapperNode} from "../no-input-image/NoInputImageMapperNode.ts";
import type {Mapper} from "../../mapper/Mapper.ts";
import {MapperNode} from "../../MapperNode.ts";
import {MappingSucceededMapperNode} from "../mapping-succeeded/MappingSucceededMapperNode.ts";
import {NoMapperMapperNode} from "../no-mapper/NoMapperMapperNode.ts";
import type {NoInputImageAndNoMapperMapperNode} from "../no-input-image-and-no-mapper/NoInputImageAndNoMapperMapperNode.ts";
export class MappingInProgressMapperNode extends MapperNode {
	public constructor(
		generator: Generator<ImageData, ImageData, void>,
		id: NodeId,
		inputImage: ImageData,
		inputNode: MappingSucceededMapperNode | LoadingSucceededFromUrlLoaderNode,
		mapper: Mapper,
		outputImage: ImageData,
		outputNodes: readonly (
			| NoInputImageMapperNode
			| NoInputImageAndNoMapperMapperNode
			| NoMapperMapperNode
		)[],
		position: Coordinates,
	) {
		super(id, position, "working");
		this.generator = generator;
		this.inputImage = inputImage;
		this.inputNode = inputNode;
		this.mapper = mapper;
		this.outputImage = outputImage;
		this.outputNodes = outputNodes;
	}
	private readonly generator: Generator<ImageData, ImageData, void>;
	private readonly inputImage: ImageData;
	public readonly inputNode:
		| MappingSucceededMapperNode
		| LoadingSucceededFromUrlLoaderNode;
	private readonly mapper: Mapper;
	private readonly outputImage: ImageData;
	public override outputNodes: readonly (
		| NoInputImageMapperNode
		| NoInputImageAndNoMapperMapperNode
		| NoMapperMapperNode
	)[];
	public setMapper(
		newMapper: Mapper,
	): MappingInProgressMapperNode | MappingSucceededMapperNode {
		const newGenerator = newMapper.map(this.inputImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			const newOutputNodes = this.outputNodes.map((outputNode) =>
				outputNode.setInputImage(newGeneratorResult.value),
			);
			return new MappingSucceededMapperNode(
				this.id,
				this.inputImage,
				this.inputNode,
				newMapper,
				newGeneratorResult.value,
				newOutputNodes,
				this.position,
			);
		} else {
			return new MappingInProgressMapperNode(
				newGenerator,
				this.id,
				this.inputImage,
				this.inputNode,
				newMapper,
				newGeneratorResult.value,
				this.outputNodes,
				this.position,
			);
		}
	}
	public unsetInputImage(): NoInputImageMapperNode {
		return new NoInputImageMapperNode(
			this.id,
			this.inputNode,
			this.mapper,
			this.outputNodes,
			this.position,
		);
	}
	public unsetMapper(): NoMapperMapperNode {
		return new NoMapperMapperNode(
			this.id,
			this.inputImage,
			this.inputNode,
			this.outputNodes,
			this.position,
		);
	}
	public setInputImage(
		newInputImage: ImageData,
	): MappingSucceededMapperNode | MappingInProgressMapperNode {
		const newGenerator = this.mapper.map(newInputImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			const newOutputNodes = this.outputNodes.map((outputNode) =>
				outputNode.setInputImage(newGeneratorResult.value),
			);
			return new MappingSucceededMapperNode(
				this.id,
				newInputImage,
				this.inputNode,
				this.mapper,
				newGeneratorResult.value,
				newOutputNodes,
				this.position,
			);
		} else {
			return new MappingInProgressMapperNode(
				newGenerator,
				this.id,
				newInputImage,
				this.inputNode,
				this.mapper,
				newGeneratorResult.value,
				this.outputNodes,
				this.position,
			);
		}
	}
	public doStep(): MappingInProgressMapperNode | MappingSucceededMapperNode {
		const generatorResult = this.generator.next();
		if (generatorResult.done) {
			const newOutputNodes = this.outputNodes.map((outputNode) =>
				outputNode.setInputImage(generatorResult.value),
			);
			return new MappingSucceededMapperNode(
				this.id,
				this.inputImage,
				this.inputNode,
				this.mapper,
				generatorResult.value,
				newOutputNodes,
				this.position,
			);
		} else {
			return new MappingInProgressMapperNode(
				this.generator,
				this.id,
				this.inputImage,
				this.inputNode,
				this.mapper,
				generatorResult.value,
				this.outputNodes,
				this.position,
			);
		}
	}
}
