import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {WithDataBoardMode} from "../../WithDataBoardMode.ts";
import type {AddingNodeBoardModeData} from "./data/AddingNodeBoardModeData.ts";
import {addingNodeBoardModeKindName} from "./kind-name/addingNodeBoardModeKindName.ts";
export class AddingNodeBoardMode extends WithDataBoardMode<
	typeof addingNodeBoardModeKindName,
	AddingNodeBoardModeData
> {
	public constructor(position: Coordinates) {
		super({position}, addingNodeBoardModeKindName);
	}
}
