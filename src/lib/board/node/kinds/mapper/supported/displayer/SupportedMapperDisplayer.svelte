<script lang="ts">
	import {AveragingBlurMapper} from "../../mapper/implementations/averaging-blur/AveragingBlurMapper.ts";
	import AveragingBlurMapperDisplayer from "../../mapper/implementations/averaging-blur/displayer/AveragingBlurMapperDisplayer.svelte";
	import GameOfLifeMapperDisplayer from "../../mapper/implementations/game-of-life/displayer/GameOfLifeMapperDisplayer.svelte";
	import {GameOfLifeMapper} from "../../mapper/implementations/game-of-life/GameOfLifeMapper.ts";
	import GrayscaleMapperDisplayer from "../../mapper/implementations/grayscale/displayer/GrayscaleMapperDisplayer.svelte";
	import {GrayscaleMapper} from "../../mapper/implementations/grayscale/GrayscaleMapper.ts";
	import NearestNeighborScalingMapperDisplayer from "../../mapper/implementations/nearest-neighbor-scaling/displayer/NearestNeighborScalingMapperDisplayer.svelte";
	import {NearestNeighborScalingMapper} from "../../mapper/implementations/nearest-neighbor-scaling/NearestNeighborScalingMapper.ts";
	import type {SupportedMapper} from "../../mapper/supported/SupportedMapper.ts";
	const {
		mapper,
		onSetMapperRequest,
	}: Readonly<{
		mapper: SupportedMapper;
		onSetMapperRequest: (mapper: SupportedMapper) => void;
	}> = $props();
</script>

{#if mapper instanceof GrayscaleMapper}
	<GrayscaleMapperDisplayer {mapper} {onSetMapperRequest} />
{:else if mapper instanceof GameOfLifeMapper}
	<GameOfLifeMapperDisplayer {mapper} {onSetMapperRequest} />
{:else if mapper instanceof AveragingBlurMapper}
	<AveragingBlurMapperDisplayer {mapper} {onSetMapperRequest} />
{:else if mapper instanceof NearestNeighborScalingMapper}
	<NearestNeighborScalingMapperDisplayer {mapper} {onSetMapperRequest} />
{/if}
