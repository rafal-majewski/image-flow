<script lang="ts">
	import GameOfLifeMapperDisplayer from "../implementations/game-of-life/displayer/GameOfLifeMapperDisplayer.svelte";
	import {GameOfLifeMapper} from "../implementations/game-of-life/GameOfLifeMapper.ts";
	import {GrayscalingMapper} from "../implementations/grayscaling/GrayscalingMapper.ts";
	import GrayscalingMapperDisplayer from "../implementations/grayscaling/displayer/GrayscalingMapperDisplayer.svelte";
	import NearestNeighborScalingMapperDisplayer from "../implementations/nearest-neighbor-scaling/displayer/NearestNeighborScalingMapperDisplayer.svelte";
	import {NearestNeighborScalingMapper} from "../implementations/nearest-neighbor-scaling/NearestNeighborScalingMapper.ts";
	import {AverageBlurringMapper} from "../implementations/average-blurring/AverageBlurringMapper.ts";
	import AverageBlurringMapperDisplayer from "../implementations/average-blurring/displayer/AverageBlurringMapperDisplayer.svelte";
	import type {Mapper} from "../Mapper.ts";
	import {ConvolutingOrCorrelatingMapper} from "../implementations/convoluting-or-correlating/ConvolutingOrCorrelatingMapper.ts";
	import ConvolutingOrCorrelatingMapperDisplayer from "../implementations/convoluting-or-correlating/displayer/ConvolutingOrCorrelatingMapperDisplayer.svelte";
	import type {NodeId} from "../../../../id/NodeId.ts";
	const {
		mapper,
		onSetMapperRequest,
		nodeId,
	}: Readonly<{
		mapper: Mapper;
		onSetMapperRequest: (mapper: Mapper) => void;
		nodeId: NodeId;
	}> = $props();
</script>

{#if mapper instanceof GrayscalingMapper}
	<GrayscalingMapperDisplayer {mapper} {onSetMapperRequest} />
{:else if mapper instanceof GameOfLifeMapper}
	<GameOfLifeMapperDisplayer {mapper} {onSetMapperRequest} />
{:else if mapper instanceof AverageBlurringMapper}
	<AverageBlurringMapperDisplayer {mapper} {onSetMapperRequest} />
{:else if mapper instanceof NearestNeighborScalingMapper}
	<NearestNeighborScalingMapperDisplayer {mapper} {onSetMapperRequest} />
{:else if mapper instanceof ConvolutingOrCorrelatingMapper}
	<ConvolutingOrCorrelatingMapperDisplayer
		{mapper}
		{onSetMapperRequest}
		{nodeId}
	/>
{/if}
