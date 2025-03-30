import type {Coordinates} from "./Coordinates.ts";
import type {MapperNode} from "./MapperNode.svelte.ts";
import {Node} from "./Node.ts";
import {checkIfUrlIsValid} from "./checkIfUrlIsValid.ts";
import type {NodeVisitor} from "./NodeVisitor.ts";
import type {NodeStatus} from "./NodeStatus.ts";
import type {FromUrlLoaderNodeState} from "./FromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "./NoUrlFromUrlLoaderNodeState.ts";
export class FromUrlLoaderNode extends Node {
	private readonly nextNodes: readonly MapperNode[];
	private state: FromUrlLoaderNodeState =
		$state.raw() as FromUrlLoaderNodeState;
	public status: NodeStatus = $derived(this.state.status);
	public constructor(position: Coordinates) {
		super("From URL loader", position);
		this.nextNodes = [];
		this.state = new NoUrlFromUrlLoaderNodeState();
	}
	public async setUrl(url: string): Promise<void> {
		if (checkIfUrlIsValid(url)) {
			const loadingInProgressState = this.state.loadingInProgress(
				url,
				this.nextNodes,
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
					this.state = loadingInProgressState.loadingSucceeded(
						image,
						url,
						this.nextNodes,
					);
				} else {
					this.state = loadingInProgressState.loadingFailed(url);
				}
			}
		} else {
			this.state = this.state.invalidUrl(url, this.nextNodes);
		}

