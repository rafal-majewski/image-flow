import type {Coordinates} from "./Coordinates.ts";
import type {Mapper} from "./Mapper.ts";
import type {MapperNodeState} from "./MapperNodeState.ts";
import {Node} from "./Node.svelte.ts";
import type {NodeStatus} from "./NodeStatus.ts";
import type {NodeVisitor} from "./NodeVisitor.ts";
import {NoInputAndNoMapperMapperNodeState} from "./NoInputAndNoMapperMapperNodeState.ts";
export class MapperNode extends Node {
	private readonly nextNodes: readonly MapperNode[];
	private _state: MapperNodeState = $state.raw() as MapperNodeState;
	public get state(): MapperNodeState {
		return this._state;
	}
	public get status(): NodeStatus {
		return this._state.status;
	}
	public constructor(position: Coordinates) {
		super("Mapper", position);
		this.position = position;
		this.nextNodes = [];
		this._state = new NoInputAndNoMapperMapperNodeState();
	}
	public setMapper(mapper: Mapper): void {
		this._state = this._state.setMapper(mapper, this.nextNodes);
	}
	public unsetInput(): void {
		this._state = this._state.unsetInput(this.nextNodes);
	}
	public unsetMapper(): void {
		this._state = this._state.unsetMapper(this.nextNodes);
	}
	public setInput(input: ImageData): void {
		this._state = this._state.setInput(input, this.nextNodes);
	}
	public override acceptVisitor<Result>(visitor: NodeVisitor<Result>): Result {
		return visitor.visitMapper(this);
	}
}
