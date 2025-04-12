import type {Mapper} from "../../mapper/Mapper.ts";
import {MappingInProgressMapperNode} from "../mapping-in-progress/MappingInProgressMapperNode.ts";
import {NoMapperMapperNode} from "../no-mapper/NoMapperMapperNode.ts";
import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
import type {NodeId} from "../../../../id/NodeId.ts";
import type {LoadingSucceededFromUrlLoaderNode} from "../../../from-url-loader/kinds/loading-succeeded/LoadingSucceededFromUrlLoaderNode.ts";
import {MapperNode} from "../../MapperNode.ts";
import {NoInputImageMapperNode} from "../no-input-image/NoInputImageMapperNode.ts";
export class MappingSucceededMapperNode extends MapperNode {
	public constructor(
		id: NodeId,
		inputImage: ImageData,
		inputNode: MappingSucceededMapperNode | LoadingSucceededFromUrlLoaderNode,
		mapper: Mapper,
		outputImage: ImageData,
		outputNodes: readonly (
			| MappingInProgressMapperNode
			| MappingSucceededMapperNode
			| NoMapperMapperNode
		)[],
		position: Coordinates,
	) {
		super(id, position, "working");
		this.inputImage = inputImage;
		this.inputNode = inputNode;
		this.mapper = mapper;
		this.outputImage = outputImage;
		this.outputNodes = outputNodes;
	}
	private readonly inputImage: ImageData;
	public readonly inputNode:
		| MappingSucceededMapperNode
		| LoadingSucceededFromUrlLoaderNode;
	private readonly mapper: Mapper;
	private readonly outputImage: ImageData;
	public override outputNodes: readonly (
		| MappingInProgressMapperNode
		| MappingSucceededMapperNode
		| NoMapperMapperNode
	)[];
	public setMapper(
		newMapper: Mapper,
	): MappingSucceededMapperNode | MappingInProgressMapperNode {
		const generator = newMapper.map(this.inputImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			const newOutputNodes = this.outputNodes.map((outputNode) =>
				outputNode.setInputImage(generatorResult.value),
			);
			return new MappingSucceededMapperNode(
				this.id,
				this.inputImage,
				this.inputNode,
				newMapper,
				generatorResult.value,
				newOutputNodes,
				this.position,
			);
		} else {
			const newOutputNodes = this.outputNodes.map((outputNode) =>
				outputNode.unsetInputImage(),
			);
			return new MappingInProgressMapperNode(
				generator,
				this.id,
				this.inputImage,
				this.inputNode,
				newMapper,
				generatorResult.value,
				newOutputNodes,
				this.position,
			);
		}
	}
	public unsetInputImage(): NoInputImageMapperNode {
		const newOutputNodes = this.outputNodes.map((outputNode) =>
			outputNode.unsetInputImage(),
		);
		return new NoInputImageMapperNode(
			this.id,
			this.inputNode,
			this.mapper,
			newOutputNodes,
			this.position,
		);
	}
	public unsetMapper(): NoMapperMapperNode {
		const newOutputNodes = this.outputNodes.map((outputNode) =>
			outputNode.unsetInputImage(),
		);
		return new NoMapperMapperNode(
			this.id,
			this.inputImage,
			this.inputNode,
			newOutputNodes,
			this.position,
		);
	}
	public setInputImage(
		newInputImage: ImageData,
	): MappingSucceededMapperNode | MappingInProgressMapperNode {
		const generator = this.mapper.map(newInputImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			const newOutputNodes = this.outputNodes.map((outputNode) =>
				outputNode.setInputImage(generatorResult.value),
			);
			return new MappingSucceededMapperNode(
				this.id,
				newInputImage,
				this.inputNode,
				this.mapper,
				generatorResult.value,
				newOutputNodes,
				this.position,
			);
		} else {
			const newOutputNodes = this.outputNodes.map((outputNode) =>
				outputNode.unsetInputImage(),
			);
			return new MappingInProgressMapperNode(
				generator,
				this.id,
				newInputImage,
				this.inputNode,
				this.mapper,
				generatorResult.value,
				newOutputNodes,
				this.position,
			);
		}
	}
}
