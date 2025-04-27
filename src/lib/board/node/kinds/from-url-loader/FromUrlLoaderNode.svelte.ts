import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import type {OutputNode} from "../../OutputNode.ts";
import {checkIfUrlIsValid} from "./checking-if-url-is-valid/checkIfUrlIsValid.ts";
import {NoUrlFromUrlLoaderNodeState} from "./state/kinds/no-url/NoUrlFromUrlLoaderNodeState.ts";
import type {SupportedFromUrlLoaderNodeState} from "./state/SupportedFromUrlLoaderNodeState.ts";
export class FromUrlLoaderNode extends Node {
	public constructor(position: Coordinates) {
		super(position);
		this.state = new NoUrlFromUrlLoaderNodeState();
	}
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
	protected override updateOutputNodeAfterAdding(
		outputNodeToUpdate: OutputNode,
	): void {
		this.state.updateOutputNodeAfterAdding(this, outputNodeToUpdate);
	}
	public override disconnect(): void {
		throw new Error("Not implemented.");
	}
}
