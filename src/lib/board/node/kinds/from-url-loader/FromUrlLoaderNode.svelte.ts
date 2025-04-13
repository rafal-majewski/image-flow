import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import type {SupportedOutputNode} from "../../SupportedOutputNode.ts";
import type {NodeId} from "../../id/NodeId.ts";
import {checkIfUrlIsValid} from "./checking-if-url-is-valid/checkIfUrlIsValid.ts";
import type {SupportedFromUrlLoaderNodeState} from "./state/SupportedFromUrlLoaderNodeState.ts";
import {LoadingSucceededFromUrlLoaderNodeState} from "./state/kinds/loading-succeeded/LoadingSucceededFromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "./state/kinds/no-url/NoUrlFromUrlLoaderNodeState.ts";
export class FromUrlLoaderNode extends Node {
	private constructor(
		id: NodeId,
		outputNodes: readonly SupportedOutputNode[],
		position: Coordinates,
		state: SupportedFromUrlLoaderNodeState,
	) {
		super(id, position);
		this.outputNodes = outputNodes;
		this.state = state;
	}
	public outputNodes: readonly SupportedOutputNode[] =
		$state() as readonly SupportedOutputNode[];
	public state: SupportedFromUrlLoaderNodeState =
		$state() as SupportedFromUrlLoaderNodeState;
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
			imageElement.src = url;
			const isLoadedSuccessfully = await new Promise<boolean>((resolve) => {
				imageElement.onload = () => {
					resolve(true);
				};
				imageElement.onerror = () => {
					resolve(false);
				};
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
	public addOutputNode(outputNode: SupportedOutputNode): void {
		this.outputNodes = [...this.outputNodes, outputNode];
		// TODO: Make it a method on State
		if (this.state instanceof LoadingSucceededFromUrlLoaderNodeState) {
			outputNode.setInputNodeWithInputImage(this.state.image, this);
		} else {
			outputNode.setInputNode(this);
		}
	}
	public static create(id: NodeId, position: Coordinates): FromUrlLoaderNode {
		return new FromUrlLoaderNode(
			id,
			[],
			position,
			new NoUrlFromUrlLoaderNodeState(),
		);
	}
	public override disconnect(): void {
		for (const outputNode of this.outputNodes) {
			outputNode.unsetInputNode();
		}
		this.outputNodes = [];
	}
}
