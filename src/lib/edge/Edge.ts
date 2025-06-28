import type {Node} from "../node/Node.svelte.ts";
import type {OperatingNode} from "../node/operating/OperatingNode.svelte.ts";
import type {NodeState} from "../node/state/NodeState.ts";
export class Edge {
	public constructor(
		image: ImageData | null,
		outputInputIndex: number,
		input: Node<NodeState>,
		output: OperatingNode<number>,
	) {
		this.image = image;
		this.outputInputIndex = outputInputIndex;
		this.input = input;
		this.output = output;
	}
	public delete(): void {
		this.input.deleteOutputEdge(this);
		this.output.unsetInputEdge(this.outputInputIndex);
		this.output.invalidateInputImages();
	}
	/**
	 * Do not reassign externally.
	 */
	public image: ImageData | null;
	public readonly outputInputIndex: number;
	public readonly input: Node<NodeState>;
	public readonly output: OperatingNode<number>;
	public setImage(newImage: ImageData): void {
		this.image = newImage;
		this.output.tryToValidateInputEdges();
	}
	public unsetImage(): void {
		this.image = null;
		this.output.invalidateInputImages();
	}
}
