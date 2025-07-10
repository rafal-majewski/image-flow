<script lang="ts">
	import type {ColorReductionMapperOperator} from "../ColorReductionMapperOperator.ts";
	const {
		operator,
		onSetOperatorRequest,
	}: {
		readonly operator: ColorReductionMapperOperator;
		readonly onSetOperatorRequest: (
			operator: ColorReductionMapperOperator,
		) => void;
	} = $props();
	function handleRedComponentLevelCountInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.replaceRedComponentLevelCount(event.currentTarget.valueAsNumber),
		);
	}
	function handleGreenComponentLevelCountInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.replaceGreenComponentLevelCount(
				event.currentTarget.valueAsNumber,
			),
		);
	}
	function handleBlueComponentLevelCountInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.replaceBlueComponentLevelCount(
				event.currentTarget.valueAsNumber,
			),
		);
	}
	function handleAlphaComponentLevelCountInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		onSetOperatorRequest(
			operator.replaceAlphaComponentLevelCount(
				event.currentTarget.valueAsNumber,
			),
		);
	}
</script>

<section>
	Component level counts:
	<label>
		Red
		<input
			type="number"
			min="1"
			step="1"
			max="256"
			value={operator.redComponentLevelCount}
			onchange={handleRedComponentLevelCountInputChange}
		/>
	</label>
	<label>
		Green
		<input
			type="number"
			min="1"
			step="1"
			max="256"
			value={operator.greenComponentLevelCount}
			onchange={handleGreenComponentLevelCountInputChange}
		/>
	</label>
	<label>
		Blue
		<input
			type="number"
			min="1"
			step="1"
			max="256"
			value={operator.blueComponentLevelCount}
			onchange={handleBlueComponentLevelCountInputChange}
		/>
	</label>
	<label>
		Alpha
		<input
			type="number"
			min="1"
			step="1"
			max="256"
			value={operator.alphaComponentLevelCount}
			onchange={handleAlphaComponentLevelCountInputChange}
		/>
	</label>
</section>

<style lang="scss"></style>
