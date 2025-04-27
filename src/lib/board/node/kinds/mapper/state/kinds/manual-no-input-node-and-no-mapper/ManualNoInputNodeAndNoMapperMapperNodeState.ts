import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
export class ManualNoInputNodeAndNoMapperMapperNodeState extends MapperNodeState {
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
	public constructor(stepCount: number) {
		super("unconfigured");
		this.stepCount = stepCount;
	}
	public readonly stepCount: number;
}
