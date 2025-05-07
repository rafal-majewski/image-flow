<script lang="ts">
	import type {NearestNeighborScalingMapper} from "../NearestNeighborScalingMapper.ts";
	const {
		mapper,
		onSetMapperRequest,
	}: Readonly<{
		mapper: NearestNeighborScalingMapper;
		onSetMapperRequest: (mapper: NearestNeighborScalingMapper) => void;
	}> = $props();
</script>

<section></section>
