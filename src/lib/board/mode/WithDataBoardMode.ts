import {BoardMode} from "./BoardMode.ts";
export class WithDataBoardMode<
	Name extends string,
	Data,
> extends BoardMode<Name> {
	public constructor(data: Data, name: Name) {
		super(name);
		this.data = data;
	}
	public readonly data: Data;
}
