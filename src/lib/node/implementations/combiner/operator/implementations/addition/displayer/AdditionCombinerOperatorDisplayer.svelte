<script lang="ts">
	import type {NodeId} from "../../../../../../id/NodeId.ts";
	import type {AdditionCombinerOperator} from "../AdditionCombinerOperator.ts";
	const {}: {
		readonly onSetOperatorRequest: (operator: AdditionCombinerOperator) => void;
		readonly nodeId: NodeId;
	} = $props();
</script>

<section></section>
