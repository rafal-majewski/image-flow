import type {BoardModeWithData} from "../../types/with-data/BoardModeWithData.ts";
import type {MovingNodeBoardModeData} from "./data/MovingNodeBoardModeData.ts";
import type {movingNodeBoardModeKindName} from "./kind-name/movingNodeBoardModeKindName.ts";
export type MovingNodeBoardMode = BoardModeWithData<
	typeof movingNodeBoardModeKindName,
	MovingNodeBoardModeData
>;
