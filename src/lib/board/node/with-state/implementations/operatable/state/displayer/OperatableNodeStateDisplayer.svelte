<script
	lang="ts"
	generics="
		InputImageCount extends number,
	"
>
	import type {SupportedOperatableNodeState} from "../supported/SupportedOperatableNodeState.ts";
	import type {Operator} from "../../operator/Operator.ts";
	import Canvas from "./canvas/Canvas.svelte";
	import {AnimatedInvalidAndNoOperatorOperatableNodeState} from "../implementations/animated-invalid-and-no-operator/AnimatedInvalidAndNoOperatorOperatableNodeState.ts";
	import {AnimatedInvalidOperatableNodeState} from "../implementations/animated-invalid/AnimatedInvalidOperatableNodeState.ts";
	import {AnimatedNoOperatorOperatableNodeState} from "../implementations/animated-no-operator/AnimatedNoOperatorOperatableNodeState.ts";
	import {AnimatedOperatingStartedOperatableNodeState} from "../implementations/animated-operating-started/AnimatedOperatingStartedOperatableNodeState.ts";
	import {InstantInvalidAndNoOperatorOperatableNodeState} from "../implementations/instant-invalid-and-no-operator/InstantInvalidAndNoOperatorOperatableNodeState.ts";
	import {InstantInvalidOperatableNodeState} from "../implementations/instant-invalid/InstantInvalidOperatableNodeState.ts";
	import {InstantNoOperatorOperatableNodeState} from "../implementations/instant-no-operator/InstantNoOperatorOperatableNodeState.ts";
	import {ManualInvalidAndNoOperatorOperatableNodeState} from "../implementations/manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatableNodeState.ts";
	import {ManualInvalidOperatableNodeState} from "../implementations/manual-invalid/ManualInvalidOperatableNodeState.ts";
	import {ManualNoOperatorOperatableNodeState} from "../implementations/manual-no-operator/ManualNoOperatorOperatableNodeState.ts";
	import {ManualOperatingStartedOperatableNodeState} from "../implementations/manual-operating-started/ManualOperatingStartedOperatableNodeState.ts";
	import {AnimatedOperatingDonedOperatableNodeState} from "../implementations/animated-operating-done/AnimatedOperatingDoneOperatableNodeState.ts";
	import {InstantOperatingDonedOperatableNodeState} from "../implementations/instant-operating-done/InstantOperatingDoneOperatableNodeState.ts";
	import {ManualOperatingDonedOperatableNodeState} from "../implementations/manual-operating-done/ManualOperatingDoneOperatableNodeState.ts";
	import type {OperatableNodeId} from "../../../../../id/OperatableNodeId.ts";
	const {
		state,
		onDoManualStepsRequest,
		onUnsetOperatorRequest,
		onSetOperatorRequest,
		nodeId,
		onMakeManualRequest,
		onMakeAnimatedRequest,
		onMakeInstantRequest,
		onSetStepCountRequest,
		onSetIntervalIntervalRequest,
		onResetOutputImageRequest,
		operators,
	}: Readonly<{
		nodeId: OperatableNodeId;
		state: SupportedOperatableNodeState<InputImageCount>;
		onDoManualStepsRequest: () => void;
		onUnsetOperatorRequest: () => void;
		onSetOperatorRequest: (operator: Operator<InputImageCount>) => void;
		onMakeManualRequest: () => void;
		onMakeAnimatedRequest: () => void;
		onMakeInstantRequest: () => void;
		onSetStepCountRequest: (stepCount: number) => void;
		onSetIntervalIntervalRequest: (intervalIntervalSeconds: number) => void;
		onResetOutputImageRequest: () => void;
		operators: readonly Operator<InputImageCount>[];
	}> = $props();
	function handleSelectChange(
		event: Event & Readonly<{currentTarget: HTMLSelectElement}>,
	): void {
		if (event.currentTarget.value === "none") {
			onUnsetOperatorRequest();
		} else {
			const selectedOperator = operators.find(
				(operator) => operator.id === event.currentTarget.value,
			) as (typeof operators)[number];
			onSetOperatorRequest(selectedOperator);
		}
	}
	function handleDoManualStepsButtonClick(): void {
		onDoManualStepsRequest();
	}
	function handleStepCountInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetStepCountRequest(Number.parseInt(event.currentTarget.value, 10));
	}
	function handleIntervalIntervalInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		onSetIntervalIntervalRequest(Number.parseFloat(event.currentTarget.value));
	}
	function handleResetOutputImageButtonClick(
		event: Event & Readonly<{currentTarget: HTMLButtonElement}>,
	): void {
		onResetOutputImageRequest();
	}
</script>

