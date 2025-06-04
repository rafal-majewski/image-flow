import type {Coordinates} from "../coordinates/Coordinates.ts";
import {generateOperatableNodeId} from "./id/generation/generateOperatableNodeId.ts";
import {Edge} from "../edge/Edge.ts";
import type {Component} from "svelte";
import type {SupportedBoardMode} from "../mode/supported/SupportedBoardMode.ts";
import type {EdgeBuilder} from "../edge/builder/EdgeBuilder.ts";
import type {UnhandledEdgeBuilder} from "../edge/builder/implementations/unhandled/UnhandledEdgeBuilder.ts";
import type {HandledEdgeBuilder} from "../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
export abstract class Node<InputEdgeCount extends number> {
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
		this.outputEdges = [];
		this.position = position;
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
	public inputEdges: readonly (null | Edge)[]
		& Readonly<{length: InputEdgeCount}> =
		$state.raw() as readonly (null | Edge)[]
			& Readonly<{length: InputEdgeCount}>;
	public abstract invalidateInputImages(): void;
	public readonly name: string;
	/**
	 * Do not reassign externally.
	 */
	public outputEdges: readonly Edge[];
	public deleteOutputEdge(outputEdgeToBeDeleted: Edge): void {
		this.outputEdges = this.outputEdges.filter(
			(edge) => edge !== outputEdgeToBeDeleted,
		);
	}
	public position: Coordinates = $state.raw() as Coordinates;
	public setInputEdge(index: number, edge: Edge): void {
		this.inputEdges = this.inputEdges.with(
			index,
			edge,
		) as unknown as readonly (null | Edge)[]
			& Readonly<{length: InputEdgeCount}>;
	}
	public unsetInputEdge(index: number): void {
		this.inputEdges = this.inputEdges.with(
			index,
			null,
		) as unknown as readonly (null | Edge)[]
			& Readonly<{length: InputEdgeCount}>;
	}
	public validateInputEdges(): void {
		if (this.inputEdges.every((edge) => edge !== null)) {
			const inputImages = (
				this.inputEdges as readonly Edge[] & Readonly<{length: InputEdgeCount}>
			).map((edge) => edge.image) as unknown as readonly ImageData[]
				& Readonly<{length: InputEdgeCount}>;
			if (inputImages.every((image) => image !== null)) {
				this.validateInputImages(inputImages);
			}
		}
	}
	public addOutputEdge(edge: Edge): void {
		this.outputEdges = [...this.outputEdges, edge];
	}
	protected abstract validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: InputEdgeCount}>,
	): void;
	public handleEdgeBuilder(builder: UnhandledEdgeBuilder): void {
		this.useEdgeBuilder(builder.handleInput(this));
	}
	public abstract useEdgeBuilder(builder: HandledEdgeBuilder): void;
}
