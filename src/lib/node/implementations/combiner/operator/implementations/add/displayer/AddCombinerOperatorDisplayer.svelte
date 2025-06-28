<script lang="ts">
	import type {NodeId} from "../../../../../../id/NodeId.ts";
	import type {AddCombinerOperator} from "../AddCombinerOperator.ts";
	const {}: {
		readonly onSetOperatorRequest: (operator: AddCombinerOperator) => void;
		readonly nodeId: NodeId;
	} = $props();
</script>

<section></section>
