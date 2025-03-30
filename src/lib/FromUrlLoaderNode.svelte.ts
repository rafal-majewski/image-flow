import type {Coordinates} from "./Coordinates.ts";
import type {MapperNode} from "./MapperNode.svelte.ts";
import {Node} from "./Node.svelte.ts";
import {checkIfUrlIsValid} from "./checkIfUrlIsValid.ts";
import type {NodeVisitor} from "./NodeVisitor.ts";
import type {FromUrlLoaderNodeState} from "./FromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "./NoUrlFromUrlLoaderNodeState.ts";
import type {NodeStatus} from "./NodeStatus.ts";
export class FromUrlLoaderNode extends Node {
	private readonly nextNodes: readonly MapperNode[];
	private _state: FromUrlLoaderNodeState =
		$state.raw() as FromUrlLoaderNodeState;
	public get state(): FromUrlLoaderNodeState {
		return this._state;
	}
	public get status(): NodeStatus {
		return this._state.status;
	}
	public constructor(position: Coordinates) {
		super("From URL loader", position);
		this.nextNodes = [];
		this._state = new NoUrlFromUrlLoaderNodeState();
	}
	public async setUrl(url: string): Promise<void> {
		if (checkIfUrlIsValid(url)) {
			const loadingInProgressState = this._state.loadingInProgress(
				url,
				this.nextNodes,
			);
			this._state = loadingInProgressState;
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
			if (this._state === loadingInProgressState) {
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
					this._state = loadingInProgressState.loadingSucceeded(
						image,
						url,
						this.nextNodes,
					);
				} else {
					this._state = loadingInProgressState.loadingFailed(url);
				}
			}
		} else {
			this._state = this._state.invalidUrl(url, this.nextNodes);
		}

		// switch (this._state.kind) {
		// 	case "noUrl": {
		// 		if (checkIfUrlIsValid(url)) {
		// 			const stateWhenStartedFetching = this._state;
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
		// 			if (this._state === stateWhenStartedFetching) {
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
		// 					this._state = {kind: "loaded", status: "done", data: {image, url}};
		// 					for (const node of this.nextNodes) {
		// 						node.input(this._state.data.image);
		// 					}
		// 				} else {
		// 					this._state = {
		// 						kind: "fetchingFailed",
		// 						status: "errored",
		// 						data: {url},
		// 					};
		// 				}
		// 			}
		// 		} else {
		// 			this._state = {kind: "invalidUrl", status: "errored", data: {url}};
		// 		}
		// 		break;
		// 	}
		// 	case "invalidUrl": {
		// 		if (checkIfUrlIsValid(url)) {
		// 			const stateWhenStartedFetching = this._state;
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
		// 			if (this._state === stateWhenStartedFetching) {
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
		// 					this._state = {kind: "loaded", status: "done", data: {image, url}};
		// 					for (const node of this.nextNodes) {
		// 						node.input(this._state.data.image);
		// 					}
		// 				} else {
		// 					this._state = {
		// 						kind: "fetchingFailed",
		// 						status: "errored",
		// 						data: {url},
		// 					};
		// 				}
		// 			}
		// 		} else {
		// 			this._state = {kind: "invalidUrl", status: "errored", data: {url}};
		// 		}
		// 		break;
		// 	}
		// 	case "fetching": {
		// 		if (checkIfUrlIsValid(url)) {
		// 			const stateWhenStartedFetching = this._state;
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
		// 			if (this._state === stateWhenStartedFetching) {
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
		// 					this._state = {kind: "loaded", status: "done", data: {image, url}};
		// 					for (const node of this.nextNodes) {
		// 						node.input(this._state.data.image);
		// 					}
		// 				} else {
		// 					this._state = {
		// 						kind: "fetchingFailed",
		// 						status: "errored",
		// 						data: {url},
		// 					};
		// 				}
		// 			}
		// 		} else {
		// 			this._state = {kind: "invalidUrl", status: "errored", data: {url}};
		// 		}
		// 		break;
		// 	}
		// 	case "loaded": {
		// 		if (checkIfUrlIsValid(url)) {
		// 			for (const node of this.nextNodes) {
		// 				node.invalidate();
		// 			}
		// 			const stateWhenStartedFetching = this._state;
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
		// 			if (this._state === stateWhenStartedFetching) {
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
		// 					this._state = {kind: "loaded", status: "done", data: {image, url}};
		// 					for (const node of this.nextNodes) {
		// 						node.input(this._state.data.image);
		// 					}
		// 				} else {
		// 					this._state = {
		// 						kind: "fetchingFailed",
		// 						status: "errored",
		// 						data: {url},
		// 					};
		// 				}
		// 			}
		// 		} else {
		// 			this._state = {kind: "invalidUrl", status: "errored", data: {url}};
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
