import type {Coordinates} from "../coordinates/Coordinates.ts";
import type {NodeId} from "./id/NodeId.ts";
import type {MapperNode} from "./kinds/mapper/MapperNode.svelte.ts";
export abstract class Node {
	private outputNodes: readonly MapperNode[] =
		$state() as readonly MapperNode[];
	public get $outputNodes(): readonly MapperNode[] {
		return this.outputNodes;
	}
	public readonly name: string;
	public position: Coordinates = $state() as Coordinates;
	public readonly id: NodeId;
	protected constructor(name: string, position: Coordinates, id: NodeId) {
		this.name = name;
		this.position = position;
		this.outputNodes = [];
		this.id = id;
	}
	protected abstract handleNewOutputNode(outputNode: MapperNode): void;
	public addOutputNode(outputNodeToAdd: MapperNode): void {
		this.outputNodes = [...this.outputNodes, outputNodeToAdd];
		this.handleNewOutputNode(outputNodeToAdd);
	}
	public deleteOutputNode(outputNodeToDelete: MapperNode): void {
		this.outputNodes = this.outputNodes.filter(
			(outputNode) => outputNode.id !== outputNodeToDelete.id,
		);
		outputNodeToDelete.unsetInputNode();
	}
}
