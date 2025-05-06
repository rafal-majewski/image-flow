<script lang="ts">
	import GameOfLifeMapperDisplayer from "../../implementations/game-of-life/displayer/GameOfLifeMapperDisplayer.svelte";
	import {GameOfLifeMapper} from "../../implementations/game-of-life/GameOfLifeMapper.ts";
	import {GrayscaleMapper} from "../../implementations/grayscale/GrayscaleMapper.ts";
	import GrayscaleMapperDisplayer from "../../implementations/grayscale/displayer/GrayscaleMapperDisplayer.svelte";
	import NearestNeighborScalingMapperDisplayer from "../../implementations/nearest-neighbor-scaling/displayer/NearestNeighborScalingMapperDisplayer.svelte";
	import {NearestNeighborScalingMapper} from "../../implementations/nearest-neighbor-scaling/NearestNeighborScalingMapper.ts";
	import type {SupportedMapper} from "../SupportedMapper.ts";
	const {
		mapper,
		onSetMapperRequest,
	}: Readonly<{
		mapper: SupportedMapper;
		onSetMapperRequest: (mapper: SupportedMapper) => void;
	}> = $props();
</script>

{#if mapper instanceof GrayscaleMapper}
	<GrayscaleMapperDisplayer {mapper} />
{:else if mapper instanceof GameOfLifeMapper}
	<GameOfLifeMapperDisplayer {mapper} {onSetMapperRequest} />
{:else if mapper instanceof NearestNeighborScalingMapper}
	<NearestNeighborScalingMapperDisplayer {mapper} />
{/if}
