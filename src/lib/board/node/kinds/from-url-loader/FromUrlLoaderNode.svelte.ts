import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import {checkIfUrlIsValid} from "./checking-if-url-is-valid/checkIfUrlIsValid.ts";
import type {FromUrlLoaderNodeState} from "./state/FromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "./state/kinds/no-url/NoUrlFromUrlLoaderNodeState.ts";
export class FromUrlLoaderNode extends Node {
	public constructor(position: Coordinates) {
		super(position);
		this.state = new NoUrlFromUrlLoaderNodeState();
	}
	public override disconnect(): void {
		this.disconnectOutputNodes();
	}
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
	public state: FromUrlLoaderNodeState = $state.raw() as FromUrlLoaderNodeState;
	public readonly status = $derived(this.state.status);
	protected override updateOutputEdgeAfterAdding(
		outputEdgeToUpdate: OutputEdge,
	): void {
		this.state.updateOutputEdgeAfterAdding(this, outputNodeToUpdate);
	}
}
