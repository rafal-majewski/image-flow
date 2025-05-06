import type {BoardModeWithoutData} from "../../types/without-data/BoardModeWithoutData.ts";
import type {movingCameraBoardModeKindName} from "./kind-name/movingCameraBoardModeKindName.ts";
export type MovingCameraBoardMode = BoardModeWithoutData<
	typeof movingCameraBoardModeKindName
>;
