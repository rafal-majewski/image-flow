export abstract class Operator {
	protected constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
	public readonly id: string;
	public readonly name: string;
}
