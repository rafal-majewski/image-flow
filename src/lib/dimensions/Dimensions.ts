import {Coordinates} from "../coordinates/Coordinates.ts";
export class Dimensions {
	public constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}
	public addDimensionsComponentWise(otherDimensions: Dimensions): Dimensions {
		return this.combineWithDimensionsComponentWise(
			(componentFromThisDimensions, componentFromOtherDimensions) => {
				return componentFromThisDimensions + componentFromOtherDimensions;
			},
			otherDimensions,
		);
	}
	public checkIfEqual(otherDimensions: Dimensions): boolean {
		return (
			this.width === otherDimensions.width
			&& this.height === otherDimensions.height
		);
	}
	public checkIfNotEqual(otherDimensions: Dimensions): boolean {
		return (
			this.width !== otherDimensions.width
			|| this.height !== otherDimensions.height
		);
	}
	public combineWithDimensionsComponentWise(
		combiner: (
			componentFromThisDimensions: number,
			componentFromOtherDimensions: number,
		) => number,
		otherDimensions: Dimensions,
	): Dimensions {
		return new Dimensions(
			combiner(this.width, otherDimensions.width),
			combiner(this.height, otherDimensions.height),
		);
	}
	public convertToCoordinates(): Coordinates {
		return new Coordinates(this.width, this.height);
	}
	public divideByScalar(scalar: number): Dimensions {
		return this.map((component) => {
			return component / scalar;
		});
	}
	public readonly height: number;
	public map(mapper: (component: number) => number): Dimensions {
		return new Dimensions(mapper(this.width), mapper(this.height));
	}
	public multiplyByScalar(scalar: number): Dimensions {
		return this.map((component) => {
			return component * scalar;
		});
	}
	public subtractDimensionsComponentWise(
		otherDimensions: Dimensions,
	): Dimensions {
		return this.combineWithDimensionsComponentWise(
			(componentFromThisDimensions, componentFromOtherDimensions) => {
				return componentFromThisDimensions - componentFromOtherDimensions;
			},
			otherDimensions,
		);
	}
	public swapComponents(): Dimensions {
		return new Dimensions(this.height, this.width);
	}
	public readonly width: number;
}
