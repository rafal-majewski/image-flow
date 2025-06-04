<script lang="ts">
	import {onMount} from "svelte";
	import {scale} from "svelte/transition";
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
	let zoom = $state(1);
	const multiplier = 1.1;
	function handlePlusButtonClick(): void {
		zoom *= multiplier;
	}
	function handleMinusButtonClick(): void {
		zoom /= multiplier;
	}
	function handleInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		zoom = event.currentTarget.valueAsNumber;
	}
</script>

<section>
	<canvas bind:this={canvas} style:scale={zoom}></canvas>
	<div>
		<button onclick={handlePlusButtonClick}>+</button>
		<button onclick={handleMinusButtonClick}>-</button>
		<input type="number" onchange={handleInputChange} value={zoom} min="0" />
	</div>
</section>
