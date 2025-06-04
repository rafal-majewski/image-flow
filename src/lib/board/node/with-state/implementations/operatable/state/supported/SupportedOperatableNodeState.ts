import type {AnimatedInvalidAndNoOperatorOperatableNodeState} from "../implementations/animated-invalid-and-no-operator/AnimatedInvalidAndNoOperatorOperatableNodeState.ts";
import type {AnimatedInvalidOperatableNodeState} from "../implementations/animated-invalid/AnimatedInvalidOperatableNodeState.ts";
import type {AnimatedNoOperatorOperatableNodeState} from "../implementations/animated-no-operator/AnimatedNoOperatorOperatableNodeState.ts";
import type {AnimatedOperatingDonedOperatableNodeState} from "../implementations/animated-operating-done/AnimatedOperatingDoneOperatableNodeState.ts";
import type {AnimatedOperatingStartedOperatableNodeState} from "../implementations/animated-operating-started/AnimatedOperatingStartedOperatableNodeState.ts";
import type {InstantInvalidAndNoOperatorOperatableNodeState} from "../implementations/instant-invalid-and-no-operator/InstantInvalidAndNoOperatorOperatableNodeState.ts";
import type {InstantInvalidOperatableNodeState} from "../implementations/instant-invalid/InstantInvalidOperatableNodeState.ts";
import type {InstantNoOperatorOperatableNodeState} from "../implementations/instant-no-operator/InstantNoOperatorOperatableNodeState.ts";
import type {InstantOperatingDonedOperatableNodeState} from "../implementations/instant-operating-done/InstantOperatingDoneOperatableNodeState.ts";
import type {ManualInvalidAndNoOperatorOperatableNodeState} from "../implementations/manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatableNodeState.ts";
import type {ManualInvalidOperatableNodeState} from "../implementations/manual-invalid/ManualInvalidOperatableNodeState.ts";
import type {ManualNoOperatorOperatableNodeState} from "../implementations/manual-no-operator/ManualNoOperatorOperatableNodeState.ts";
import type {ManualOperatingDonedOperatableNodeState} from "../implementations/manual-operating-done/ManualOperatingDoneOperatableNodeState.ts";
import type {ManualOperatingStartedOperatableNodeState} from "../implementations/manual-operating-started/ManualOperatingStartedOperatableNodeState.ts";
export type SupportedOperatableNodeState<InputImageCount extends number> =
	| AnimatedInvalidAndNoOperatorOperatableNodeState<InputImageCount>
	| AnimatedInvalidOperatableNodeState<InputImageCount>
	| AnimatedNoOperatorOperatableNodeState<InputImageCount>
	| AnimatedOperatingDonedOperatableNodeState<InputImageCount>
	| AnimatedOperatingStartedOperatableNodeState<InputImageCount>
	| InstantInvalidAndNoOperatorOperatableNodeState<InputImageCount>
	| InstantInvalidOperatableNodeState<InputImageCount>
	| InstantNoOperatorOperatableNodeState<InputImageCount>
	| InstantOperatingDonedOperatableNodeState<InputImageCount>
	| ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount>
	| ManualInvalidOperatableNodeState<InputImageCount>
	| ManualNoOperatorOperatableNodeState<InputImageCount>
	| ManualOperatingDonedOperatableNodeState<InputImageCount>
	| ManualOperatingStartedOperatableNodeState<InputImageCount>;
