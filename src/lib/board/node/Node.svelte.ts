import type {Coordinates} from "../coordinates/Coordinates.ts";
import {generateNodeId} from "./id/generation/generateNodeId.ts";
import type {NodeId} from "./id/NodeId.ts";
import type {OutputNode} from "./OutputNode.ts";
import type {NodeStatus} from "./status/NodeStatus.ts";
export abstract class Node {
	protected constructor(position: Coordinates) {
		this.id = generateNodeId();
		this.position = position;
		this.outputNodes = [];
	}
	public readonly id: NodeId;
	public position: Coordinates = $state.raw() as Coordinates;
	public abstract readonly status: NodeStatus;
	public abstract disconnect(): void;
	public outputNodes: readonly OutputNode[] =
		$state.raw() as readonly OutputNode[];
	private addOutputNode(outputNodeToAdd: OutputNode): void {
		this.outputNodes = [...this.outputNodes, outputNodeToAdd];
	}
	public addAndUpdateOutputNode(outputNodeToAddAndUpdate: OutputNode): void {
		this.addOutputNode(outputNodeToAddAndUpdate);
		this.updateOutputNodeAfterAdding(outputNodeToAddAndUpdate);
	}
	protected abstract updateOutputNodeAfterAdding(
		outputNodeToUpdate: OutputNode,
	): void;
	public deleteOutputNode(outputNodeToDelete: OutputNode): void {
		this.outputNodes = this.outputNodes.filter(
			(node) => node !== outputNodeToDelete,
		);
	}
	protected disconnectOutputNodes(): void {
		for (const outputNode of this.outputNodes) {
			outputNode.unsetInputNode();
		}
	}
}
