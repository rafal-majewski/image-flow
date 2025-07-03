export class ComplexNumber {
	public constructor(realComponent: number, imaginaryComponent: number) {
		this.realComponent = realComponent;
		this.imaginaryComponent = imaginaryComponent;
	}
	public addComplex(other: ComplexNumber): ComplexNumber {
		return new ComplexNumber(
			this.realComponent + other.realComponent,
			this.imaginaryComponent + other.imaginaryComponent,
		);
	}
	public divideByReal(other: number): ComplexNumber {
		return new ComplexNumber(
			this.realComponent / other,
			this.imaginaryComponent / other,
		);
	}
	public readonly imaginaryComponent: number;
	public magnitude(): number {
		return (this.realComponent ** 2 + this.imaginaryComponent ** 2) ** 0.5;
	}
	public multiplyByComplex(other: ComplexNumber): ComplexNumber {
		return new ComplexNumber(
			this.realComponent * other.realComponent
				- this.imaginaryComponent * other.imaginaryComponent,
			this.realComponent * other.imaginaryComponent
				+ this.imaginaryComponent * other.realComponent,
		);
	}
	public multiplyByReal(other: number): ComplexNumber {
		return new ComplexNumber(
			this.realComponent * other,
			this.imaginaryComponent * other,
		);
	}
	public readonly realComponent: number;
	public subtractComplex(other: ComplexNumber): ComplexNumber {
		return new ComplexNumber(
			this.realComponent - other.realComponent,
			this.imaginaryComponent - other.imaginaryComponent,
		);
	}
}
