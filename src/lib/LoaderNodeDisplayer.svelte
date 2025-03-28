<script lang="ts">
	import type {Coordinates} from "./Coordinates.ts";

	let fileInput: HTMLInputElement;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let image: HTMLImageElement | null = null;

	const position = $state<Coordinates>({x: 0, y: 0});

	let isDragging = false;
	let dragStart: Coordinates = {x: 0, y: 0};

	function handleFileInputChange(event: Event): void {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (e) => {
			if (!image) {
				image = new Image();
				image.onload = drawImage;
			}
			image.src = e.target?.result as string;
		};
		reader.readAsDataURL(file);
	}

	function drawImage() {
		if (!image || !canvas) return;
		if (!ctx) {
			ctx = canvas.getContext("2d");
		}
		if (ctx) {
			canvas.width = image.width;
			canvas.height = image.height;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(image, 0, 0);
		}
	}

	function handleMouseDown(event: MouseEvent) {
		isDragging = true;
		dragStart = {x: event.clientX - position.x, y: event.clientY - position.y};
	}

	function handleMouseMove(event: MouseEvent) {
		if (!isDragging) return;
		position.x = event.clientX - dragStart.x;
		position.y = event.clientY - dragStart.y;
	}

	function handleMouseUp() {
		isDragging = false;
	}
</script>

<section
	style:top="{position.y}px"
	style:left="{position.x}px"
	onmousedown={handleMouseDown}
	onmousemove={handleMouseMove}
	onmouseup={handleMouseUp}
	role="none"
>
	<input
		type="file"
		bind:this={fileInput}
		accept="image/*"
		onchange={handleFileInputChange}
	/>
	<canvas bind:this={canvas}></canvas>
	<button>-></button>
</section>

<style lang="scss">
	section {
		border: 1px solid black;
		display: flex;
		flex-direction: column;
		background-color: white;
		position: absolute;
		cursor: grab;
		transform: translate(-50%, -50%);
	}

	section:active {
		cursor: grabbing;
	}
</style>
