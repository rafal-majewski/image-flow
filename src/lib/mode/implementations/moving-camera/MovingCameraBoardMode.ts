import {BoardMode} from "../../BoardMode.ts";
import {movingCameraBoardModeName} from "./name/movingCameraBoardModeName.ts";
export class MovingCameraBoardMode extends BoardMode<
	typeof movingCameraBoardModeName
> {
	public constructor() {
		super(movingCameraBoardModeName);
	}
}
