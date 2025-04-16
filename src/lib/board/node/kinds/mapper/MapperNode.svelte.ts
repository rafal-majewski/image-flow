import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import type {SupportedInputNode} from "../../SupportedInputNode.ts";
import type {OutputNode} from "../../OutputNode.ts";
import type {NodeId} from "../../id/NodeId.ts";
import type {Mapper} from "./mapper/Mapper.ts";
import type {SupportedMapperNodeState} from "./state/SupportedMapperNodeState.ts";
import {NoInputNodeAndNoMapperMapperNodeState} from "./state/kinds/no-input-node-and-no-mapper/NoInputNodeAndNoMapperMapperNodeState.ts";
import type {InputNode} from "../../InputNode.ts";
import type {SupportedMapperNodeMode} from "./mode/SupportedMapperNodeMode.ts";
export class MapperNode extends Node implements InputNode, OutputNode {
	private constructor(
		id: NodeId,
		position: Coordinates,
		mode: SupportedMapperNodeMode,
		outputNodes: readonly OutputNode[],
		state: SupportedMapperNodeState,
	) {
		super(id, position);
		this.mode = mode;
		this.outputNodes = outputNodes;
		this.state = state;
	}
	public mode: SupportedMapperNodeMode =
		$state.raw() as SupportedMapperNodeMode;
	public setMode(newModeKindName: SupportedMapperNodeMode["kindName"]): void {
		if (this.mode.kindName === "animated") {
			clearInterval(this.mode.data.intervalId);
		}
		switch (newModeKindName) {
			case "manual": {
				this.mode = {kindName: "manual", data: {stepCount: 100}};
				break;
			}
			case "instant": {
				this.mode = {kindName: "instant"};
				this.state = this.state.doInstantSteps(this.outputNodes);
				break;
			}
			case "animated": {
				const intervalIntervalSeconds = 0.01;
				this.mode = {
					kindName: "animated",
					data: {
						intervalIntervalSeconds: intervalIntervalSeconds,
						intervalId: setInterval(() => {
							this.state = this.state.doAnimatedStep(this.outputNodes);
						}, intervalIntervalSeconds * 1000),
					},
				};
				break;
			}
		}
	}
	public outputNodes: readonly OutputNode[] =
		$state.raw() as readonly OutputNode[];
	public state: SupportedMapperNodeState =
		$state.raw() as SupportedMapperNodeState;
	public readonly status = $derived(this.state.status);
	public addOutputNode(outputNodeToAdd: OutputNode): void {
		this.outputNodes = [...this.outputNodes, outputNodeToAdd];
	}
	public connectOutputNode(outputNodeToConnect: OutputNode): void {
		this.state.connectOutputNode(this, outputNodeToConnect);
	}
	public unsetMapper(): void {
		this.state = this.state.unsetMapper(this.outputNodes);
	}
	public setMapper(mapper: Mapper): void {
		this.state = this.state.setMapper(mapper, this.outputNodes);
		if (this.mode.kindName === "instant") {
			this.state = this.state.doInstantSteps(this.outputNodes);
		}
	}
	public unsetInputNode(): void {
		this.state = this.state.unsetInputNode(this, this.outputNodes);
	}
	public unsetInputImage(): void {
		this.state = this.state.unsetInputImage(this.outputNodes);
	}
	public static create(id: NodeId, position: Coordinates): MapperNode {
		return new MapperNode(
			id,
			position,
			{kindName: "manual", data: {stepCount: 100}},
			[],
			new NoInputNodeAndNoMapperMapperNodeState(),
		);
	}
	public override disconnect(): void {
		// TODO: Add new method to avoid duplication
		this.state = this.state.unsetInputNode(this, this.outputNodes);
		for (const outputNode of this.outputNodes) {
			outputNode.unsetInputNode();
		}
		this.outputNodes = [];
	}
	public setInputNodeWithInputImage(
		inputNode: SupportedInputNode,
		inputImage: ImageData,
	): void {
		this.state = this.state.setInputNodeWithInputImage(
			this,
			inputNode,
			inputImage,
			this.outputNodes,
		);
		if (this.mode.kindName === "instant") {
			this.state = this.state.doInstantSteps(this.outputNodes);
		}
	}
	public setInputNodeWithoutInputImage(inputNode: SupportedInputNode): void {
		this.state = this.state.setInputNodeWithoutInputImage(
			this,
			inputNode,
			this.outputNodes,
		);
		if (this.mode.kindName === "instant") {
			this.state = this.state.doInstantSteps(this.outputNodes);
		}
	}
	public doManualSteps(): void {
		if (this.mode.kindName === "manual") {
			this.state = this.state.doManualSteps(
				this.mode.data.stepCount,
				this.outputNodes,
			);
		}
	}
	public setInputImage(inputImage: ImageData): void {
		this.state = this.state.setInputImage(inputImage, this.outputNodes);
		if (this.mode.kindName === "instant") {
			this.state = this.state.doInstantSteps(this.outputNodes);
		}
	}
	public deleteOutputNode(outputNodeToDelete: OutputNode): void {
		this.outputNodes = this.outputNodes.filter(
			(outputNode) => outputNode !== outputNodeToDelete,
		);
	}
}
