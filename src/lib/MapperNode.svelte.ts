import type {Coordinates} from "./Coordinates.ts";
import type {Mapper} from "./Mapper.ts";
import type {MapperNodeState} from "./MapperNodeState.ts";
import {Node} from "./Node.ts";
import type {NodeStatus} from "./NodeStatus.ts";
import type {NodeVisitor} from "./NodeVisitor.ts";
import {NoInputAndNoMapperMapperNodeState} from "./NoInputAndNoMapperMapperNodeState.ts";
export class MapperNode extends Node {
	private readonly nextNodes: readonly MapperNode[];
	private state: MapperNodeState = $state.raw() as MapperNodeState;
	public override status: NodeStatus = $derived(this.state.status);
	public constructor(position: Coordinates) {
		super("Mapper", position);
		this.position = position;
		this.nextNodes = [];
		this.state = new NoInputAndNoMapperMapperNodeState();
	}
	public setMapper(mapper: Mapper): void {
		this.state = this.state.setMapper(mapper, this.nextNodes);
	}
	public unsetInput(): void {
		this.state = this.state.unsetInput(this.nextNodes);
	}
	public unsetMapper(): void {
		this.state = this.state.unsetMapper(this.nextNodes);
	}
	public setInput(input: ImageData): void {
		this.state = this.state.setInput(input, this.nextNodes);
	}
	public override acceptVisitor<Result>(visitor: NodeVisitor<Result>): Result {
		return visitor.visitMapper(this);
	}
}
