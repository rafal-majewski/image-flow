import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import {createBoardModeWithData} from "../../../types/with-data/creating/createBoardModeWithData.ts";
import type {AddingNodeBoardMode} from "../AddingNodeBoardMode.ts";
import {addingNodeBoardModeKindName} from "../kind-name/addingNodeBoardModeKindName.ts";
export function createAddingNodeBoardMode(
	position: Coordinates,
): AddingNodeBoardMode {
	return createBoardModeWithData(addingNodeBoardModeKindName, {position});
}
