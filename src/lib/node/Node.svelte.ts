import type {Coordinates} from "../coordinates/Coordinates.ts";
import {Edge} from "../edge/Edge.ts";
import type {Component} from "svelte";
import type {SupportedBoardMode} from "../mode/supported/SupportedBoardMode.ts";
import type {UnhandledEdgeBuilder} from "../edge/builder/unhandled/UnhandledEdgeBuilder.ts";
import type {NodeState} from "./state/NodeState.ts";
import type {NodeId} from "./id/NodeId.ts";
import {generateNodeId} from "./id/generation/generateNodeId.ts";
import type {OperatingNode} from "./operating/OperatingNode.svelte.ts";
export abstract class Node<NodeStateToUse extends NodeState> {
	protected constructor(
		displayer: Component<{
			onDeleteRequest: (node: Node<NodeState>) => void;
			boardMode: null | SupportedBoardMode;
			onMouseLeftButtonDown: (
				node: Node<NodeState>,
				mouseCursorInViewportPosition: Coordinates,
			) => void;
			onMouseLeftButtonUp: (node: Node<NodeState>) => void;
			onSetInputRequest: (
				nodeInRequest: OperatingNode<number>,
				nodeInRequestInputIndex: number,
				inViewportPosition: Coordinates,
			) => void;
			onSetOutputRequest: (
				nodeInRequest: Node<NodeState>,
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
		this.outputEdges = $state.raw([]);
		this.position = $state.raw(position);
		this.state = $state.raw(state);
	}
	public addOutputEdge(edge: Edge): void {
		this.outputEdges = [...this.outputEdges, edge];
	}
	public deleteOutputEdge(edge: Edge): void {
		this.outputEdges = this.outputEdges.filter((edge) => {
			return edge !== edge;
		});
	}
	public disconnect(): void {
		this.disconnectOutputEdges();
		this.disconnectInputEdges();
	}
	public abstract disconnectInputEdges(): void;
	public disconnectOutputEdges(): void {
		for (const edge of this.outputEdges) {
			edge.delete();
		}
	}
	public readonly displayer: Component<{
		onDeleteRequest: (node: Node<NodeState>) => void;
		boardMode: null | SupportedBoardMode;
		onMouseLeftButtonDown: (
			node: Node<NodeState>,
			mouseCursorInViewportPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: Node<NodeState>) => void;
		onSetInputRequest: (
			nodeInRequest: OperatingNode<number>,
			nodeInRequestInputIndex: number,
			inViewportPosition: Coordinates,
		) => void;
		onSetOutputRequest: (
			nodeInRequest: Node<NodeState>,
			inViewportPosition: Coordinates,
		) => void;
	}>;
	public readonly id: NodeId;
	public readonly name: string;
	/**
	 * Do not reassign externally.
	 */
	public outputEdges: readonly Edge[];
	public position: Coordinates;
	/**
	 * Do not reassign externally.
	 */
	public state: NodeStateToUse;
	public useEdgeBuilder(builder: UnhandledEdgeBuilder): void {
		this.state.useEdgeBuilder(builder.handleInput(this));
	}
}
