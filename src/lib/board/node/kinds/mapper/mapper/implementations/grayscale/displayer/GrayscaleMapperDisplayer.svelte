<script lang="ts">
	import type {GrayscaleMapper} from "../GrayscaleMapper.ts";
	const {
		mapper,
		onSetMapperRequest,
	}: Readonly<{
		mapper: GrayscaleMapper;
		onSetMapperRequest: (mapper: GrayscaleMapper) => void;
	}> = $props();
</script>

<section></section>
