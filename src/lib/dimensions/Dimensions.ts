export class Dimensions {
	public constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}
	public divideBy(scalar: number): Dimensions {
		return new Dimensions(this.width / scalar, this.height / scalar);
	}
	public readonly height: number;
	public multiplyBy(scalar: number): Dimensions {
		return new Dimensions(this.width * scalar, this.height * scalar);
	}
	public readonly width: number;
}
