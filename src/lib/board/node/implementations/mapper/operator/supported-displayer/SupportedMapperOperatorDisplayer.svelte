<script lang="ts">
	import GameOfLifeMapperOperatorDisplayer from "../implementations/game-of-life/displayer/GameOfLifeMapperOperatorDisplayer.svelte";
	import {GameOfLifeMapperOperator} from "../implementations/game-of-life/GameOfLifeMapperOperator.ts";
	import {GrayscalingMapperOperator} from "../implementations/grayscaling/GrayscalingMapperOperator.ts";
	import GrayscalingMapperOperatorDisplayer from "../implementations/grayscaling/displayer/GrayscalingMapperOperatorDisplayer.svelte";
	import NearestNeighborScalingMapperOperatorDisplayer from "../implementations/nearest-neighbor-scaling/displayer/NearestNeighborScalingMapperOperatorDisplayer.svelte";
	import {NearestNeighborScalingMapperOperator} from "../implementations/nearest-neighbor-scaling/NearestNeighborScalingMapperOperator.ts";
	import {AverageBlurringMapperOperator} from "../implementations/average-blurring/AverageBlurringMapperOperator.ts";
	import AverageBlurringMapperOperatorDisplayer from "../implementations/average-blurring/displayer/AverageBlurringMapperOperatorDisplayer.svelte";
	import type {MapperOperator} from "../MapperOperator.ts";
	import {ConvolutingOrCorrelatingMapperOperator} from "../implementations/convoluting-or-correlating/ConvolutingOrCorrelatingMapperOperator.ts";
	import ConvolutingOrCorrelatingMapperOperatorDisplayer from "../implementations/convoluting-or-correlating/displayer/ConvolutingOrCorrelatingMapperOperatorDisplayer.svelte";
	import type {NodeId} from "../../../../id/NodeId.ts";
	const {
		mapper,
		onSetOperatorRequest,
		nodeId,
	}: Readonly<{
		mapper: MapperOperator;
		onSetOperatorRequest: (mapper: MapperOperator) => void;
		nodeId: NodeId;
	}> = $props();
</script>

{#if mapper instanceof GrayscalingMapperOperator}
	<GrayscalingMapperOperatorDisplayer {mapper} {onSetOperatorRequest} />
{:else if mapper instanceof GameOfLifeMapperOperator}
	<GameOfLifeMapperOperatorDisplayer {mapper} {onSetOperatorRequest} />
{:else if mapper instanceof AverageBlurringMapperOperator}
	<AverageBlurringMapperOperatorDisplayer {mapper} {onSetOperatorRequest} />
{:else if mapper instanceof NearestNeighborScalingMapperOperator}
	<NearestNeighborScalingMapperOperatorDisplayer
		{mapper}
		{onSetOperatorRequest}
	/>
{:else if mapper instanceof ConvolutingOrCorrelatingMapperOperator}
	<ConvolutingOrCorrelatingMapperOperatorDisplayer
		{mapper}
		{onSetOperatorRequest}
		{nodeId}
	/>
{/if}
