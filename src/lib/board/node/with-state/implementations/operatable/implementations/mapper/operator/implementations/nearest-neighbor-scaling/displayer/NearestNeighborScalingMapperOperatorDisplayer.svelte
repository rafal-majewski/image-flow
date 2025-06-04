<script lang="ts">
	import type {NearestNeighborScalingMapperOperator} from "../NearestNeighborScalingMapperOperator.ts";
	const {
		operator,
		onSetOperatorRequest,
	}: Readonly<{
		operator: NearestNeighborScalingMapperOperator;
		onSetOperatorRequest: (
			operator: NearestNeighborScalingMapperOperator,
		) => void;
	}> = $props();
</script>

<section></section>
