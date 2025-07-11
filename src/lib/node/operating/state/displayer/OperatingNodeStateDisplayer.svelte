<script lang="ts">
	import type {SupportedOperatingNodeState} from "../supported/SupportedOperatingNodeState.ts";
	import Canvas from "./canvas/Canvas.svelte";
	import {AnimatedInvalidAndNoOperatorOperatingNodeState} from "../implementations/animated-invalid-and-no-operator/AnimatedInvalidAndNoOperatorOperatingNodeState.ts";
	import {AnimatedInvalidOperatingNodeState} from "../implementations/animated-invalid/AnimatedInvalidOperatingNodeState.ts";
	import {AnimatedNoOperatorOperatingNodeState} from "../implementations/animated-no-operator/AnimatedNoOperatorOperatingNodeState.ts";
	import {AnimatedOperatingStartedOperatingNodeState} from "../implementations/animated-operating-started/AnimatedOperatingStartedOperatingNodeState.ts";
	import {InstantInvalidAndNoOperatorOperatingNodeState} from "../implementations/instant-invalid-and-no-operator/InstantInvalidAndNoOperatorOperatingNodeState.ts";
	import {InstantInvalidOperatingNodeState} from "../implementations/instant-invalid/InstantInvalidOperatingNodeState.ts";
	import {InstantNoOperatorOperatingNodeState} from "../implementations/instant-no-operator/InstantNoOperatorOperatingNodeState.ts";
	import {InstantOperatingStartedOperatingNodeState} from "../implementations/instant-operating-started/InstantOperatingStartedOperatingNodeState.ts";
	import {ManualInvalidAndNoOperatorOperatingNodeState} from "../implementations/manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatingNodeState.ts";
	import {ManualInvalidOperatingNodeState} from "../implementations/manual-invalid/ManualInvalidOperatingNodeState.ts";
	import {ManualNoOperatorOperatingNodeState} from "../implementations/manual-no-operator/ManualNoOperatorOperatingNodeState.ts";
	import {ManualOperatingStartedOperatingNodeState} from "../implementations/manual-operating-started/ManualOperatingStartedOperatingNodeState.ts";
	import {AnimatedOperatingDoneOperatingNodeState} from "../implementations/animated-operating-done/AnimatedOperatingDoneOperatingNodeState.ts";
	import {InstantOperatingDoneOperatingNodeState} from "../implementations/instant-operating-done/InstantOperatingDoneOperatingNodeState.ts";
	import {ManualOperatingDoneOperatingNodeState} from "../implementations/manual-operating-done/ManualOperatingDoneOperatingNodeState.ts";
	import type {Operator} from "../../operator/Operator.ts";
	import type {NodeId} from "../../../id/NodeId.ts";
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
		availableOperators,
	}: {
		readonly nodeId: NodeId;
		readonly state: SupportedOperatingNodeState<number>;
		readonly onDoManualStepsRequest: () => void;
		readonly onUnsetOperatorRequest: () => void;
		readonly onSetOperatorRequest: (operator: Operator<number>) => void;
		readonly onMakeManualRequest: () => void;
		readonly onMakeAnimatedRequest: () => void;
		readonly onMakeInstantRequest: () => void;
		readonly onSetStepCountRequest: (stepCount: number) => void;
		readonly onSetIntervalIntervalRequest: (
			intervalIntervalSeconds: number,
		) => void;
		readonly onResetOutputImageRequest: () => void;
		readonly availableOperators: readonly Operator<number>[];
	} = $props();
	function handleSelectChange(
		event: Event & {readonly currentTarget: HTMLSelectElement},
	): void {
		if (event.currentTarget.value === "none") {
			onUnsetOperatorRequest();
		} else {
			const selectedOperator = availableOperators.find(
				(operator) => operator.id === event.currentTarget.value,
			) as (typeof availableOperators)[number];
			onSetOperatorRequest(selectedOperator);
		}
	}
	function handleDoManualStepsButtonClick(): void {
		onDoManualStepsRequest();
	}
	function handleStepCountInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		onSetStepCountRequest(event.currentTarget.valueAsNumber);
	}
	function handleIntervalIntervalInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		onSetIntervalIntervalRequest(event.currentTarget.valueAsNumber);
	}
	function handleResetOutputImageButtonClick(
		event: Event & {readonly currentTarget: HTMLButtonElement},
	): void {
		onResetOutputImageRequest();
	}
</script>

