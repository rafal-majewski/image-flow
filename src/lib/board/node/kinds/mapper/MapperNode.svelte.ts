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
	public doManualStep(): void {
		this.state = this.state.doStep(this.outputNodes);
	}
	public makeManual(): void {
		this.state = this.state.makeManual(1, this.outputNodes);
	}
	public makeAnimated(): void {
		const intervalIntervalSeconds = 10;
		const intervalId = setInterval(() => {
			this.state = this.state.doStep(this.outputNodes);
		}, intervalIntervalSeconds * 1000);
		this.state = this.state.makeAnimated(
			intervalId,
			intervalIntervalSeconds,
			this.outputNodes,
		);
	}
	public makeInstant(): void {
		this.state = this.state.makeInstant(this.outputNodes);
	}
	public state: MapperNodeState = $state.raw() as MapperNodeState;
	public override readonly status = $derived(this.state.status);
	public override disconnect(): void {
		throw new Error("Not implemented.");
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
	public unsetInputImage(): void {
		this.state = this.state.unsetInputImage(this.outputNodes);
	}
	public setInputNodeWithInputImage(
		inputNode: Node,
		inputImage: ImageData,
	): void {
		this.state = this.state.setInputNodeWithInputImage(
			this,
			inputNode,
			inputImage,
			this.outputNodes,
		);
	}
	public setInputNodeWithoutInputImage(inputNode: SupportedNode): void {
		this.state = this.state.setInputNodeWithoutInputImage(
			this,
			inputNode,
			this.outputNodes,
		);
	}
	public setInputImage(inputImage: ImageData): void {
		this.state = this.state.setInputImage(inputImage, this.outputNodes);
	}
	protected override updateOutputNodeAfterAdding(
		outputNodeToUpdate: OutputNode,
	): void {
		this.state.updateOutputNodeAfterAdding(this, outputNodeToUpdate);
	}
}