		// switch (this.state.kind) {
		// 	case "noUrl": {
		// 		if (checkIfUrlIsValid(url)) {
		// 			const stateWhenStartedFetching = this.state;
		// 			const imageElement = new Image();
		// 			imageElement.crossOrigin = "Anonymous";
		// 			imageElement.src = url;
		// 			const isLoadedSuccessfully = await new Promise<boolean>((resolve) => {
		// 				imageElement.onload = () => {
		// 					resolve(true);
		// 				};
		// 				imageElement.onerror = () => {
		// 					resolve(false);
		// 				};
		// 			});
		// 			if (this.state === stateWhenStartedFetching) {
		// 				if (isLoadedSuccessfully) {
		// 					const canvas = document.createElement("canvas");
		// 					canvas.width = imageElement.width;
		// 					canvas.height = imageElement.height;
		// 					const canvasContext = canvas.getContext(
		// 						"2d",
		// 					) as CanvasRenderingContext2D;
		// 					canvasContext.drawImage(imageElement, 0, 0);
		// 					const image = canvasContext.getImageData(
		// 						0,
		// 						0,
		// 						canvas.width,
		// 						canvas.height,
		// 					);
		// 					this.state = {kind: "loaded", status: "done", data: {image, url}};
		// 					for (const node of this.nextNodes) {
		// 						node.input(this.state.data.image);
		// 					}
		// 				} else {
		// 					this.state = {
		// 						kind: "fetchingFailed",
		// 						status: "errored",
		// 						data: {url},
		// 					};
		// 				}
		// 			}
		// 		} else {
		// 			this.state = {kind: "invalidUrl", status: "errored", data: {url}};
		// 		}
		// 		break;
		// 	}
		// 	case "invalidUrl": {
		// 		if (checkIfUrlIsValid(url)) {
		// 			const stateWhenStartedFetching = this.state;
		// 			const imageElement = new Image();
		// 			imageElement.crossOrigin = "Anonymous";
		// 			imageElement.src = url;
		// 			const isLoadedSuccessfully = await new Promise<boolean>((resolve) => {
		// 				imageElement.onload = () => {
		// 					resolve(true);
		// 				};
		// 				imageElement.onerror = () => {
		// 					resolve(false);
		// 				};
		// 			});
		// 			if (this.state === stateWhenStartedFetching) {
		// 				if (isLoadedSuccessfully) {
		// 					const canvas = document.createElement("canvas");
		// 					canvas.width = imageElement.width;
		// 					canvas.height = imageElement.height;
		// 					const canvasContext = canvas.getContext(
		// 						"2d",
		// 					) as CanvasRenderingContext2D;
		// 					canvasContext.drawImage(imageElement, 0, 0);
		// 					const image = canvasContext.getImageData(
		// 						0,
		// 						0,
		// 						canvas.width,
		// 						canvas.height,
		// 					);
		// 					this.state = {kind: "loaded", status: "done", data: {image, url}};
		// 					for (const node of this.nextNodes) {
		// 						node.input(this.state.data.image);
		// 					}
		// 				} else {
		// 					this.state = {
		// 						kind: "fetchingFailed",
		// 						status: "errored",
		// 						data: {url},
		// 					};
		// 				}
		// 			}
		// 		} else {
		// 			this.state = {kind: "invalidUrl", status: "errored", data: {url}};
		// 		}
		// 		break;
		// 	}
		// 	case "fetching": {
		// 		if (checkIfUrlIsValid(url)) {
		// 			const stateWhenStartedFetching = this.state;
		// 			const imageElement = new Image();
		// 			imageElement.crossOrigin = "Anonymous";
		// 			imageElement.src = url;
		// 			const isLoadedSuccessfully = await new Promise<boolean>((resolve) => {
		// 				imageElement.onload = () => {
		// 					resolve(true);
		// 				};
		// 				imageElement.onerror = () => {
		// 					resolve(false);
		// 				};
		// 			});
		// 			if (this.state === stateWhenStartedFetching) {
		// 				if (isLoadedSuccessfully) {
		// 					const canvas = document.createElement("canvas");
		// 					canvas.width = imageElement.width;
		// 					canvas.height = imageElement.height;
		// 					const canvasContext = canvas.getContext(
		// 						"2d",
		// 					) as CanvasRenderingContext2D;
		// 					canvasContext.drawImage(imageElement, 0, 0);
		// 					const image = canvasContext.getImageData(
		// 						0,
		// 						0,
		// 						canvas.width,
		// 						canvas.height,
		// 					);
		// 					this.state = {kind: "loaded", status: "done", data: {image, url}};
		// 					for (const node of this.nextNodes) {
		// 						node.input(this.state.data.image);
		// 					}
		// 				} else {
		// 					this.state = {
		// 						kind: "fetchingFailed",
		// 						status: "errored",
		// 						data: {url},
		// 					};
		// 				}
		// 			}
		// 		} else {
		// 			this.state = {kind: "invalidUrl", status: "errored", data: {url}};
		// 		}
		// 		break;
		// 	}
		// 	case "loaded": {
		// 		if (checkIfUrlIsValid(url)) {
		// 			for (const node of this.nextNodes) {
		// 				node.invalidate();
		// 			}
		// 			const stateWhenStartedFetching = this.state;
		// 			const imageElement = new Image();
		// 			imageElement.crossOrigin = "Anonymous";
		// 			imageElement.src = url;
		// 			const isLoadedSuccessfully = await new Promise<boolean>((resolve) => {
		// 				imageElement.onload = () => {
		// 					resolve(true);
		// 				};
		// 				imageElement.onerror = () => {
		// 					resolve(false);
		// 				};
		// 			});
		// 			if (this.state === stateWhenStartedFetching) {
		// 				if (isLoadedSuccessfully) {
		// 					const canvas = document.createElement("canvas");
		// 					canvas.width = imageElement.width;
		// 					canvas.height = imageElement.height;
		// 					const canvasContext = canvas.getContext(
		// 						"2d",
		// 					) as CanvasRenderingContext2D;
		// 					canvasContext.drawImage(imageElement, 0, 0);
		// 					const image = canvasContext.getImageData(
		// 						0,
		// 						0,
		// 						canvas.width,
		// 						canvas.height,
		// 					);
		// 					this.state = {kind: "loaded", status: "done", data: {image, url}};
		// 					for (const node of this.nextNodes) {
		// 						node.input(this.state.data.image);
		// 					}
		// 				} else {
		// 					this.state = {
		// 						kind: "fetchingFailed",
		// 						status: "errored",
		// 						data: {url},
		// 					};
		// 				}
		// 			}
		// 		} else {
		// 			this.state = {kind: "invalidUrl", status: "errored", data: {url}};
		// 		}
		// 		break;
		// 	}
		// }
	}
	public override acceptVisitor<Result>(visitor: NodeVisitor<Result>): Result {
		return visitor.visitFromUrlLoader(this);
	}
	// public async load(url: string): Promise<void> {
	// 	this._status = "processing";
	// 	this.image = null;
	// 	for (const node of this.nextNodes) {
	// 		node.invalidate();
	// 	}

	//
	// 		for (const node of this.nextNodes) {
	// 			node.input(this.image);
	// 		}
	// 		this._status = "done";
	// 	} else {
	// 		this._status = "errored";
	// 	}
	// }
}
