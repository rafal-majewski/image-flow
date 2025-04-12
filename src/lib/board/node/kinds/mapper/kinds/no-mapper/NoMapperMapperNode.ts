import type {Mapper} from "../../mapper/Mapper.ts";
import {MappingInProgressMapperNode} from "../mapping-in-progress/MappingInProgressMapperNode.ts";
import {MappingSucceededMapperNode} from "../mapping-succeeded/MappingSucceededMapperNode.ts";
import {MapperNode} from "../../MapperNode.ts";
import {NoInputImageAndNoMapperMapperNode} from "../no-input-image-and-no-mapper/NoInputImageAndNoMapperMapperNode.ts";
import type {NodeId} from "../../../../id/NodeId.ts";
import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
import type {NoInputImageMapperNode} from "../no-input-image/NoInputImageMapperNode.ts";
import type {LoadingSucceededFromUrlLoaderNode} from "../../../from-url-loader/kinds/loading-succeeded/LoadingSucceededFromUrlLoaderNode.ts";
export class NoMapperMapperNode extends MapperNode {
	public constructor(
		id: NodeId,
		inputImage: ImageData,
		inputNode: MappingSucceededMapperNode | LoadingSucceededFromUrlLoaderNode,
		outputNodes: readonly (
			| NoInputImageMapperNode
			| NoInputImageAndNoMapperMapperNode
			| NoMapperMapperNode
		)[],
		position: Coordinates,
	) {
		super(id, position, "unconfigured");
		this.inputImage = inputImage;
		this.inputNode = inputNode;
		this.outputNodes = outputNodes;
	}
	public readonly inputImage: ImageData;
	public readonly inputNode:
		| MappingSucceededMapperNode
		| LoadingSucceededFromUrlLoaderNode;
	public override readonly outputNodes: readonly (
		| NoInputImageMapperNode
		| NoInputImageAndNoMapperMapperNode
		| NoMapperMapperNode
	)[];
	public setMapper(
		mapper: Mapper,
	): MappingSucceededMapperNode | MappingInProgressMapperNode {
		const generator = mapper.map(this.inputImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			const newOutputNodes = this.outputNodes.map((outputNode) =>
				outputNode.setInputImage(generatorResult.value),
			);
			return new MappingSucceededMapperNode(
				this.id,
				this.inputImage,
				this.inputNode,
				mapper,
				generatorResult.value,
				newOutputNodes,
				this.position,
			);
		} else {
			return new MappingInProgressMapperNode(
				generator,
				this.id,
				this.inputImage,
				this.inputNode,
				mapper,
				generatorResult.value,
				this.outputNodes,
				this.position,
			);
		}
	}
	public unsetInputImage(): NoInputImageAndNoMapperMapperNode {
		return new NoInputImageAndNoMapperMapperNode(
			this.id,
			this.inputNode,
			this.outputNodes,
			this.position,
		);
	}
	public setInputImage(newInputImage: ImageData): NoMapperMapperNode {
		return new NoMapperMapperNode(
			this.id,
			newInputImage,
			this.inputNode,
			this.outputNodes,
			this.position,
		);
	}
}
