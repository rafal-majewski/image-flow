import type {Coordinates} from "../coordinates/Coordinates.ts";
import {Edge} from "../edge/Edge.ts";
import type {Component} from "svelte";
import type {SupportedBoardMode} from "../mode/supported/SupportedBoardMode.ts";
import type {UnhandledEdgeBuilder} from "../edge/builder/unhandled/UnhandledEdgeBuilder.ts";
import type {HandledEdgeBuilder} from "../edge/builder/handled/HandledEdgeBuilder.ts";
import type {NodeState} from "./state/NodeState.ts";
import type {NodeId} from "./id/NodeId.ts";
import {generateNodeId} from "./id/generation/generateNodeId.ts";
export abstract class Node<NodeStateToUse extends NodeState> {
	protected constructor(
		displayer: Component<{
			onDeleteRequest: (node: Node<NodeStateToUse>) => void;
			boardMode: null | SupportedBoardMode;
			onMouseLeftButtonDown: (
				node: Node<NodeStateToUse>,
				mouseCursorInViewportPosition: Coordinates,
			) => void;
			onMouseLeftButtonUp: (node: Node<NodeStateToUse>) => void;
			onSetInputRequest: (
				index: number,
				nodeInRequest: Node<NodeStateToUse>,
				inViewportPosition: Coordinates,
			) => void;
			onSetOutputRequest: (
				nodeInRequest: Node<NodeStateToUse>,
				inViewportPosition: Coordinates,
			) => void;
		}>,
		name: string,
		position: Coordinates,
		state: NodeStateToUse,
	) {
		this.displayer = displayer;
		this.id = generateNodeId();
		this.name = name;
		this.outputEdges = [];
		this.position = position;
		this.state = state;
	}
	addOutputEdge(edge: Edge): void;
	delete(): void;
	deleteOutputEdge(outputEdgeToBeDeleted: Edge): void;
	readonly displayer: Component<{
		onDeleteRequest: (node: Node<NodeStateToUse>) => void;
		boardMode: null | SupportedBoardMode;
		onMouseLeftButtonDown: (
			node: Node<NodeStateToUse>,
			mouseCursorInViewportPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: Node<NodeStateToUse>) => void;
		onSetInputRequest: (
			index: number,
			nodeInRequest: Node<NodeStateToUse>,
			inViewportPosition: Coordinates,
		) => void;
		onSetOutputRequest: (
			nodeInRequest: Node<NodeStateToUse>,
			inViewportPosition: Coordinates,
		) => void;
	}>;
	handleEdgeBuilder(builder: UnhandledEdgeBuilder): void;
	readonly id: NodeId;
	readonly name: string;
	public readonly outputEdges: readonly Edge[];
	position: Coordinates;
	/**
	 * Do not reassign externally.
	 */
	state: NodeStateToUse;
	useEdgeBuilder(builder: HandledEdgeBuilder): void;
}
