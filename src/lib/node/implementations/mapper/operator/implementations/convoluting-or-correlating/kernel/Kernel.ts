import {Coordinates} from "../../../../../../../coordinates/Coordinates.ts";
import {Dimensions} from "../../../../../../../dimensions/Dimensions.ts";
import {computeDimensions} from "./computing-dimensions/computeDimensions.ts";
import type {KernelMultipliers} from "./multipliers/KernelMultipliers.ts";
import {rotateAnchorPositionBy180DegreesClockwise} from "./rotating-anchor-position-by-180-degrees-clockwise/rotateAnchorPositionBy180DegreesClockwise.ts";
import {rotateMultipliersBy180DegreesClockwise} from "./rotating-multipliers-by-180-degrees-clockwise/rotateMultipliersBy180DegreesClockwise.ts";
export class Kernel
	implements
		Iterable<{relativeToAnchorPosition: Coordinates; multiplier: number}>
{
	public constructor(
		anchorPosition: Coordinates,
		multipliers: KernelMultipliers,
	) {
		this.anchorPosition = anchorPosition;
		this.multipliers = multipliers;
		this.dimensions = computeDimensions(multipliers);
	}
	readonly anchorPosition: Coordinates;
	readonly dimensions: Dimensions;
	readonly multipliers: KernelMultipliers;
	public rotateBy180DegreesClockwise(): Kernel {
		return new Kernel(
			rotateAnchorPositionBy180DegreesClockwise(
				this.anchorPosition,
				this.dimensions,
			),
			rotateMultipliersBy180DegreesClockwise(this.multipliers),
		);
	}
	*[Symbol.iterator](): IterableIterator<{
		relativeToAnchorPosition: Coordinates;
		multiplier: number;
	}> {
		for (
			let relativeToAnchorPositionY = -this.anchorPosition.y;
			relativeToAnchorPositionY
			< this.multipliers.length - this.anchorPosition.y;
			relativeToAnchorPositionY = relativeToAnchorPositionY + 1
		) {
			for (
				let relativeToAnchorPositionX = -this.anchorPosition.x;
				relativeToAnchorPositionX
				< this.multipliers[0].length - this.anchorPosition.x;
				relativeToAnchorPositionX = relativeToAnchorPositionX + 1
			) {
				const multiplier = (
					this.multipliers[
						relativeToAnchorPositionY + this.anchorPosition.y
					] as readonly [number, ...(readonly number[])]
				)[relativeToAnchorPositionX + this.anchorPosition.x] as number;
				const relativeToAnchorPosition = new Coordinates(
					relativeToAnchorPositionX,
					relativeToAnchorPositionY,
				);
				yield {relativeToAnchorPosition, multiplier};
			}
		}
	}
	public withNewAnchorPosition(newAnchorPosition: Coordinates): Kernel {
		return new Kernel(newAnchorPosition, this.multipliers);
	}
	public withNewMultipliers(newMultipliers: KernelMultipliers): Kernel {
		return new Kernel(this.anchorPosition, newMultipliers);
	}
	public withNewMultipliersCell(
		cellPosition: Coordinates,
		cellValue: number,
	): Kernel {
		const newRow = (
			this.multipliers[cellPosition.y] as KernelMultipliers[number]
		).with(cellPosition.x, cellValue) as unknown as KernelMultipliers[number];
		const newMultipliers = this.multipliers.with(
			cellPosition.y,
			newRow,
		) as unknown as KernelMultipliers;
		return new Kernel(this.anchorPosition, newMultipliers);
	}
	public withNewMultipliersColumn(columnNumber: number): Kernel {
		const newMultipliers = this.multipliers.map((row) => {
			return [
				...row.slice(0, columnNumber),
				0,
				...row.slice(columnNumber),
			] as unknown as KernelMultipliers[number];
		}) as unknown as KernelMultipliers;
		const newAnchorX =
			this.anchorPosition.x + (columnNumber <= this.anchorPosition.x ? 1 : 0);
		return new Kernel(
			new Coordinates(newAnchorX, this.anchorPosition.y),
			newMultipliers,
		);
	}
	public withNewMultipliersRow(rowNumber: number): Kernel {
		const newRow = this.multipliers[0].map(() => {
			return 0;
		}) as unknown as KernelMultipliers[number];
		const newMultipliers = [
			...this.multipliers.slice(0, rowNumber),
			newRow,
			...this.multipliers.slice(rowNumber),
		] as unknown as KernelMultipliers;
		const newAnchorY =
			this.anchorPosition.y + (rowNumber <= this.anchorPosition.y ? 1 : 0);
		return new Kernel(
			new Coordinates(this.anchorPosition.x, newAnchorY),
			newMultipliers,
		);
	}
	public withoutMultipliersColumn(columnNumber: number): Kernel {
		const newMultipliers = this.multipliers.map((row) => {
			return [
				...row.slice(0, columnNumber),
				...row.slice(columnNumber + 1),
			] as unknown as KernelMultipliers[number];
		}) as unknown as KernelMultipliers;
		const newAnchorX =
			this.anchorPosition.x - (columnNumber < this.anchorPosition.x ? 1 : 0);
		return new Kernel(
			new Coordinates(newAnchorX, this.anchorPosition.y),
			newMultipliers,
		);
	}
	public withoutMultipliersRow(rowNumber: number): Kernel {
		const newMultipliers = [
			...this.multipliers.slice(0, rowNumber),
			...this.multipliers.slice(rowNumber + 1),
		] as unknown as KernelMultipliers;
		const newAnchorY =
			this.anchorPosition.y - (rowNumber < this.anchorPosition.y ? 1 : 0);
		return new Kernel(
			new Coordinates(this.anchorPosition.x, newAnchorY),
			newMultipliers,
		);
	}
}
