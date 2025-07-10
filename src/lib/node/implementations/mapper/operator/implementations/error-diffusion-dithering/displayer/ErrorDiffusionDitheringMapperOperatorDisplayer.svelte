<script lang="ts">
	import {Coordinates} from "../../../../../../../coordinates/Coordinates.ts";
	import type {NodeId} from "../../../../../../id/NodeId.ts";
	import type {ErrorDiffusionDitheringMapperOperator} from "../ErrorDiffusionDitheringMapperOperator.ts";
	const {
		nodeId,
		operator,
		onSetOperatorRequest,
	}: {
		readonly nodeId: NodeId;
		readonly operator: ErrorDiffusionDitheringMapperOperator;
		readonly onSetOperatorRequest: (
			operator: ErrorDiffusionDitheringMapperOperator,
		) => void;
	} = $props();
	function handleAddNonFirstRowRequest(number: number): void {
		onSetOperatorRequest(
			operator.replaceKernel(operator.kernel.insertNonFirstRow(number)),
		);
	}
	function handleAddFirstRowRequest(number: number): void {
		onSetOperatorRequest(
			operator.replaceKernel(operator.kernel.insertFirstRow()),
		);
	}
</script>

<section></section>

<style lang="scss">
</style>
