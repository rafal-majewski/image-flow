import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {OutputNode} from "../../OutputNode.ts";
import {Node} from "../../Node.svelte.ts";
import {NoFileFromFileLoaderNodeState} from "./state/kinds/no-file/NoFileFromFileLoaderNodeState.ts";
import type {FromFileLoaderNodeState} from "./state/FromFileLoaderNodeState.ts";
export class FromFileLoaderNode extends Node {
	public constructor(position: Coordinates) {
		super(position);
		this.state = new NoFileFromFileLoaderNodeState();
	}
	public state: FromFileLoaderNodeState =
		$state.raw() as FromFileLoaderNodeState;
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
	protected override updateOutputNodeAfterAdding(
		outputNodeToUpdate: OutputNode,
	): void {
		this.state.updateOutputNodeAfterAdding(this, outputNodeToUpdate);
	}
	public override disconnect(): void {
		this.disconnectOutputNodes();
	}
}
