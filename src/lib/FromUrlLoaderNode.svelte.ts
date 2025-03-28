import type {Coordinates} from "./Coordinates.ts";
import type {InputterNode} from "./InputterNode.ts";
import type {Node} from "./Node.ts";
import type {NodeStatus} from "./NodeStatus.ts";
export class FromUrlLoaderNode implements Node {
	public readonly name;
	public readonly id: string;
	public image: ImageData | null;
	public readonly position: Coordinates;
	private readonly nextNodes: readonly InputterNode[];
	private _status: NodeStatus = $state() as NodeStatus;
	public get status(): NodeStatus {
		return this._status;
	}
	public constructor(id: string, position: Coordinates) {
		this.name = "FromUrlLoader";
		this.id = id;
		this.position = position;
		this.image = null;
		this.nextNodes = [];
		this._status = "unconfigured";
	}
	public async load(url: string): Promise<void> {
		this._status = "processing";
		this.image = null;
		for (const node of this.nextNodes) {
			node.invalidate();
		}
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
		if (isLoadedSuccessfully) {
			const canvas = document.createElement("canvas");
			canvas.width = imageElement.width;
			canvas.height = imageElement.height;
			const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
			canvasContext.drawImage(imageElement, 0, 0);
			this.image = canvasContext.getImageData(
				0,
				0,
				canvas.width,
				canvas.height,
			);
			for (const node of this.nextNodes) {
				node.input(this.image);
			}
			this._status = "done";
		} else {
			this._status = "errored";
		}
	}
}