<section>
	<select onchange={handleSelectChange}>
		<option
			value="none"
			selected={state instanceof AnimatedInvalidAndNoOperatorOperatingNodeState
				|| state instanceof AnimatedNoOperatorOperatingNodeState
				|| state instanceof InstantInvalidAndNoOperatorOperatingNodeState
				|| state instanceof InstantNoOperatorOperatingNodeState
				|| state instanceof ManualInvalidAndNoOperatorOperatingNodeState
				|| state instanceof ManualNoOperatorOperatingNodeState}
		>
			No operator
		</option>
		{#each availableOperators as operator (operator.id)}
			<option
				value={operator.id}
				selected={(state instanceof AnimatedOperatingStartedOperatingNodeState
					|| state instanceof AnimatedOperatingDoneOperatingNodeState
					|| state instanceof AnimatedInvalidOperatingNodeState
					|| state instanceof InstantOperatingStartedOperatingNodeState
					|| state instanceof InstantOperatingDoneOperatingNodeState
					|| state instanceof InstantInvalidOperatingNodeState
					|| state instanceof ManualOperatingStartedOperatingNodeState
					|| state instanceof ManualOperatingDoneOperatingNodeState
					|| state instanceof ManualInvalidOperatingNodeState)
					&& state.operator.id === operator.id}>{operator.name}</option
			>
		{/each}
	</select>
	{#if state instanceof AnimatedOperatingStartedOperatingNodeState || state instanceof AnimatedOperatingDoneOperatingNodeState || state instanceof AnimatedInvalidOperatingNodeState || state instanceof AnimatedInvalidOperatingNodeState || state instanceof InstantOperatingStartedOperatingNodeState || state instanceof InstantOperatingDoneOperatingNodeState || state instanceof InstantInvalidOperatingNodeState || state instanceof InstantInvalidOperatingNodeState || state instanceof ManualOperatingStartedOperatingNodeState || state instanceof ManualOperatingDoneOperatingNodeState || state instanceof ManualInvalidOperatingNodeState || state instanceof ManualInvalidOperatingNodeState}
		<state.operator.displayer {onSetOperatorRequest} {nodeId} />
	{/if}
	{#if state instanceof AnimatedOperatingStartedOperatingNodeState || state instanceof AnimatedOperatingDoneOperatingNodeState || state instanceof InstantOperatingStartedOperatingNodeState || state instanceof InstantOperatingDoneOperatingNodeState || state instanceof ManualOperatingStartedOperatingNodeState || state instanceof ManualOperatingDoneOperatingNodeState}
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
					checked={state instanceof ManualOperatingStartedOperatingNodeState
						|| state instanceof ManualOperatingDoneOperatingNodeState
						|| state instanceof ManualInvalidAndNoOperatorOperatingNodeState
						|| state instanceof ManualInvalidOperatingNodeState
						|| state instanceof ManualNoOperatorOperatingNodeState}
					onchange={onMakeManualRequest}
				/>
				Manual
			</label>
			<label>
				<input
					type="radio"
					name="{nodeId}-mode"
					value="animated"
					checked={state instanceof AnimatedOperatingStartedOperatingNodeState
						|| state instanceof AnimatedOperatingDoneOperatingNodeState
						|| state instanceof AnimatedInvalidAndNoOperatorOperatingNodeState
						|| state instanceof AnimatedInvalidOperatingNodeState
						|| state instanceof AnimatedNoOperatorOperatingNodeState}
					onchange={onMakeAnimatedRequest}
				/>
				Animated
			</label>
			<label>
				<input
					type="radio"
					name="{nodeId}-mode"
					value="instant"
					checked={state instanceof InstantOperatingStartedOperatingNodeState
						|| state instanceof InstantOperatingDoneOperatingNodeState
						|| state instanceof InstantInvalidAndNoOperatorOperatingNodeState
						|| state instanceof InstantInvalidOperatingNodeState
						|| state instanceof InstantNoOperatorOperatingNodeState}
					onchange={onMakeInstantRequest}
				/>
				Instant
			</label>
		</div>
		{#if state instanceof ManualOperatingStartedOperatingNodeState || state instanceof ManualOperatingDoneOperatingNodeState || state instanceof ManualInvalidAndNoOperatorOperatingNodeState || state instanceof ManualInvalidOperatingNodeState || state instanceof ManualNoOperatorOperatingNodeState || state instanceof AnimatedOperatingStartedOperatingNodeState || state instanceof AnimatedOperatingDoneOperatingNodeState || state instanceof AnimatedInvalidAndNoOperatorOperatingNodeState || state instanceof AnimatedInvalidOperatingNodeState || state instanceof AnimatedNoOperatorOperatingNodeState}
			<div>
				{#if state instanceof ManualOperatingStartedOperatingNodeState || state instanceof ManualOperatingDoneOperatingNodeState || state instanceof ManualInvalidAndNoOperatorOperatingNodeState || state instanceof ManualInvalidOperatingNodeState || state instanceof ManualNoOperatorOperatingNodeState}
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
				{#if state instanceof AnimatedOperatingStartedOperatingNodeState || state instanceof AnimatedOperatingDoneOperatingNodeState || state instanceof AnimatedInvalidAndNoOperatorOperatingNodeState || state instanceof AnimatedInvalidOperatingNodeState || state instanceof AnimatedNoOperatorOperatingNodeState}
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
				<button
					disabled={state instanceof AnimatedNoOperatorOperatingNodeState
						|| state instanceof AnimatedInvalidAndNoOperatorOperatingNodeState
						|| state instanceof AnimatedInvalidOperatingNodeState
						|| state instanceof ManualNoOperatorOperatingNodeState
						|| state instanceof ManualInvalidAndNoOperatorOperatingNodeState
						|| state instanceof ManualInvalidOperatingNodeState}
					onclick={handleResetOutputImageButtonClick}>Reset</button
				>
			</div>
		{/if}
	</fieldset>
</section>
