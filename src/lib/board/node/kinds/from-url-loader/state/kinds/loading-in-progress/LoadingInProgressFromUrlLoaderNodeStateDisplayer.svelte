<script lang="ts">
	import Canvas from "../../Canvas.svelte";
	import type {LoadingSucceededFromUrlLoaderNodeState} from "./LoadingSucceededFromUrlLoaderNodeState.ts";
	const {state}: Readonly<{state: LoadingSucceededFromUrlLoaderNodeState}> =
		$props();
</script>

<Canvas image={state.image} />
