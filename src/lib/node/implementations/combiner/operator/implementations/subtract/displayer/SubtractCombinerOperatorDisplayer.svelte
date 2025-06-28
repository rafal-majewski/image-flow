<script lang="ts">
	import type {NodeId} from "../../../../../../id/NodeId.ts";
	import type {SubtractCombinerOperator} from "../SubtractCombinerOperator.ts";
	const {}: {
		readonly onSetOperatorRequest: (operator: SubtractCombinerOperator) => void;
		readonly nodeId: NodeId;
	} = $props();
</script>

<section></section>
