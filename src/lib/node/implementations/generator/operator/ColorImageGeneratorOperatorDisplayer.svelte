<script lang="ts">
	import type {NodeId} from "../../../id/NodeId.ts";
	import type {ColorImageGeneratorOperator} from "./ColorImageGeneratorOperator.ts";
	const {
		operator,
		onSetOperatorRequest,
		nodeId,
	}: {
		readonly operator: ColorImageGeneratorOperator;
		readonly onSetOperatorRequest: (
			operator: ColorImageGeneratorOperator,
		) => void;
		readonly nodeId: NodeId;
	} = $props();
	function handleColorChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		operator.setColor(event.currentTarget.value);
		onSetOperatorRequest(operator);
	}
	function handleWidthChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		operator.setWidth(event.currentTarget.valueAsNumber);
		onSetOperatorRequest(operator);
	}
	function handleHeightChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		operator.setHeight(event.currentTarget.valueAsNumber);
		onSetOperatorRequest(operator);
	}
</script>

<section>
	<fieldset>
		<legend>Image Settings</legend>
		<div>
			<label>
				Color
				<input
					type="color"
					value={operator.getColor()}
					onchange={handleColorChange}
				/>
			</label>
			<label>
				Width
				<input
					type="number"
					value={operator.getWidth()}
					min="1"
					max="4096"
					onchange={handleWidthChange}
				/>
			</label>
			<label>
				Height
				<input
					type="number"
					value={operator.getHeight()}
					min="1"
					max="4096"
					onchange={handleHeightChange}
				/>
			</label>
		</div>
	</fieldset>
</section>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	input {
		padding: 0.25rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	input[type="color"] {
		width: 50px;
		height: 30px;
		padding: 0;
		border: none;
	}
</style>
