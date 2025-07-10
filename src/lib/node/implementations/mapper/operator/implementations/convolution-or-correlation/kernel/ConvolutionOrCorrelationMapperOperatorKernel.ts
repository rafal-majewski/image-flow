import {Coordinates} from "../../../../../../../coordinates/Coordinates.ts";
import {Dimensions} from "../../../../../../../dimensions/Dimensions.ts";
import type {ConvolutionOrCorrelationMapperOperatorKernelMultipliers} from "./multipliers/ConvolutionOrCorrelationMapperOperatorKernelMultipliers.ts";
import {rotateAnchorPositionBy180DegreesClockwise} from "./rotating-anchor-position-by-180-degrees-clockwise/rotateAnchorPositionBy180DegreesClockwise.ts";
import {rotateMultipliersBy180DegreesClockwise} from "./rotating-multipliers-by-180-degrees-clockwise/rotateMultipliersBy180DegreesClockwise.ts";
export class ConvolutionOrCorrelationMapperOperatorKernel
	implements
		Iterable<{
			readonly relativeToAnchorPosition: Coordinates;
			readonly multiplier: number;
		}>
{
	private constructor(
		anchorPosition: Coordinates,
		dimensions: Dimensions,
		multipliers: ConvolutionOrCorrelationMapperOperatorKernelMultipliers,
	) {
		this.anchorPosition = anchorPosition;
		this.dimensions = dimensions;
		this.multipliers = multipliers;
	}
	readonly anchorPosition: Coordinates;
	public static createEmpty(): ConvolutionOrCorrelationMapperOperatorKernel {
		return new ConvolutionOrCorrelationMapperOperatorKernel(
			new Coordinates(0, 0),
			new Dimensions(1, 1),
			[[0]],
		);
	}
	public deleteMultipliersColumn(
		columnNumber: number,
	): ConvolutionOrCorrelationMapperOperatorKernel {
		const newMultipliers = this.multipliers.map((row) => {
			return [
				...row.slice(0, columnNumber),
				...row.slice(columnNumber + 1),
			] as unknown as ConvolutionOrCorrelationMapperOperatorKernelMultipliers[number];
		}) as unknown as ConvolutionOrCorrelationMapperOperatorKernelMultipliers;
		const newAnchorX =
			this.anchorPosition.x - (columnNumber < this.anchorPosition.x ? 1 : 0);
		return new ConvolutionOrCorrelationMapperOperatorKernel(
			new Coordinates(newAnchorX, this.anchorPosition.y),
			this.dimensions.subtractDimensionsComponentWise(new Dimensions(1, 0)),
			newMultipliers,
		);
	}
	public deleteMultipliersRow(
		rowNumber: number,
	): ConvolutionOrCorrelationMapperOperatorKernel {
		const newMultipliers = [
			...this.multipliers.slice(0, rowNumber),
			...this.multipliers.slice(rowNumber + 1),
		] as unknown as ConvolutionOrCorrelationMapperOperatorKernelMultipliers;
		const newAnchorY =
			this.anchorPosition.y - (rowNumber < this.anchorPosition.y ? 1 : 0);
		return new ConvolutionOrCorrelationMapperOperatorKernel(
			new Coordinates(this.anchorPosition.x, newAnchorY),
			this.dimensions.subtractDimensionsComponentWise(new Dimensions(0, 1)),
			newMultipliers,
		);
	}
	readonly dimensions: Dimensions;
	public insertMultipliersColumn(
		columnNumber: number,
	): ConvolutionOrCorrelationMapperOperatorKernel {
		const newMultipliers = this.multipliers.map((row) => {
			return [
				...row.slice(0, columnNumber),
				0,
				...row.slice(columnNumber),
			] as unknown as ConvolutionOrCorrelationMapperOperatorKernelMultipliers[number];
		}) as unknown as ConvolutionOrCorrelationMapperOperatorKernelMultipliers;
		const newAnchorX =
			this.anchorPosition.x + (columnNumber <= this.anchorPosition.x ? 1 : 0);
		return new ConvolutionOrCorrelationMapperOperatorKernel(
			new Coordinates(newAnchorX, this.anchorPosition.y),
			this.dimensions.addDimensionsComponentWise(new Dimensions(1, 0)),
			newMultipliers,
		);
	}
	public insertMultipliersRow(
		rowNumber: number,
	): ConvolutionOrCorrelationMapperOperatorKernel {
		const newRow = this.multipliers[0].map(() => {
			return 0;
		}) as unknown as ConvolutionOrCorrelationMapperOperatorKernelMultipliers[number];
		const newMultipliers = [
			...this.multipliers.slice(0, rowNumber),
			newRow,
			...this.multipliers.slice(rowNumber),
		] as unknown as ConvolutionOrCorrelationMapperOperatorKernelMultipliers;
		const newAnchorY =
			this.anchorPosition.y + (rowNumber <= this.anchorPosition.y ? 1 : 0);
		return new ConvolutionOrCorrelationMapperOperatorKernel(
			new Coordinates(this.anchorPosition.x, newAnchorY),
			this.dimensions.addDimensionsComponentWise(new Dimensions(0, 1)),
			newMultipliers,
		);
	}
	readonly multipliers: ConvolutionOrCorrelationMapperOperatorKernelMultipliers;
	public replaceAnchorPosition(
		newAnchorPosition: Coordinates,
	): ConvolutionOrCorrelationMapperOperatorKernel {
		return new ConvolutionOrCorrelationMapperOperatorKernel(
			newAnchorPosition,
			this.dimensions,
			this.multipliers,
		);
	}
	/**
	 * Make sure they are of the same dimensions.
	 */
	public replaceMultipliers(
		newMultipliers: ConvolutionOrCorrelationMapperOperatorKernelMultipliers,
	): ConvolutionOrCorrelationMapperOperatorKernel {
		return new ConvolutionOrCorrelationMapperOperatorKernel(
			this.anchorPosition,
			this.dimensions,
			newMultipliers,
		);
	}
	public replaceMultipliersCell(
		cellPosition: Coordinates,
		cellValue: number,
	): ConvolutionOrCorrelationMapperOperatorKernel {
		const newRow = (
			this.multipliers[
				cellPosition.y
			] as ConvolutionOrCorrelationMapperOperatorKernelMultipliers[number]
		).with(
			cellPosition.x,
			cellValue,
		) as unknown as ConvolutionOrCorrelationMapperOperatorKernelMultipliers[number];
		const newMultipliers = this.multipliers.with(
			cellPosition.y,
			newRow,
		) as unknown as ConvolutionOrCorrelationMapperOperatorKernelMultipliers;
		return new ConvolutionOrCorrelationMapperOperatorKernel(
			this.anchorPosition,
			this.dimensions,
			newMultipliers,
		);
	}
	public rotateBy180DegreesClockwise(): ConvolutionOrCorrelationMapperOperatorKernel {
		return new ConvolutionOrCorrelationMapperOperatorKernel(
			rotateAnchorPositionBy180DegreesClockwise(
				this.anchorPosition,
				this.dimensions,
			),
			this.dimensions.swapComponents(),
			rotateMultipliersBy180DegreesClockwise(this.multipliers),
		);
	}
	*[Symbol.iterator](): IterableIterator<{
		readonly relativeToAnchorPosition: Coordinates;
		readonly multiplier: number;
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
}
