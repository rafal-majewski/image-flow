<script lang="ts">
	import type {NodeId} from "../../../../../../id/NodeId.ts";
	import type {ErosionMapperOperator} from "../ErosionMapperOperator.ts";
	const {
		nodeId,
		operator,
		onSetOperatorRequest,
	}: {
		readonly nodeId: NodeId;
		readonly operator: ErosionMapperOperator;
		readonly onSetOperatorRequest: (operator: ErosionMapperOperator) => void;
	} = $props();
</script>

<section>
	<table>
		<caption>Kernel</caption>
		<tbody> </tbody>
	</table>
</section>

<style lang="scss">
</style>
