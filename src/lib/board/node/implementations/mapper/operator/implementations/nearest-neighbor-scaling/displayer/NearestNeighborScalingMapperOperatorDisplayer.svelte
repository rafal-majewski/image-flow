<script lang="ts">
	import type {NearestNeighborScalingMapperOperator} from "../NearestNeighborScalingMapperOperator.ts";
	const {
		mapper,
		onSetOperatorRequest,
	}: Readonly<{
		mapper: NearestNeighborScalingMapperOperator;
		onSetOperatorRequest: (
			mapper: NearestNeighborScalingMapperOperator,
		) => void;
	}> = $props();
</script>

<section></section>
