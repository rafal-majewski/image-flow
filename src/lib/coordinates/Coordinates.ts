export class Coordinates {
	public constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	public addCoordinates(otherCoordinates: Coordinates): Coordinates {
		return this.combineComponentWise(
			otherCoordinates,
			(componentFromThis, componentFromOther) => {
				return componentFromThis + componentFromOther;
			},
		);
	}
	public combineComponentWise(
		otherCoordinates: Coordinates,
		combiner: (componentFromThis: number, componentFromOther: number) => number,
	): Coordinates {
		return new Coordinates(
			combiner(this.x, otherCoordinates.x),
			combiner(this.y, otherCoordinates.y),
		);
	}
	public computeDistanceTo(otherCoordinates: Coordinates): number {
		const distance =
			((this.x - otherCoordinates.x) ** 2 + (this.y - otherCoordinates.y) ** 2)
			** 0.5;
		return distance;
	}
	public computeDotProduct(otherCoordinates: Coordinates): number {
		const dotProduct =
			this.multiplyByCoordinatesComponentWise(
				otherCoordinates,
			).computeSumOfComponents();
		return dotProduct;
	}
	public computeSumOfComponents(): number {
		const sumOfComponents = this.x + this.y;
		return sumOfComponents;
	}
	public divideByCoordinatesComponentWise(
		otherCoordinates: Coordinates,
	): Coordinates {
		return this.combineComponentWise(
			otherCoordinates,
			(componentFromThis, componentFromOther) => {
				return componentFromThis / componentFromOther;
			},
		);
	}
	public divideByScalar(scalar: number): Coordinates {
		return this.map((component) => {
			return component / scalar;
		});
	}
	public map(mapper: (component: number) => number): Coordinates {
		return new Coordinates(mapper(this.x), mapper(this.y));
	}
	public multiplyByCoordinatesComponentWise(
		otherCoordinates: Coordinates,
	): Coordinates {
		return this.combineComponentWise(
			otherCoordinates,
			(componentFromThis, componentFromOther) => {
				return componentFromThis * componentFromOther;
			},
		);
	}
	public multiplyByScalar(scalar: number): Coordinates {
		return this.map((component) => {
			return component * scalar;
		});
	}
	public negate(): Coordinates {
		return this.map((component) => {
			return -component;
		});
	}
	public round(): Coordinates {
		return this.map((component) => {
			return Math.round(component);
		});
	}
	public subtractCoordinates(otherCoordinates: Coordinates): Coordinates {
		return this.combineComponentWise(
			otherCoordinates,
			(componentFromThis, componentFromOther) => {
				return componentFromThis - componentFromOther;
			},
		);
	}
	public swapComponents(): Coordinates {
		return new Coordinates(this.y, this.x);
	}
	public readonly x: number;
	public readonly y: number;
}
