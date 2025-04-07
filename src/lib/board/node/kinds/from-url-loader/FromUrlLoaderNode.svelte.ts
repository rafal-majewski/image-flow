import {NoUrlFromUrlLoaderNodeState} from "./state/kinds/no-url/NoUrlFromUrlLoaderNodeState.ts";
import type {SupportedFromUrlLoaderNodeState} from "./SupportedFromUrlLoaderNodeState.ts";
import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import {checkIfUrlIsValid} from "./checking-if-url-is-valid/checkIfUrlIsValid.ts";
import type {Edge} from "../../../edge/Edge.ts";
export class FromUrlLoaderNode extends Node {
	public state: SupportedFromUrlLoaderNodeState =
		$state.raw() as SupportedFromUrlLoaderNodeState;
	public constructor(position: Coordinates) {
		super("From URL loader", position);
		this.state = new NoUrlFromUrlLoaderNodeState();
	}
	public async setUrl(url: string): Promise<void> {
		if (checkIfUrlIsValid(url)) {
			const loadingInProgressState = this.state.load(url, this.outputEdges);
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
						url,
						this.outputEdges,
					);
				} else {
					this.state = loadingInProgressState.failLoading(url);
				}
			}
		} else {
			this.state = this.state.setInvalidUrl(url, this.outputEdges);
		}
	}
	protected override handleNewOutputEdge(edge: Edge): void {
		console.log("handleNewOutputEdge", edge);
		this.state.handleNewOutputEdge(edge);
	}
}
