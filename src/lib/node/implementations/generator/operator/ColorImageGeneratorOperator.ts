import type {OperatorId} from "../../../operator/id/OperatorId.ts";
import {Operator} from "../../../operator/Operator.ts";
import ColorImageGeneratorOperatorDisplayer from "./ColorImageGeneratorOperatorDisplayer.svelte";
export class ColorImageGeneratorOperator extends Operator<0> {
	public constructor(id: OperatorId) {
		super(ColorImageGeneratorOperatorDisplayer, id, "Color Image Generator");
	}
	private color: string = "#000000";
	public generate(): ImageData {
		const canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Could not get canvas context");
		ctx.fillStyle = this.color;
		ctx.fillRect(0, 0, this.width, this.height);
		return ctx.getImageData(0, 0, this.width, this.height);
	}
	public getColor(): string {
		return this.color;
	}
	public getHeight(): number {
		return this.height;
	}
	public getWidth(): number {
		return this.width;
	}
	private height: number = 512;
	public *operate(
		inputImages: readonly ImageData[] & {readonly length: 0},
	): Generator<ImageData, ImageData, void> {
		const image = this.generate();
		yield image;
		return image;
	}
	public setColor(color: string): void {
		this.color = color;
	}
	public setHeight(height: number): void {
		this.height = height;
	}
	public setWidth(width: number): void {
		this.width = width;
	}
	private width: number = 512;
}
