import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
import type {NodeId} from "../../../../id/NodeId.ts";
import type {LoadingSucceededFromUrlLoaderNode} from "../../../from-url-loader/kinds/loading-succeeded/LoadingSucceededFromUrlLoaderNode.ts";
import type {Mapper} from "../../mapper/Mapper.ts";
import {MapperNode} from "../../MapperNode.ts";
import {MappingInProgressMapperNode} from "../mapping-in-progress/MappingInProgressMapperNode.ts";
import {MappingSucceededMapperNode} from "../mapping-succeeded/MappingSucceededMapperNode.ts";
import type {NoInputImageAndNoMapperMapperNode} from "../no-input-image-and-no-mapper/NoInputImageAndNoMapperMapperNode.ts";
import {NoInputImageMapperNode} from "../no-input-image/NoInputImageMapperNode.ts";
export class NoInputNodeMapperNode extends MapperNode {
	public constructor(
		id: NodeId,
		mapper: Mapper,
		outputNodes: readonly (
			| NoInputImageAndNoMapperMapperNode
			| NoInputImageMapperNode
		)[],
		position: Coordinates,
	) {
		super(id, position, "unconfigured");
		this.mapper = mapper;
		this.outputNodes = outputNodes;
	}
	private readonly mapper: Mapper;
	public override outputNodes: readonly (
		| NoInputImageAndNoMapperMapperNode
		| NoInputImageMapperNode
	)[];
	public setMapper(newMapper: Mapper): NoInputNodeMapperNode {
		return new NoInputNodeMapperNode(
			this.id,
			newMapper,
			this.outputNodes,
			this.position,
		);
	}
	public setInputImageAndInputNode(
		inputImage: ImageData,
		inputNode: MappingSucceededMapperNode | LoadingSucceededFromUrlLoaderNode,
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
				inputNode,
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
				inputNode,
				this.mapper,
				generatorResult.value,
				this.outputNodes,
				this.position,
			);
		}
	}
}
