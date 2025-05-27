import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {InputEdge} from "../../../edge/types/input/InputEdge.ts";
import {Node} from "../../Node.svelte.ts";
import {ManualNoInputEdgeAndNoMapperMapperNodeState} from "../mapper/state/kinds/manual-no-input-node-and-no-mapper/ManualNoInputEdgeAndNoMapperMapperNodeState.ts";
import type {Combiner} from "./combiner/Combiner.ts";
export class CombinerNode extends Node {
	public constructor(position: Coordinates) {
		super(position, new ManualNoInputEdgeAndNoMapperMapperNodeState(1));
	}
	public override disconnect(): void {
		this.disconnectOutputEdges();
		this.unsetInputNode();
	}
	public setCombiner(combiner: Combiner): void {
		this.state = this.state.setCombiner(combiner, this.outputEdges);
	}
	public setFirstInputEdgeWithImage(
		inputEdge: InputEdge,
		inputImage: ImageData,
	): void {
		this.state = this.state.setFirstInputNodeWithImage(
			this,
			inputNode,
			inputImage,
			this.outputEdges,
		);
	}
	public setFirstInputEdgeWithoutImage(inputEdge: InputEdge): void {
		this.state = this.state.setFirstInputNodeWithoutImage(
			this,
			inputNode,
			this.outputEdges,
		);
	}
	public setFirstInputNodeImage(inputImage: ImageData): void {
		this.state = this.state.setFirstInputNodeImage(
			inputImage,
			this.outputEdges,
		);
	}
	public setSecondInputNodeImage(inputImage: ImageData): void {
		this.state = this.state.setSecondInputNodeImage(
			inputImage,
			this.outputEdges,
		);
	}
	public setSecondInputNodeWithImage(
		inputNode: Node,
		inputImage: ImageData,
	): void {
		this.state = this.state.setSecondInputNodeWithImage(
			this,
			inputNode,
			inputImage,
			this.outputEdges,
		);
	}
	public setSecondInputNodeWithoutImage(inputNode: Node): void {
		this.state = this.state.setSecondInputNodeWithoutImage(
			this,
			inputNode,
			this.outputEdges,
		);
	}
	public override readonly status = $derived(this.state.status);
	public unsetFirstInputNode(): void {
		this.state = this.state.unsetFirstInputNode(this, this.outputEdges);
	}
	public unsetFirstInputNodeImage(): void {
		this.state = this.state.unsetFirstInputNodeImage(this.outputEdges);
	}
	public unsetMapper(): void {
		this.state = this.state.unsetMapper(this.outputEdges);
	}
	public unsetSecondInputNode(): void {
		this.state = this.state.unsetSecondInputNode(this, this.outputEdges);
	}
	public unsetSecondInputNodeImage(): void {
		this.state = this.state.unsetSecondInputNodeImage(this.outputEdges);
	}
}
