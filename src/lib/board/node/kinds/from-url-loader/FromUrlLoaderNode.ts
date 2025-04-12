import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.ts";
import type {NodeId} from "../../id/NodeId.ts";
import type {NodeStatus} from "../../status/NodeStatus.ts";
export abstract class FromUrlLoaderNode extends Node {
	protected constructor(id: NodeId, position: Coordinates, status: NodeStatus) {
		super(id, position, status);
	}
	// public async setUrl(url: string): Promise<void> {
	// 	if (checkIfUrlIsValid(url)) {
	// 		const loadingInProgressState = this.state.load(url, this.outputNodes);
	// 		this.state = loadingInProgressState;
	// 		const imageElement = new Image();
	// 		imageElement.crossOrigin = "Anonymous";
	// 		imageElement.src = url;
	// 		const isLoadedSuccessfully = await new Promise<boolean>((resolve) => {
	// 			imageElement.onload = () => {
	// 				resolve(true);
	// 			};
	// 			imageElement.onerror = () => {
	// 				resolve(false);
	// 			};
	// 		});
	// 		if (this.state === loadingInProgressState) {
	// 			if (isLoadedSuccessfully) {
	// 				const canvas = document.createElement("canvas");
	// 				canvas.width = imageElement.width;
	// 				canvas.height = imageElement.height;
	// 				const canvasContext = canvas.getContext(
	// 					"2d",
	// 				) as CanvasRenderingContext2D;
	// 				canvasContext.drawImage(imageElement, 0, 0);
	// 				const image = canvasContext.getImageData(
	// 					0,
	// 					0,
	// 					canvas.width,
	// 					canvas.height,
	// 				);
	// 				this.state = loadingInProgressState.succeedLoading(
	// 					image,
	// 					url,
	// 					this.outputNodes,
	// 				);
	// 			} else {
	// 				this.state = loadingInProgressState.failLoading(url);
	// 			}
	// 		}
	// 	} else {
	// 		this.state = this.state.setInvalidUrl(url, this.outputNodes);
	// 	}
	// }
	// protected override handleNewOutputNode(outputNode: MapperNode): void {
	// 	this.state.handleNewOutputNode(outputNode);
	// }
}
