import {BoardMode} from "../../BoardMode.ts";
import {movingCameraBoardModeKindName} from "./kind-name/movingCameraBoardModeKindName.ts";
export class MovingCameraBoardMode extends BoardMode<
	typeof movingCameraBoardModeKindName
> {
	public constructor() {
		super(movingCameraBoardModeKindName);
	}
}
