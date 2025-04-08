import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {BoardMode} from "../../BoardMode.ts";
export type AddingNodeBoardMode = BoardMode<
	"addingNode",
	Readonly<{position: Coordinates}>
>;
