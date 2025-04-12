import type {Mapper} from "../../mapper/Mapper.ts";
import {NoInputImageAndNoMapperMapperNode} from "../no-input-image-and-no-mapper/NoInputImageAndNoMapperMapperNode.ts";
import {MapperNode} from "../../MapperNode.ts";
import type {NodeId} from "../../../../id/NodeId.ts";
import {MappingSucceededMapperNode} from "../mapping-succeeded/MappingSucceededMapperNode.ts";
import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
import type {LoadingSucceededFromUrlLoaderNode} from "../../../from-url-loader/kinds/loading-succeeded/LoadingSucceededFromUrlLoaderNode.ts";
import {MappingInProgressMapperNode} from "../mapping-in-progress/MappingInProgressMapperNode.ts";
import type {NoMapperMapperNode} from "../no-mapper/NoMapperMapperNode.ts";
export class NoInputImageMapperNode extends MapperNode {
	public constructor(
		id: NodeId,
		inputNode: MappingSucceededMapperNode | LoadingSucceededFromUrlLoaderNode,
		mapper: Mapper,
		outputNodes: readonly (
			| NoInputImageAndNoMapperMapperNode
			| NoInputImageMapperNode
			| NoMapperMapperNode
		)[],
		position: Coordinates,
	) {
		super(id, position, "idling");
		this.inputNode = inputNode;
		this.mapper = mapper;
		this.outputNodes = outputNodes;
	}
	public readonly inputNode:
		| MappingSucceededMapperNode
		| LoadingSucceededFromUrlLoaderNode;
	public readonly mapper: Mapper;
	public override outputNodes: readonly (
		| NoInputImageAndNoMapperMapperNode
		| NoInputImageMapperNode
		| NoMapperMapperNode
	)[];
	public setMapper(newMapper: Mapper): NoInputImageMapperNode {
		return new NoInputImageMapperNode(
			this.id,
			this.inputNode,
			newMapper,
			this.outputNodes,
			this.position,
		);
	}
	public unsetMapper(): NoInputImageAndNoMapperMapperNode {
		return new NoInputImageAndNoMapperMapperNode(
			this.id,
			this.inputNode,
			this.outputNodes,
			this.position,
		);
	}
	public setInputImage(
		inputImage: ImageData,
	): MappingSucceededMapperNode | MappingInProgressMapperNode {
		const generator = this.mapper.map(inputImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			const newOutputNodes = this.outputNodes.map((outputNode) =>
				outputNode.setInputImage(inputImage),
			);
			return new MappingSucceededMapperNode(
				this.id,
				inputImage,
				this.inputNode,
				this.mapper,
				generatorResult.value,
				newOutputNodes,
				this.position,
			);
		} else {
			return new MappingInProgressMapperNode(
				generator,
				this.id,
				inputImage,
				this.inputNode,
				this.mapper,
				generatorResult.value,
				this.outputNodes,
				this.position,
			);
		}
	}
}
