import type {Coordinates} from "../../coordinates/Coordinates.ts";
import type {HandledEdgeBuilder} from "../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {SupportedBoardMode} from "../../mode/supported/SupportedBoardMode.ts";
import {Node} from "../Node.svelte.ts";
import type {NodeState} from "./state/NodeState.ts";
import type {Component} from "svelte";
export abstract class WithStateNode<
	InputEdgeCount extends number,
	StateToUse extends NodeState<InputEdgeCount>,
> extends Node<InputEdgeCount> {
	public constructor(
		displayer: Component<{
			onDeleteRequest: (node: Node<number>) => void;
			boardMode: null | SupportedBoardMode;
			node: Node<number>;
			onMouseLeftButtonDown: (
				node: Node<number>,
				mouseCursorInViewportPosition: Coordinates,
			) => void;
			onMouseLeftButtonUp: (node: Node<number>) => void;
			onSetInputRequest: (
				index: number,
				nodeInRequest: Node<number>,
				inViewportPosition: Coordinates,
			) => void;
			onSetOutputRequest: (
				nodeInRequest: Node<number>,
				inViewportPosition: Coordinates,
			) => void;
		}>,
		inputEdgeCount: InputEdgeCount,
		name: string,
		position: Coordinates,
		state: StateToUse,
	) {
		super(displayer, inputEdgeCount, name, position);
		this.state = state;
	}
	/**
	 * Do not reassign externally.
	 */
	public state: StateToUse = $state.raw() as StateToUse;
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		this.state.useEdgeBuilder(builder);
	}
}
