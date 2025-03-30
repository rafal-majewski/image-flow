<script lang="ts">
	import type {Coordinates} from "./Coordinates.ts";
	const {
		sourcePosition,
		targetPosition,
	}: Readonly<{sourcePosition: Coordinates; targetPosition: Coordinates}> =
		$props();
</script>

<svg
	viewBox="0 0 {Math.abs(targetPosition.x - sourcePosition.x)} {Math.abs(
		targetPosition.y - sourcePosition.y,
	)}"
	xmlns="http://www.w3.org/2000/svg"
>
	<line
		x1={sourcePosition.x}
		y1={sourcePosition.y}
		x2={targetPosition.x}
		y2={targetPosition.y}
		stroke="black"
		stroke-width="2"
	/>
</svg>
