import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {InputNode} from "../../InputNode.ts";
import {Node} from "../../Node.svelte.ts";
import type {OutputNode} from "../../OutputNode.ts";
import type {NodeId} from "../../id/NodeId.ts";
import {checkIfUrlIsValid} from "./checking-if-url-is-valid/checkIfUrlIsValid.ts";
import type {SupportedFromUrlLoaderNodeState} from "./state/SupportedFromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "./state/kinds/no-url/NoUrlFromUrlLoaderNodeState.ts";
export class FromUrlLoaderNode extends Node implements InputNode {
	private constructor(
		id: NodeId,
		position: Coordinates,
		outputNodes: readonly OutputNode[],
		state: SupportedFromUrlLoaderNodeState,
	) {
		super(id, position);
		this.outputNodes = outputNodes;
		this.state = state;
	}
	public outputNodes: readonly OutputNode[] =
		$state.raw() as readonly OutputNode[];
	public state: SupportedFromUrlLoaderNodeState =
		$state.raw() as SupportedFromUrlLoaderNodeState;
	public readonly status = $derived(this.state.status);
	public async setUrl(url: string): Promise<void> {
		if (checkIfUrlIsValid(url)) {
			const loadingInProgressState = this.state.setValidUrl(
				url,
				this.outputNodes,
			);
			this.state = loadingInProgressState;
			const imageElement = new Image();
			imageElement.crossOrigin = "Anonymous";
			const isLoadedSuccessfully = await new Promise<boolean>((resolve) => {
				imageElement.onload = () => {
					resolve(true);
				};
				imageElement.onerror = () => {
					resolve(false);
				};
				imageElement.src = url;
			});
			if (this.state === loadingInProgressState) {
				if (isLoadedSuccessfully) {
					const canvas = document.createElement("canvas");
					canvas.width = imageElement.width;
					canvas.height = imageElement.height;
					const canvasContext = canvas.getContext(
						"2d",
					) as CanvasRenderingContext2D;
					canvasContext.drawImage(imageElement, 0, 0);
					const image = canvasContext.getImageData(
						0,
						0,
						canvas.width,
						canvas.height,
					);
					this.state = loadingInProgressState.succeedLoading(
						image,
						this.outputNodes,
					);
				} else {
					this.state = loadingInProgressState.failLoading(this.outputNodes);
				}
			}
		} else {
			this.state = this.state.setInvalidUrl(url, this.outputNodes);
		}
	}
	public addOutputNode(outputNodeToAdd: OutputNode): void {
		this.outputNodes = [...this.outputNodes, outputNodeToAdd];
	}
	public connectOutputNode(outputNodeToConnect: OutputNode): void {
		this.state.connectOutputNode(this, outputNodeToConnect);
	}
	public static create(id: NodeId, position: Coordinates): FromUrlLoaderNode {
		return new FromUrlLoaderNode(
			id,
			position,
			[],
			new NoUrlFromUrlLoaderNodeState(),
		);
	}
	public override disconnect(): void {
		for (const outputNode of this.outputNodes) {
			outputNode.unsetInputNode();
		}
		this.outputNodes = [];
	}
	public deleteOutputNode(outputNodeToDelete: OutputNode): void {
		this.outputNodes = this.outputNodes.filter(
			(outputNode) => outputNode !== outputNodeToDelete,
		);
	}
}
