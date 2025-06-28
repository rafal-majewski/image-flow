import type {AnimatedInvalidAndNoOperatorOperatingNodeState} from "../implementations/animated-invalid-and-no-operator/AnimatedInvalidAndNoOperatorOperatingNodeState.ts";
import type {AnimatedInvalidOperatingNodeState} from "../implementations/animated-invalid/AnimatedInvalidOperatingNodeState.ts";
import type {AnimatedNoOperatorOperatingNodeState} from "../implementations/animated-no-operator/AnimatedNoOperatorOperatingNodeState.ts";
import type {AnimatedOperatingDoneOperatingNodeState} from "../implementations/animated-operating-done/AnimatedOperatingDoneOperatingNodeState.ts";
import type {AnimatedOperatingStartedOperatingNodeState} from "../implementations/animated-operating-started/AnimatedOperatingStartedOperatingNodeState.ts";
import type {InstantInvalidAndNoOperatorOperatingNodeState} from "../implementations/instant-invalid-and-no-operator/InstantInvalidAndNoOperatorOperatingNodeState.ts";
import type {InstantInvalidOperatingNodeState} from "../implementations/instant-invalid/InstantInvalidOperatingNodeState.ts";
import type {InstantNoOperatorOperatingNodeState} from "../implementations/instant-no-operator/InstantNoOperatorOperatingNodeState.ts";
import type {InstantOperatingDoneOperatingNodeState} from "../implementations/instant-operating-done/InstantOperatingDoneOperatingNodeState.ts";
import type {InstantOperatingStartedOperatingNodeState} from "../implementations/instant-operating-started/InstantOperatingStartedOperatingNodeState.ts";
import type {ManualInvalidAndNoOperatorOperatingNodeState} from "../implementations/manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatingNodeState.ts";
import type {ManualInvalidOperatingNodeState} from "../implementations/manual-invalid/ManualInvalidOperatingNodeState.ts";
import type {ManualNoOperatorOperatingNodeState} from "../implementations/manual-no-operator/ManualNoOperatorOperatingNodeState.ts";
import type {ManualOperatingDoneOperatingNodeState} from "../implementations/manual-operating-done/ManualOperatingDoneOperatingNodeState.ts";
import type {ManualOperatingStartedOperatingNodeState} from "../implementations/manual-operating-started/ManualOperatingStartedOperatingNodeState.ts";
export type SupportedOperatingNodeState<InputImageCount extends number> =
	| AnimatedInvalidAndNoOperatorOperatingNodeState<InputImageCount>
	| AnimatedInvalidOperatingNodeState<InputImageCount>
	| AnimatedNoOperatorOperatingNodeState<InputImageCount>
	| AnimatedOperatingDoneOperatingNodeState<InputImageCount>
	| AnimatedOperatingStartedOperatingNodeState<InputImageCount>
	| InstantInvalidAndNoOperatorOperatingNodeState<InputImageCount>
	| InstantInvalidOperatingNodeState<InputImageCount>
	| InstantNoOperatorOperatingNodeState<InputImageCount>
	| InstantOperatingDoneOperatingNodeState<InputImageCount>
	| InstantOperatingStartedOperatingNodeState<InputImageCount>
	| ManualInvalidAndNoOperatorOperatingNodeState<InputImageCount>
	| ManualInvalidOperatingNodeState<InputImageCount>
	| ManualNoOperatorOperatingNodeState<InputImageCount>
	| ManualOperatingDoneOperatingNodeState<InputImageCount>
	| ManualOperatingStartedOperatingNodeState<InputImageCount>;
