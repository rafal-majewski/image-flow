import type {BoardModeWithData} from "../../types/with-data/BoardModeWithData.ts";
import type {AddingNodeBoardModeData} from "./data/AddingNodeBoardModeData.ts";
import type {addingNodeBoardModeKindName} from "./kind-name/addingNodeBoardModeKindName.ts";
export type AddingNodeBoardMode = BoardModeWithData<
	typeof addingNodeBoardModeKindName,
	AddingNodeBoardModeData
>;
