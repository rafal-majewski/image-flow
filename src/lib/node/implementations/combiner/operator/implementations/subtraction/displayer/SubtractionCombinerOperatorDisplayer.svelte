<script lang="ts">
	import type {NodeId} from "../../../../../../id/NodeId.ts";
	import type {SubtractionCombinerOperator} from "../SubtractionCombinerOperator.ts";
	const {}: {
		readonly onSetOperatorRequest: (
			operator: SubtractionCombinerOperator,
		) => void;
		readonly nodeId: NodeId;
	} = $props();
</script>

<section></section>
