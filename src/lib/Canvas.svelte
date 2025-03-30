<script lang="ts">
	import {onMount} from "svelte";
	const {image}: Readonly<{image: ImageData}> = $props();
	let canvas: HTMLCanvasElement;
	onMount(() => {
		const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
		$effect(() => {
			canvas.width = image.width;
			canvas.height = image.height;
			canvasContext.putImageData(image, 0, 0);
		});
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		display: block;
		max-width: 100%;
		height: auto;
	}
</style>
