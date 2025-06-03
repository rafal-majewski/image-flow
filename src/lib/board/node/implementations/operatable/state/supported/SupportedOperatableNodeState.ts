import type {AnimatedInvalidAndNoOperatorOperatableNodeState} from "../implementations/animated-invalid-and-no-operator/AnimatedInvalidAndNoOperatorOperatableNodeState.ts";
import type {AnimatedInvalidOperatableNodeState} from "../implementations/animated-invalid/AnimatedInvalidOperatableNodeState.ts";
import type {AnimatedNoOperatorOperatableNodeState} from "../implementations/animated-no-operator/AnimatedNoOperatorOperatableNodeState.ts";
import type {AnimatedOperatingDoneOperatableNodeState} from "../implementations/animated-operating-done/AnimatedOperatingDoneOperatableNodeState.ts";
import type {AnimatedOperatingInProgressOperatableNodeState} from "../implementations/animated-operating-in-progress/AnimatedOperatingInProgressOperatableNodeState.ts";
import type {InstantInvalidAndNoOperatorOperatableNodeState} from "../implementations/instant-invalid-and-no-operator/InstantInvalidAndNoOperatorOperatableNodeState.ts";
import type {InstantInvalidOperatableNodeState} from "../implementations/instant-invalid/InstantInvalidOperatableNodeState.ts";
import type {InstantNoOperatorOperatableNodeState} from "../implementations/instant-no-operator/InstantNoOperatorOperatableNodeState.ts";
import type {InstantOperatingDoneOperatableNodeState} from "../implementations/instant-operating-done/InstantOperatingDoneOperatableNodeState.ts";
import type {ManualInvalidAndNoOperatorOperatableNodeState} from "../implementations/manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatableNodeState.ts";
import type {ManualInvalidOperatableNodeState} from "../implementations/manual-invalid/ManualInvalidOperatableNodeState.ts";
import type {ManualNoOperatorOperatableNodeState} from "../implementations/manual-no-operator/ManualNoOperatorOperatableNodeState.ts";
import type {ManualOperatingDoneOperatableNodeState} from "../implementations/manual-operating-done/ManualOperatingDoneOperatableNodeState.ts";
import type {ManualOperatingInProgressOperatableNodeState} from "../implementations/manual-operating-in-progress/ManualOperatingInProgressOperatableNodeState.ts";
export type SupportedOperatableNodeState<InputImageCount extends number> =
	| AnimatedInvalidAndNoOperatorOperatableNodeState<InputImageCount>
	| AnimatedInvalidOperatableNodeState<InputImageCount>
	| AnimatedNoOperatorOperatableNodeState<InputImageCount>
	| AnimatedOperatingDoneOperatableNodeState<InputImageCount>
	| AnimatedOperatingInProgressOperatableNodeState<InputImageCount>
	| InstantInvalidAndNoOperatorOperatableNodeState<InputImageCount>
	| InstantInvalidOperatableNodeState<InputImageCount>
	| InstantNoOperatorOperatableNodeState<InputImageCount>
	| InstantOperatingDoneOperatableNodeState<InputImageCount>
	| ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount>
	| ManualInvalidOperatableNodeState<InputImageCount>
	| ManualNoOperatorOperatableNodeState<InputImageCount>
	| ManualOperatingDoneOperatableNodeState<InputImageCount>
	| ManualOperatingInProgressOperatableNodeState<InputImageCount>;
