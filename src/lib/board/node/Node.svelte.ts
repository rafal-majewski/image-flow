import type {Edge} from "../edge/Edge.ts";
import type {Coordinates} from "../coordinates/Coordinates.ts";
export abstract class Node {
	public outputEdges: readonly Edge[] = $state() as readonly Edge[];
	public readonly name: string;
	public position: Coordinates = $state() as Coordinates;
	protected constructor(name: string, position: Coordinates) {
		this.name = name;
		this.position = position;
		this.outputEdges = [];
	}
	public addOutputEdge(edge: Edge): void {
		this.outputEdges = [...this.outputEdges, edge];
	}
}
