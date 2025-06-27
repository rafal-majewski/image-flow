<script lang="ts">
	import {onMount} from "svelte";
	const {image}: {readonly image: ImageData} = $props();
	let canvas: HTMLCanvasElement;
	onMount(() => {
		const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
		$effect(() => {
			canvas.height = image.height;
			canvas.width = image.width;
			canvasContext.putImageData(image, 0, 0);
		});
	});
	let zoom = $state(1);
	const multiplier = 1.1;
	function handlePlusButtonClick(): void {
		zoom = zoom * multiplier;
	}
	function handleMinusButtonClick(): void {
		zoom = zoom / multiplier;
	}
	function handleInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		zoom = event.currentTarget.valueAsNumber;
	}
</script>

<section>
	<div
		style:width="{Math.round(image.width * zoom)}px"
		style:height="{Math.round(image.height * zoom)}px"
	>
		<canvas bind:this={canvas} style:scale={zoom}></canvas>
	</div>
	<div>
		<button onclick={handlePlusButtonClick}>+</button>
		<button onclick={handleMinusButtonClick}>-</button>
		<input type="number" onchange={handleInputChange} value={zoom} min="0" />
	</div>
</section>

<style lang="scss">
	canvas {
		transform-origin: 0 0;
	}
</style>
