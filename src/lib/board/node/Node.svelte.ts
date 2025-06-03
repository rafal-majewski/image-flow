import type {Coordinates} from "../coordinates/Coordinates.ts";
import type {WithoutImageEdge} from "../edge/implementations/without-image/WithoutImageEdge.ts";
import {generateOperatableNodeId} from "./id/generation/generateOperatableNodeId.ts";
import {WithImageEdge} from "../edge/implementations/with-image/WithImageEdge.ts";
import type {InEdgePut} from "../edge/put/implementations/in/InEdgePut.ts";
import type {NodeState} from "./state/NodeState.ts";
import type {UnhandledEdgeBuilder} from "../edge/builder/implementations/unhandled/UnhandledEdgeBuilder.ts";
import type {OutEdgePut} from "../edge/put/implementations/out/OutEdgePut.ts";
import type {Edge} from "../edge/Edge.ts";
import type {Component} from "svelte";
import type {SupportedBoardMode} from "../mode/supported/SupportedBoardMode.ts";
export abstract class Node<InputEdgeCount extends number>
	implements InEdgePut, OutEdgePut
{
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
		state: NodeState<InputEdgeCount, WithImageEdge | WithoutImageEdge>,
	) {
		this.displayer = (...parameters) => {
			// @ts-expect-error: TODO
			parameters[1].node = this;
			// @ts-expect-error: TODO
			return displayer(...parameters);
		};
		this.id = generateOperatableNodeId();
		this.inputEdges = new Array(inputEdgeCount).fill(
			null,
		) as unknown as readonly null[] & Readonly<{length: InputEdgeCount}>;
		this.name = name;
		this.position = position;
		this.state = state;
		console.log(this.state);
	}
	public addOutputEdge(builder: UnhandledEdgeBuilder): void {
		this.state = this.state.addOutputEdge(builder.handleInput(this));
	}
	public deleteOutputEdge(edgeToBeDeleted: Edge): void {
		this.state = this.state.deleteOutputEdge(edgeToBeDeleted);
	}
	public readonly displayer: Component<{
		onDeleteRequest: (node: Node<number>) => void;
		boardMode: null | SupportedBoardMode;
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
	}>;
	public readonly id: string;
	/**
	 * Do not assign externally.
	 */
	public inputEdges: readonly (null | WithImageEdge | WithoutImageEdge)[]
		& Readonly<{length: InputEdgeCount}> = $state.raw() as readonly (
		| null
		| WithImageEdge
		| WithoutImageEdge
	)[]
		& Readonly<{length: InputEdgeCount}>;
	public readonly name: string;
	/**
	 * Do not reassign externally.
	 */
	public position: Coordinates = $state.raw() as Coordinates;
	public setInputEdge(inputEdge: Edge): void {
		this.updateInputEdges(
			this.inputEdges.with(inputEdge.index, inputEdge) as unknown as readonly (
				| null
				| WithImageEdge
				| WithoutImageEdge
			)[]
				& Readonly<{length: InputEdgeCount}>,
		);
	}
	/**
	 * Do not reassign externally.
	 */
	public state: NodeState<InputEdgeCount, WithImageEdge | WithoutImageEdge> =
		$state.raw() as NodeState<InputEdgeCount, WithImageEdge | WithoutImageEdge>;
	public unsetInputEdge(inputEdgeIndex: number): void {
		this.updateInputEdges(
			this.inputEdges.with(inputEdgeIndex, null) as unknown as readonly (
				| null
				| WithImageEdge
				| WithoutImageEdge
			)[]
				& Readonly<{length: InputEdgeCount}>,
		);
	}
	private updateInputEdges(
		newInputEdges: readonly (null | WithImageEdge | WithoutImageEdge)[]
			& Readonly<{length: InputEdgeCount}>,
	): void {
		this.inputEdges = newInputEdges;
		if (
			this.inputEdges.every(
				(
					edge: WithImageEdge | WithoutImageEdge | null,
				): edge is WithImageEdge =>
					edge !== null && edge instanceof WithImageEdge,
			)
		) {
			this.state = this.state.validateInputImages(
				this.inputEdges.map(
					(edge: WithImageEdge): ImageData => edge.image,
				) as unknown as readonly ImageData[]
					& Readonly<{length: InputEdgeCount}>,
			);
		} else {
			this.state = this.state.invalidateInputImages();
		}
	}
}
