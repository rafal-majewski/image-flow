export class ComplexNumber {
	public readonly realComponent: number;
	public readonly imaginaryComponent: number;
	public constructor(realComponent: number, imaginaryComponent: number) {
		this.realComponent = realComponent;
		this.imaginaryComponent = imaginaryComponent;
	}
	public computeMagnitude(): number {
		return (this.realComponent ** 2 + this.imaginaryComponent ** 2) ** 0.5;
	}
	public add(other: ComplexNumber): ComplexNumber {
		return new ComplexNumber(
			this.realComponent + other.realComponent,
			this.imaginaryComponent + other.imaginaryComponent,
		);
	}
	public multiply(other: ComplexNumber): ComplexNumber {
		return new ComplexNumber(
			this.realComponent * other.realComponent
				- this.imaginaryComponent * other.imaginaryComponent,
			this.realComponent * other.imaginaryComponent
				+ this.imaginaryComponent * other.realComponent,
		);
	}
	public subtract(other: ComplexNumber): ComplexNumber {
		return new ComplexNumber(
			this.realComponent - other.realComponent,
			this.imaginaryComponent - other.imaginaryComponent,
		);
	}
	public divideByReal(other: number): ComplexNumber {
		return new ComplexNumber(
			this.realComponent / other,
			this.imaginaryComponent / other,
		);
	}
}
