export class Coordinates {
	public constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	public add(otherCoordinates: Coordinates): Coordinates {
		return new Coordinates(
			this.x + otherCoordinates.x,
			this.y + otherCoordinates.y,
		);
	}
	public divideBy(scalar: number): Coordinates {
		return new Coordinates(this.x / scalar, this.y / scalar);
	}
	public multiplyBy(scalar: number): Coordinates {
		return new Coordinates(this.x * scalar, this.y * scalar);
	}
	public subtract(otherCoordinates: Coordinates): Coordinates {
		return new Coordinates(
			this.x - otherCoordinates.x,
			this.y - otherCoordinates.y,
		);
	}
	public readonly x: number;
	public readonly y: number;
}
