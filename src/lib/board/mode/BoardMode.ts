export class BoardMode<Name extends string> {
	public constructor(name: Name) {
		this.name = name;
	}
	public readonly name: Name;
}
