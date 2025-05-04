import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import type {SupportedNode} from "../../SupportedNode.ts";
import type {OutputNode} from "../../OutputNode.ts";
import type {Mapper} from "./mapper/Mapper.ts";
import {ManualNoInputNodeAndNoMapperMapperNodeState} from "./state/kinds/manual-no-input-node-and-no-mapper/ManualNoInputNodeAndNoMapperMapperNodeState.ts";
import type {MapperNodeState} from "./state/MapperNodeState.ts";
export class MapperNode extends Node implements OutputNode {
	public constructor(position: Coordinates) {
		super(position);
		this.state = new ManualNoInputNodeAndNoMapperMapperNodeState(1);
	}
	public doManualSteps(): void {
		this.state = this.state.doManualSteps(this.outputNodes);
	}
	public makeManual(): void {
		this.state = this.state.makeManual(1);
	}
	public setStepCount(stepCount: number): void {
		this.state = this.state.setStepCount(stepCount);
	}
	public makeAnimated(): void {
		const intervalIntervalSeconds = 0.001;
		const intervalId = setInterval(() => {
			this.state = this.state.doAnimatedStep(this.outputNodes);
		}, intervalIntervalSeconds * 1000);
		this.state = this.state.makeAnimated(intervalId, intervalIntervalSeconds);
	}
	public makeInstant(): void {
		this.state = this.state.makeInstant(this.outputNodes);
	}
	public state: MapperNodeState = $state.raw() as MapperNodeState;
	public override readonly status = $derived(this.state.status);
	public override disconnect(): void {
		this.disconnectOutputNodes();
		this.unsetInputNode();
	}
	public unsetMapper(): void {
		this.state = this.state.unsetMapper(this.outputNodes);
	}
	public setMapper(mapper: Mapper): void {
		this.state = this.state.setMapper(mapper, this.outputNodes);
	}
	public unsetInputNode(): void {
		this.state = this.state.unsetInputNode(this, this.outputNodes);
	}
	public unsetInputNodeImage(): void {
		this.state = this.state.unsetInputNodeImage(this.outputNodes);
	}
	public setInputNodeWithImage(inputNode: Node, inputImage: ImageData): void {
		this.state = this.state.setInputNodeWithImage(
			this,
			inputNode,
			inputImage,
			this.outputNodes,
		);
	}
	public setInputNodeWithoutImage(inputNode: SupportedNode): void {
		this.state = this.state.setInputNodeWithoutImage(
			this,
			inputNode,
			this.outputNodes,
		);
	}
	public setInputNodeImage(inputImage: ImageData): void {
		this.state = this.state.setInputNodeImage(inputImage, this.outputNodes);
	}
	protected override updateOutputNodeAfterAdding(
		outputNodeToUpdate: OutputNode,
	): void {
		this.state.updateOutputNodeAfterAdding(this, outputNodeToUpdate);
	}
	public setIntervalInterval(intervalIntervalSeconds: number): void {
		const intervalId = setInterval(() => {
			this.state = this.state.doAnimatedStep(this.outputNodes);
		}, intervalIntervalSeconds * 1000);
		this.state = this.state.setIntervalInterval(
			intervalId,
			intervalIntervalSeconds,
		);
	}
}
