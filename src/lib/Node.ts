import type {Coordinates} from "./Coordinates.ts";
import type {NodeStatus} from "./NodeStatus.ts";
import type {NodeVisitor} from "./NodeVisitor.ts";
export abstract class Node {
	public readonly name: string;
	public position: Coordinates;
	public abstract readonly status: NodeStatus;
	protected constructor(name: string, position: Coordinates) {
		this.name = name;
		this.position = position;
	}
	public abstract acceptVisitor<Result>(visitor: NodeVisitor<Result>): Result;
}
