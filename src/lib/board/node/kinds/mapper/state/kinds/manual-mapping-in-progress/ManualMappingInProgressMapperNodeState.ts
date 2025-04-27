import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
export class ManualMappingInProgressMapperNodeState extends MapperNodeState {
	public override setInputNodeWithInputImage(
		thisNode: MapperNode,
		inputNode: Node,
		inputImage: ImageData,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override setMapper(
		mapper: Mapper,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override setInputNodeWithoutInputImage(
		thisNode: MapperNode,
		inputNode: Node,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override setInputImage(
		inputImage: ImageData,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override unsetInputImage(
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override unsetMapper(
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override makeInstant(
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override makeManual(
		newStepCount: number,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override doStep(outputNodes: readonly OutputNode[]): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override updateOutputNodeAfterAdding(
		thisNode: MapperNode,
		outputNodeToUpdate: OutputNode,
	): void {
		throw new Error("Method not implemented.");
	}
	public constructor(
		generator: Generator<ImageData, ImageData, void>,
		inputImage: ImageData,
		inputNode: Node,
		mapper: Mapper,
		outputImage: ImageData,
		stepCount: number,
	) {
		super("working");
		this.generator = generator;
		this.inputImage = inputImage;
		this.inputNode = inputNode;
		this.mapper = mapper;
		this.outputImage = outputImage;
		this.stepCount = stepCount;
	}
	private readonly generator: Generator<ImageData, ImageData, void>;
	private readonly inputImage: ImageData;
	private readonly inputNode: Node;
	public readonly mapper: Mapper;
	public readonly outputImage: ImageData;
	public readonly stepCount: number;
}
