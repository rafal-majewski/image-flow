import {Coordinates} from "../coordinates/Coordinates.ts";
export class Dimensions {
	public constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}
	public convertToCoordinates(): Coordinates {
		return new Coordinates(this.width, this.height);
	}
	public divideByNumber(number_: number): Dimensions {
		return new Dimensions(this.width / number_, this.height / number_);
	}
	public readonly height: number;
	public multiplyByNumber(number_: number): Dimensions {
		return new Dimensions(this.width * number_, this.height * number_);
	}
	public readonly width: number;
}
