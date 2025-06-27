import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {WithDataBoardMode} from "../../with-data/WithDataBoardMode.ts";
import type {AddingNodeBoardModeData} from "./data/AddingNodeBoardModeData.ts";
import {addingNodeBoardModeName} from "./name/addingNodeBoardModeName.ts";
export class AddingNodeBoardMode extends WithDataBoardMode<
	typeof addingNodeBoardModeName,
	AddingNodeBoardModeData
> {
	public constructor(position: Coordinates) {
		super({position}, addingNodeBoardModeName);
	}
}
