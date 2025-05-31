<script lang="ts">
	import type {WithImageEdge} from "../../../edge/WithImageEdge.ts";
	import type {WithoutImageEdge} from "../../../edge/implementations/without-image/WithoutImageEdge.ts";
	import {NodeState} from "../NodeState.ts";
	const {
		state,
	}: Readonly<{
		state: NodeState<
			number,
			readonly WithImageEdge[] | readonly WithoutImageEdge[]
		>;
	}> = $props();
</script>
