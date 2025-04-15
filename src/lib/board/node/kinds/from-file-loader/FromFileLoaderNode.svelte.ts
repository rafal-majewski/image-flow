import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {NodeId} from "../../id/NodeId.ts";
import type {OutputNode} from "../../OutputNode.ts";
import {Node} from "../../Node.svelte.ts";
import {NoFileFromFileLoaderNodeState} from "./state/kinds/no-file/NoFileFromFileLoaderNodeState.ts";
import type {SupportedFromFileLoaderNodeState} from "./state/SupportedFromFileLoaderNodeState.ts";
import type {InputNode} from "../../InputNode.ts";
export class FromFileLoaderNode extends Node implements InputNode {
	private constructor(
		id: NodeId,
		position: Coordinates,
		outputNodes: readonly OutputNode[],
		state: SupportedFromFileLoaderNodeState,
	) {
		super(id, position);
		this.outputNodes = outputNodes;
		this.state = state;
	}
	public outputNodes: readonly OutputNode[] = $state() as readonly OutputNode[];
	public state: SupportedFromFileLoaderNodeState =
		$state() as SupportedFromFileLoaderNodeState;
	public readonly status = $derived(this.state.status);
	public async setFile(file: File): Promise<void> {
		const loadingInProgressState = this.state.setFile(file, this.outputNodes);
		this.state = loadingInProgressState;
		const imageDataUrl = await new Promise<string>((resolve) => {
			const reader = new FileReader();
			reader.onload = () => {
				resolve(reader.result as string);
			};
			reader.readAsDataURL(file);
		});
		const imageElement = new Image();
		const isLoadedSuccessfully = await new Promise<boolean>((resolve) => {
			imageElement.onload = () => {
				resolve(true);
			};
			imageElement.src = imageDataUrl;
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
			}
		}
	}
	public addOutputNode(outputNodeToAdd: OutputNode): void {
		this.outputNodes = [...this.outputNodes, outputNodeToAdd];
	}
	public connectOutputNode(outputNodeToConnect: OutputNode): void {
		this.state.connectOutputNode(this, outputNodeToConnect);
	}
	public static create(id: NodeId, position: Coordinates): FromFileLoaderNode {
		return new FromFileLoaderNode(
			id,
			position,
			[],
			new NoFileFromFileLoaderNodeState(),
		);
	}
	public override disconnect(): void {
		this.state = this.state.disconnect(this, this.outputNodes);
		this.outputNodes = [];
	}
	public deleteOutputNode(outputNodeToDelete: OutputNode): void {
		this.outputNodes = this.outputNodes.filter(
			(outputNode) => outputNode !== outputNodeToDelete,
		);
	}
}
