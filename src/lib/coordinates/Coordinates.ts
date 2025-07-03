export class Coordinates {
	public constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	public addCoordinates(otherCoordinates: Coordinates): Coordinates {
		return new Coordinates(
			this.x + otherCoordinates.x,
			this.y + otherCoordinates.y,
		);
	}
	public divideByCoordinatesComponentWise(
		otherCoordinates: Coordinates,
	): Coordinates {
		return new Coordinates(
			this.x / otherCoordinates.x,
			this.y / otherCoordinates.y,
		);
	}
	public divideByNumber(number_: number): Coordinates {
		return new Coordinates(this.x / number_, this.y / number_);
	}
	public dotProduct(otherCoordinates: Coordinates): number {
		return this.multiplyByCoordinatesComponentWise(
			otherCoordinates,
		).sumComponents();
	}
	public multiplyByCoordinatesComponentWise(
		otherCoordinates: Coordinates,
	): Coordinates {
		return new Coordinates(
			this.x * otherCoordinates.x,
			this.y * otherCoordinates.y,
		);
	}
	public multiplyByNumber(number_: number): Coordinates {
		return new Coordinates(this.x * number_, this.y * number_);
	}
	public negate(): Coordinates {
		return new Coordinates(-this.x, -this.y);
	}
	public subtractCoordinates(otherCoordinates: Coordinates): Coordinates {
		return new Coordinates(
			this.x - otherCoordinates.x,
			this.y - otherCoordinates.y,
		);
	}
	public sumComponents(): number {
		return this.x + this.y;
	}
	public readonly x: number;
	public readonly y: number;
}
