import type {Coordinates} from "./Coordinates.ts";
import type {Edge} from "./Edge.ts";
import type {Mapper} from "./Mapper.ts";
import {Node} from "./Node.svelte.ts";
import {NoInputAndNoMapperMapperNodeState} from "./NoInputAndNoMapperMapperNodeState.ts";
import type {SupportedMapperNodeState} from "./SupportedMapperNodeState.ts";
export class MapperNode extends Node {
	public inputEdge: Edge | null = $state.raw() as Edge | null;
	public state: SupportedMapperNodeState =
		$state.raw() as SupportedMapperNodeState;
	public constructor(position: Coordinates) {
		super("Mapper", position);
		this.position = position;
		this.state = new NoInputAndNoMapperMapperNodeState();
		this.inputEdge = null;
	}
	public setMapper(mapper: Mapper): void {
		this.state = this.state.setMapper(mapper);
	}
	public unsetInput(): void {
		this.state = this.state.unsetInput();
	}
	public unsetMapper(): void {
		this.state = this.state.unsetMapper();
	}
	public setInput(input: ImageData): void {
		this.state = this.state.setInput(input);
	}
}