<section>
	<select onchange={handleSelectChange}>
		<option
			value="none"
			selected={state instanceof AnimatedInvalidAndNoOperatorOperatableNodeState
				|| state instanceof AnimatedNoOperatorOperatableNodeState
				|| state instanceof InstantInvalidAndNoOperatorOperatableNodeState
				|| state instanceof InstantNoOperatorOperatableNodeState
				|| state instanceof ManualInvalidAndNoOperatorOperatableNodeState
				|| state instanceof ManualNoOperatorOperatableNodeState}
		>
			No operator
		</option>
		{#each operators as operator (operator.id)}
			<option
				value={operator.id}
				selected={(state instanceof AnimatedOperatingStartedOperatableNodeState
					|| state instanceof AnimatedOperatingDonedOperatableNodeState
					|| state instanceof AnimatedInvalidOperatableNodeState
					|| state instanceof InstantOperatingDonedOperatableNodeState
					|| state instanceof InstantInvalidOperatableNodeState
					|| state instanceof ManualOperatingStartedOperatableNodeState
					|| state instanceof ManualOperatingDonedOperatableNodeState
					|| state instanceof ManualInvalidOperatableNodeState)
					&& state.operator.id === operator.id}>{operator.name}</option
			>
		{/each}
	</select>
	{#if state instanceof AnimatedOperatingStartedOperatableNodeState || state instanceof AnimatedOperatingDonedOperatableNodeState || state instanceof AnimatedInvalidOperatableNodeState || state instanceof AnimatedInvalidOperatableNodeState || state instanceof InstantOperatingDonedOperatableNodeState || state instanceof InstantInvalidOperatableNodeState || state instanceof InstantInvalidOperatableNodeState || state instanceof ManualOperatingStartedOperatableNodeState || state instanceof ManualOperatingDonedOperatableNodeState || state instanceof ManualInvalidOperatableNodeState || state instanceof ManualInvalidOperatableNodeState}
		<state.operator.displayer {onSetOperatorRequest} {nodeId} />
	{/if}
	{#if state instanceof AnimatedOperatingStartedOperatableNodeState || state instanceof AnimatedOperatingDonedOperatableNodeState || state instanceof InstantOperatingDonedOperatableNodeState || state instanceof ManualOperatingStartedOperatableNodeState || state instanceof ManualOperatingDonedOperatableNodeState}
		<Canvas image={state.outputImage} />
	{/if}
	<fieldset>
		<legend>Mode</legend>
		<div>
			<label>
				<input
					type="radio"
					name="{nodeId}-mode"
					value="manual"
					checked={state instanceof ManualOperatingStartedOperatableNodeState
						|| state instanceof ManualOperatingDonedOperatableNodeState
						|| state instanceof ManualInvalidAndNoOperatorOperatableNodeState
						|| state instanceof ManualInvalidOperatableNodeState
						|| state instanceof ManualNoOperatorOperatableNodeState}
					onchange={onMakeManualRequest}
				/>
				Manual
			</label>
			<label>
				<input
					type="radio"
					name="{nodeId}-mode"
					value="animated"
					checked={state instanceof AnimatedOperatingStartedOperatableNodeState
						|| state instanceof AnimatedOperatingDonedOperatableNodeState
						|| state instanceof AnimatedInvalidAndNoOperatorOperatableNodeState
						|| state instanceof AnimatedInvalidOperatableNodeState
						|| state instanceof AnimatedNoOperatorOperatableNodeState}
					onchange={onMakeAnimatedRequest}
				/>
				Animated
			</label>
			<label>
				<input
					type="radio"
					name="{nodeId}-mode"
					value="instant"
					checked={state instanceof InstantOperatingDonedOperatableNodeState
						|| state instanceof InstantInvalidAndNoOperatorOperatableNodeState
						|| state instanceof InstantInvalidOperatableNodeState
						|| state instanceof InstantNoOperatorOperatableNodeState}
					onchange={onMakeInstantRequest}
				/>
				Instant
			</label>
		</div>
		{#if state instanceof ManualOperatingStartedOperatableNodeState || state instanceof ManualOperatingDonedOperatableNodeState || state instanceof ManualInvalidAndNoOperatorOperatableNodeState || state instanceof ManualInvalidOperatableNodeState || state instanceof ManualNoOperatorOperatableNodeState || state instanceof AnimatedOperatingStartedOperatableNodeState || state instanceof AnimatedOperatingDonedOperatableNodeState || state instanceof AnimatedInvalidAndNoOperatorOperatableNodeState || state instanceof AnimatedInvalidOperatableNodeState || state instanceof AnimatedNoOperatorOperatableNodeState}
			<div>
				{#if state instanceof ManualOperatingStartedOperatableNodeState || state instanceof ManualOperatingDonedOperatableNodeState || state instanceof ManualInvalidAndNoOperatorOperatableNodeState || state instanceof ManualInvalidOperatableNodeState || state instanceof ManualNoOperatorOperatableNodeState}
					<label>
						Step count:
						<input
							type="number"
							min="1"
							step="1"
							value={state.stepCount}
							onchange={handleStepCountInputChange}
						/>
					</label>
					<button onclick={handleDoManualStepsButtonClick}>Do steps</button>
				{/if}
				{#if state instanceof AnimatedOperatingStartedOperatableNodeState || state instanceof AnimatedOperatingDonedOperatableNodeState || state instanceof AnimatedInvalidAndNoOperatorOperatableNodeState || state instanceof AnimatedInvalidOperatableNodeState || state instanceof AnimatedNoOperatorOperatableNodeState}
					<label>
						Interval (seconds):
						<input
							type="number"
							min="0.0001"
							step="0.0001"
							value={state.intervalIntervalSeconds}
							onchange={handleIntervalIntervalInputChange}
						/>
					</label>
				{/if}
				<button onclick={handleResetOutputImageButtonClick}>Reset</button>
			</div>
		{/if}
	</fieldset>
</section>
