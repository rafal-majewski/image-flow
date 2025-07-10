<script lang="ts">
	import type {PointillizingMapperOperator} from "../PointillizingMapperOperator.ts";
	const {
		operator,
		onSetOperatorRequest,
	}: {
		readonly operator: PointillizingMapperOperator;
		readonly onSetOperatorRequest: (
			operator: PointillizingMapperOperator,
		) => void;
	} = $props();
</script>

<section></section>

<style lang="scss">
</style>
