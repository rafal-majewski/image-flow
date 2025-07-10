import {Coordinates} from "../../../../../../../coordinates/Coordinates.ts";
import {Dimensions} from "../../../../../../../dimensions/Dimensions.ts";
import {computeErosionMapperOperatorKernelDimensions} from "./computing-dimensions/computeErosionMapperOperatorKernelDimensions.ts";
import type {ErosionMapperOperatorKernelCoefficients} from "./coefficients/ErosionMapperOperatorKernelCoefficients.ts";
export class ErosionMapperOperatorKernel
	implements Iterable<{readonly relativeToAnchorPosition: Coordinates}>
{
	private constructor(
		anchorPosition: Coordinates,
		coefficients: ErosionMapperOperatorKernelCoefficients,
		dimensions: Dimensions,
	) {
		this.anchorPosition = anchorPosition;
		this.coefficients = coefficients;
		this.dimensions = dimensions;
	}
	readonly anchorPosition: Coordinates;
	readonly coefficients: ErosionMapperOperatorKernelCoefficients;
	public static create(
		anchorPosition: Coordinates,
		coefficients: ErosionMapperOperatorKernelCoefficients,
	): ErosionMapperOperatorKernel {
		return new ErosionMapperOperatorKernel(
			anchorPosition,
			coefficients,
			computeErosionMapperOperatorKernelDimensions(coefficients),
		);
	}
	public static createEmpty(): ErosionMapperOperatorKernel {
		return new ErosionMapperOperatorKernel(
			new Coordinates(0, 0),
			[[true]],
			new Dimensions(1, 1),
		);
	}
	readonly dimensions: Dimensions;
	*[Symbol.iterator](): IterableIterator<{
		readonly relativeToAnchorPosition: Coordinates;
	}> {
		for (
			let relativeToAnchorPositionY = -this.anchorPosition.y;
			relativeToAnchorPositionY
			< this.coefficients.length - this.anchorPosition.y;
			relativeToAnchorPositionY = relativeToAnchorPositionY + 1
		) {
			for (
				let relativeToAnchorPositionX = -this.anchorPosition.x;
				relativeToAnchorPositionX
				< this.coefficients[0].length - this.anchorPosition.x;
				relativeToAnchorPositionX = relativeToAnchorPositionX + 1
			) {
				if (
					(
						this.coefficients[
							relativeToAnchorPositionY + this.anchorPosition.y
						] as readonly [boolean, ...(readonly boolean[])]
					)[relativeToAnchorPositionX + this.anchorPosition.x] as boolean
				) {
					const relativeToAnchorPosition = new Coordinates(
						relativeToAnchorPositionX,
						relativeToAnchorPositionY,
					);
					yield {relativeToAnchorPosition};
				}
			}
		}
	}
}
