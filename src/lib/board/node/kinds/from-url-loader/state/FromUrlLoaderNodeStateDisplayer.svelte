<script lang="ts">
	import type {SupportedFromUrlLoaderNodeState} from "../SupportedFromUrlLoaderNodeState.ts";
	const {
		state,
		onSetMapperRequest,
	}: Readonly<{
		state: SupportedFromUrlLoaderNodeState;
		onSetMapperRequest: (newUrl: string) => void;
	}> = $props();
</script>

<section></section>
