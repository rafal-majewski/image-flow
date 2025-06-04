<script lang="ts">
	import type {DitheringMapperOperator} from "../DitheringMapperOperator.ts";
	const {operator, onSetOperatorRequest} = $props<{
		operator: DitheringMapperOperator;
		onSetOperatorRequest: (operator: DitheringMapperOperator) => void;
	}>();
</script>

<section></section>
